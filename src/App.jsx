import Header from './components/Header';
import Hero from './components/Hero';
import QuemSomos from './components/QuemSomos';
import NucleosAtuacao from './components/NucleosAtuacao';
import Diferenciais from './components/Diferenciais';
import FaleConosco from './components/FaleConosco';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="App">
      <Header />

      <Hero />

      <main className="max-w-screen-xl mx-auto px-4">
        <QuemSomos />
        <NucleosAtuacao />
        <Diferenciais />
        <FaleConosco />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
