import React, { useEffect, useRef } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export const N8nChatbot: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Route through same-origin server proxy (/api/n8n-chat) to avoid iframe/CORS/extension blocks
    const proxyWebhookUrl = `${window.location.origin}/api/n8n-chat`;

    const app = createChat({
      webhookUrl: proxyWebhookUrl,
      webhookConfig: {
        method: 'POST',
        headers: {},
      },
      target: containerRef.current,
      mode: 'window',
      showWindowCloseButton: true,
      showWelcomeScreen: false,
      loadPreviousSession: false,
      enableStreaming: false,
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      defaultLanguage: 'en',
      initialMessages: [
        'Halo! 👋 Saya GreenBot, asisten edukasi Lingkar Lestari.',
        'Silakan ketik pertanyaan Anda di kolom bawah seputar hidup minim sampah, daur ulang, jejak karbon, atau efisiensi energi hijau.',
      ],
      i18n: {
        en: {
          title: 'GreenBot · Lingkar Lestari',
          subtitle: 'Asisten Edukasi Keberlanjutan, Minim Sampah & Energi Hijau',
          footer: '',
          getStarted: 'Mulai Percakapan Baru',
          inputPlaceholder: 'Ketik pesan Anda di sini lalu tekan Enter...',
          closeButtonTooltip: 'Tutup Jendela Chat',
        },
      },
    });

    return () => {
      try {
        app.unmount();
      } catch {
        // Ignore unmount errors
      }
    };
  }, []);

  return <div id="n8n-chat-container" ref={containerRef} />;
};
