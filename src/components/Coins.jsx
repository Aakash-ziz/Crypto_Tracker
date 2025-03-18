import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoins = async () => {
      try {
        // ✅ Fetch market data for both USD & INR
        const data = await fetchData("/coins/markets?vs_currency=usd&vs_currency=inr");
        setCoins(data);
        console.log(`🪙 Loaded ${data.length} coins`);
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to fetch coins:", error);
      }
    };

    getCoins();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {coins.map((coin) => (
            <Link key={coin.id} to={`/coin/${coin.id}`}>
              <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
                <img
                  src={coin.image} // ✅ Ensure image loads
                  alt={coin.name}
                  className="w-12 h-12 mb-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/50"; // ✅ Fallback image
                  }}
                />
                <h3 className="text-lg font-bold">{coin.name}</h3>
                <p className="text-yellow-400">
                  💰 USD: ${coin.current_price.toLocaleString()}
                </p>
                <p className="text-green-400">
                  🇮🇳 INR: ₹{coin.current_price.toLocaleString("en-IN")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Coins;
