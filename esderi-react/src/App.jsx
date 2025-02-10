import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Header Bölümü */}
        <header className="App-header">
          <h1>Deri Cüzdan</h1>
          <p>El yapımı, kaliteli deri cüzdanlarımızla tarzınıza şıklık katın.</p>
        </header>

        {/* Ana İçerik */}
        <main>
          {/* Hero Bölümü */}
          <section className="hero">
            {/* Placeholder görsel kullanabilirsiniz. */}
            <img 
              src="https://via.placeholder.com/400x300?text=Deri+C%C3%BCzdan" 
              alt="Deri Cüzdan" 
              className="hero-image"
            />
            <div className="hero-text">
              <h2>Özel Koleksiyon</h2>
              <p>En yeni deri cüzdan modellerimizi keşfedin.</p>
              <button>Ürünleri İncele</button>
            </div>
          </section>

          {/* Hakkımızda Bölümü */}
          <section className="about">
            <h2>Hakkımızda</h2>
            <p>
              Biz, kaliteli deri cüzdanları ustalıkla üreten ve müşterilerimize sunan bir firmayız.
              Her ürünümüz, uzun yıllar dayanacak şekilde özenle hazırlanır.
            </p>
          </section>
        </main>

        {/* Footer Bölümü */}
        <footer className="App-footer">
          <p>© 2025 Deri Cüzdan. Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
