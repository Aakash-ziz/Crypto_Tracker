import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Coins from "./components/Coins";
import CoinDetails from "./components/Coindetails";
import Exchanges from "./components/Exchanges";

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
          <Route path="/exchanges" element={<Exchanges />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
