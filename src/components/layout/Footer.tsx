import Badge from '@/components/ui/Badge';

export default function Footer() {
  return (
    <footer className="bg-bg-footer py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">
              Projeto CNPJ Alfanumerico
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Analise de impacto completa em 38,5 milhoes de linhas de codigo,
              identificando 6.820 pontos de alteracao em 9 dias com 33 ferramentas
              especializadas de IA.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/logo-brasilseg.svg"
              alt="Brasilseg"
              className="h-12 rounded mb-3"
            />
            <p className="text-sm text-text-secondary text-center">
              Cliente — Brasilseg
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/logo-sistran.png"
              alt="Sistran"
              className="h-10 logo-adaptive mb-3"
            />
            <p className="text-sm text-text-secondary text-center">
              Sistran — Beyond Technology
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end">
            <img
              src="/logo-luminna.png"
              alt="Luminna AI"
              className="h-10 logo-adaptive mb-3"
            />
            <p className="text-sm text-text-secondary text-center lg:text-right">
              Analise automatizada por Luminna AI
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="shadow-[0_0_30px_rgba(124,58,237,0.15)]">
            <Badge>Powered by Luminna AI · Pipeline F(x)</Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}
