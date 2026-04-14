import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import * as Icons from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Section from '@/components/layout/Section';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { DOCS } from '@/data/docs/index';
import type { DocEntry } from '@/data/docs/index';

const iconMap: Record<string, React.ComponentType<any>> = {
  AlertTriangle: Icons.AlertTriangle,
  Map: Icons.Map,
  Wrench: Icons.Wrench,
  Search: Icons.Search,
  Layers: Icons.Layers,
  Calendar: Icons.Calendar,
  Brain: Icons.Brain,
  BarChart3: Icons.BarChart3,
  Database: Icons.Database,
  CheckCircle: Icons.CheckCircle,
  BookOpen: Icons.BookOpen,
};

export default function Documentation() {
  const [openDoc, setOpenDoc] = useState<DocEntry | null>(null);

  // Close on Escape
  useEffect(() => {
    if (!openDoc) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDoc(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [openDoc]);

  // Body scroll lock
  useEffect(() => {
    if (openDoc) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openDoc]);

  return (
    <Section id="documentation" alt={true}>
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-10 text-center">
          Documentacao Tecnica Completa
        </h2>
      </ScrollReveal>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DOCS.map((doc, i) => {
          const Icon = iconMap[doc.icone] ?? Icons.FileText;
          return (
            <ScrollReveal key={doc.key} delay={i * 0.07}>
              <GlassCard
                className="cursor-pointer h-full"
                hoverColor="#3b82f6"
              >
                <div
                  className="flex flex-col gap-3 h-full"
                  onClick={() => setOpenDoc(doc)}
                >
                  <Icon className="w-6 h-6 text-accent-blue shrink-0" />
                  <h3 className="font-display font-bold text-text-primary text-base">
                    {doc.titulo}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1">
                    {doc.descricao}
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openDoc && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-bg-deep/[0.92]"
              onClick={() => setOpenDoc(null)}
            />

            {/* Container */}
            <div className="w-[95vw] h-[90vh] max-w-5xl mx-auto relative z-10">
              <motion.div
                className="bg-bg-alt rounded-2xl border edge-6 overflow-hidden flex flex-col h-full"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Sticky header */}
                <div className="flex items-center justify-between px-6 py-4 border-b edge-6 shrink-0">
                  <h3 className="font-display font-bold text-text-primary text-lg">
                    {openDoc.titulo}
                  </h3>
                  <button
                    onClick={() => setOpenDoc(null)}
                    className="p-1 rounded-lg hover:surf-6 transition-colors text-text-secondary hover:text-text-primary"
                    aria-label="Fechar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="markdown-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {openDoc.conteudo}
                    </ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
