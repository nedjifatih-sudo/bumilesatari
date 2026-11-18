import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { FeaturedProject } from '../data/sustainabilityData';
import { EditorialImage } from './EditorialImage';

interface ProjectModalProps {
  project: FeaturedProject | null;
  onClose: () => void;
  onJumpToAudit: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onJumpToAudit,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-6 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-stone-300 bg-[#FBF9F5] p-6 sm:p-10 text-[#1C1917] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Metadata & Close Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-stone-300/80 pb-5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
            <span className="font-mono-tabular font-medium text-[#14532D]">
              DOKUMEN STUDI KASUS {project.index}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.location}</span>
            <span aria-hidden="true">·</span>
            <span>{project.timeframe}</span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup rincian studi kasus"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-stone-300 bg-white text-stone-800 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D] transition-editorial"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Title & Primary Metric Banner */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2
              id="modal-project-title"
              className="font-serif-display text-2xl sm:text-3xl font-semibold leading-tight text-stone-900"
            >
              {project.title}
            </h2>
            <p className="mt-3 max-w-prose text-base leading-relaxed text-stone-700">
              {project.summary}
            </p>
          </div>
          <div className="border border-stone-300/90 bg-[#F4F0E8] p-5 lg:col-span-4">
            <div className="text-xs text-stone-600">Dampak Kuantitatif Utama</div>
            <div className="mt-1 font-mono-tabular text-2xl font-semibold text-[#14532D]">
              {project.primaryMetric}
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
              {project.primaryMetricContext}
            </p>
          </div>
        </div>

        {/* Optional Visual Plate */}
        {project.image && (
          <div className="mt-8">
            <EditorialImage
              src={project.image}
              alt={project.imageAlt || project.title}
              aspectRatio={project.aspectRatio || '16:9'}
              caption={project.figureCaption}
            />
          </div>
        )}

        {/* Challenge & Methodology Split */}
        <div className="mt-8 grid grid-cols-1 gap-8 border-t border-stone-300/80 pt-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="font-serif-display text-lg font-semibold text-stone-900">
              Akar Permasalahan Sistemik
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              {project.challenge}
            </p>
          </div>
          <div className="lg:col-span-7">
            <h3 className="font-serif-display text-lg font-semibold text-stone-900">
              Protokol & Metodologi Implementasi
            </h3>
            <ol className="mt-3 space-y-3">
              {project.methodology.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 border-b border-stone-200 pb-3 text-sm leading-relaxed text-stone-700 last:border-b-0"
                >
                  <span className="font-mono-tabular text-xs font-semibold text-[#14532D] mt-0.5 shrink-0">
                    0{idx + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Before / After Comparison Table */}
        <div className="mt-8 border-t border-stone-300/80 pt-8">
          <h3 className="font-serif-display text-lg font-semibold text-stone-900">
            Matriks Evaluasi Sebelum & Sesudah Intervensi
          </h3>
          <div className="mt-4 overflow-x-auto border border-stone-300">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-stone-300 bg-[#EFECE4] text-xs text-stone-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Indikator Pengukuran</th>
                  <th className="px-4 py-3 font-semibold">Baseline Konvensional</th>
                  <th className="px-4 py-3 font-semibold text-[#14532D]">
                    Hasil Intervensi Sirkular
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-mono-tabular text-xs sm:text-sm">
                {project.outcomes.map((row, idx) => (
                  <tr key={idx} className="bg-[#FBF9F5]">
                    <td className="px-4 py-3.5 font-sans font-medium text-stone-900">
                      {row.label}
                    </td>
                    <td className="px-4 py-3.5 text-stone-600">{row.before}</td>
                    <td className="px-4 py-3.5 font-medium text-[#14532D]">
                      {row.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attributable Testimonial if available */}
        {project.testimonial && (
          <blockquote className="mt-8 border-y border-stone-300 py-6">
            <p className="font-serif-display text-lg italic leading-relaxed text-stone-800">
              “{project.testimonial.quote}”
            </p>
            <footer className="mt-3 flex flex-wrap items-center gap-2 text-xs text-stone-600">
              <strong className="font-semibold text-stone-900">
                {project.testimonial.author}
              </strong>
              <span aria-hidden="true">·</span>
              <span>{project.testimonial.role}</span>
              <span aria-hidden="true">·</span>
              <span>{project.testimonial.organization}</span>
            </footer>
          </blockquote>
        )}

        {/* Action Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-stone-300/80 pt-6">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <CheckCircle2 className="h-4 w-4 text-[#14532D]" aria-hidden="true" />
            <span>Metodologi terbuka untuk direplikasi di tingkat RT/RW dan komunitas.</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-stone-700 border border-stone-300 hover:bg-stone-100 whitespace-nowrap shrink-0 transition-editorial"
            >
              Tutup Dokumen
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onJumpToAudit();
              }}
              className="inline-flex items-center gap-2 bg-[#14532D] px-5 py-2.5 text-xs font-medium text-[#FBF9F5] hover:bg-[#0F3F22] whitespace-nowrap shrink-0 transition-editorial"
            >
              <span>Hitung Potensi di Rumah Anda</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
