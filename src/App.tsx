import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Orbs from '@/components/ui/Orbs';
import GrainOverlay from '@/components/ui/GrainOverlay';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Scope from '@/components/sections/Scope';
import Pipeline from '@/components/sections/Pipeline';
import Funnel from '@/components/sections/Funnel';
import Decisions from '@/components/sections/Decisions';
import Distribution from '@/components/sections/Distribution';
import SqlCatalog from '@/components/sections/SqlCatalog';
import Roadmap from '@/components/sections/Roadmap';
import Documentation from '@/components/sections/Documentation';

export default function App() {
  return (
    <>
      <Orbs />
      <GrainOverlay />
      <Header />
      <main>
        <Hero />
        <div className="section-divider" />
        <Problem />
        <div className="section-divider" />
        <Scope />
        <div className="section-divider" />
        <Pipeline />
        <div className="section-divider" />
        <Funnel />
        <div className="section-divider" />
        <Decisions />
        <div className="section-divider" />
        <Distribution />
        <div className="section-divider" />
        <SqlCatalog />
        <div className="section-divider" />
        <Roadmap />
        <div className="section-divider" />
        <Documentation />
      </main>
      <Footer />
    </>
  );
}
