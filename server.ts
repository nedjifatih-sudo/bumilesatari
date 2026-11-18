import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ACTIVE_N8N_WEBHOOK_URL =
  'https://otomasi-n8n.68xtbi.easypanel.host/webhook/greenbot-chat-6f2a1c/chat';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Server-side proxy for @n8n/chat to prevent browser CORS, iframe, or stale env var issues
  app.all('/api/n8n-chat', async (req, res) => {
    const envUrl = process.env.VITE_N8N_WEBHOOK_URL?.trim();
    const targetWebhookUrl =
      envUrl && !envUrl.includes('a9f02b69-80f0-4161-9e77-a8872c6cb051')
        ? envUrl
        : ACTIVE_N8N_WEBHOOK_URL;

    const action = req.body?.action || req.query?.action || 'sendMessage';

    // Immediately satisfy @n8n/chat loadPreviousSession requests without error
    if (action === 'loadPreviousSession') {
      res.status(200).json({ data: [] });
      return;
    }

    try {
      const payload = {
        action: 'sendMessage',
        sessionId:
          req.body?.sessionId ||
          req.query?.sessionId ||
          `ll-sess-${Date.now()}`,
        chatInput:
          req.body?.chatInput ??
          req.body?.message ??
          req.query?.chatInput ??
          '',
        ...(req.body?.metadata ? { metadata: req.body.metadata } : {}),
      };

      const upstreamResponse = await fetch(targetWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify(payload),
      });

      const rawText = await upstreamResponse.text();

      if (!upstreamResponse.ok) {
        console.error(
          `[n8n-chat proxy] Upstream HTTP ${upstreamResponse.status}:`,
          rawText
        );
        res.status(200).json({
          output:
            'Maaf, layanan GreenBot sedang sibuk (HTTP ' +
            upstreamResponse.status +
            '). Silakan coba kirim ulang pesan Anda beberapa saat lagi.',
        });
        return;
      }

      // Parse JSON or NDJSON response from n8n Chat Trigger
      try {
        const parsed = JSON.parse(rawText);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const first = parsed[0];
          const textOut =
            first?.output ?? first?.text ?? first?.message ?? first?.response;
          if (typeof textOut === 'string') {
            res.status(200).json({ output: textOut });
            return;
          }
        }
        if (parsed && typeof parsed === 'object') {
          const textOut =
            parsed.output ??
            parsed.text ??
            parsed.message ??
            parsed.response ??
            parsed.reply;
          if (typeof textOut === 'string') {
            res.status(200).json({ output: textOut });
            return;
          }
        }
        res.status(200).json(parsed);
        return;
      } catch {
        // Check if NDJSON streaming lines
        const lines = rawText
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean);
        let combined = '';
        for (const line of lines) {
          try {
            const obj = JSON.parse(line);
            if (obj.type === 'item' && typeof obj.content === 'string') {
              combined += obj.content;
            } else if (typeof obj.output === 'string') {
              combined += obj.output;
            }
          } catch {
            // Ignore non-JSON line
          }
        }

        if (combined.trim()) {
          res.status(200).json({ output: combined.trim() });
          return;
        }

        res.status(200).json({
          output: rawText.trim() || 'Pesan diterima oleh GreenBot.',
        });
      }
    } catch (error) {
      console.error('[n8n-chat proxy] Error contacting n8n webhook:', error);
      res.status(200).json({
        output:
          'Maaf, koneksi menuju server n8n sedang mengalami gangguan jaringan. Silakan coba kirim ulang pesan Anda.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
