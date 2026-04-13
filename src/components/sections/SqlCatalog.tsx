import { useState, useMemo } from 'react';
import Section from '@/components/layout/Section';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import GradientText from '@/components/ui/GradientText';
import CodeBlock from '@/components/ui/CodeBlock';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SqlReposBar from '@/components/charts/SqlReposBar';
import { SQL_MIGRATIONS } from '@/data/sql-migrations';

const stats = [
  { value: 86, label: 'tabelas' },
  { value: 70, label: 'colunas numericas' },
  { value: 97, label: 'ALTER TABLE' },
] as const;

export default function SqlCatalog() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return SQL_MIGRATIONS;
    const q = query.toLowerCase();
    return SQL_MIGRATIONS.filter(
      (m) =>
        m.sistema.toLowerCase().includes(q) ||
        m.repositorio.toLowerCase().includes(q) ||
        m.tokenCampo.toLowerCase().includes(q) ||
        m.sqlDetalhe.toLowerCase().includes(q) ||
        m.escopoImpacto.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <Section id="sql-catalog" alt={true}>
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
          97 Migracoes SQL: O Banco de Dados Tambem Muda
        </h2>
      </div>

      {/* Stat badges */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="rounded-xl px-6 py-3 surf-4 border edge-8 backdrop-blur-md"
          >
            <GradientText className="text-2xl font-bold">
              <AnimatedCounter end={value} />
            </GradientText>
            <span className="ml-2 text-text-muted">{label}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ScrollReveal>
        <GlassCard className="mb-8">
          <SqlReposBar />
        </GlassCard>
      </ScrollReveal>

      {/* Code example */}
      <ScrollReveal delay={0.15}>
        <div className="mb-8">
          <CodeBlock
            code="ALTER TABLE proposta MODIFY COLUMN nr_cnpj VARCHAR(14);"
            language="sql"
          />
        </div>
      </ScrollReveal>

      {/* Filterable table */}
      <ScrollReveal delay={0.3}>
        <GlassCard>
          <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por sistema, repositorio, campo..."
              className="w-full px-4 py-3 surf-3 border edge-6 rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-violet/50"
            />
          </div>

          <p className="text-sm text-text-muted mb-4">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}{' '}
            encontrado{filtered.length !== 1 ? 's' : ''}
          </p>

          <div className="max-h-96 overflow-y-auto rounded-xl">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {['Sistema', 'Repositorio', 'Token/Campo', 'Detalhe SQL', 'Escopo'].map(
                    (h) => (
                      <th
                        key={h}
                        className="sticky top-0 surf-5 text-text-primary text-left px-3 py-2 border-b edge-10 font-semibold"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? 'surf-2' : ''}
                  >
                    <td className="px-3 py-2 border-b edge-4 text-text-muted whitespace-nowrap">
                      {m.sistema}
                    </td>
                    <td className="px-3 py-2 border-b edge-4 text-text-muted">
                      {m.repositorio}
                    </td>
                    <td className="px-3 py-2 border-b edge-4 text-text-muted font-mono text-xs">
                      {m.tokenCampo}
                    </td>
                    <td className="px-3 py-2 border-b edge-4 text-text-muted text-xs max-w-xs truncate">
                      {m.sqlDetalhe}
                    </td>
                    <td className="px-3 py-2 border-b edge-4 text-text-muted whitespace-nowrap">
                      {m.escopoImpacto}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </ScrollReveal>
    </Section>
  );
}
