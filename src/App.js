import { Route, Routes } from 'react-router-dom';
import './App.css';
import CryptoData from './components/Container/CryptoData';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import BitCoinDetails from './components/BitCoinDetails/BitCoinDetails';

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<CryptoData />} />
          <Route path="/:id" element={<BitCoinDetails/>} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
