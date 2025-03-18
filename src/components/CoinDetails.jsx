import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../api";
import Loader from "./Loader";
import CoinChart from "./CoinChart";

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoinDetails = async () => {
      try {
        const data = await fetchData(`/coins/${id}?localization=false`);
        setCoin(data);
        console.log(`🪙 Loaded coin details for: ${data.name}`);
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to fetch coin details:", error);
      }
    };

    getCoinDetails();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg text-white">
          <div className="flex items-center space-x-4">
            <img 
              src={coin.image.large} 
              alt={coin.name} 
              className="w-20 h-20 rounded-full border-2 border-yellow-400"
            />
            <div>
              <h2 className="text-3xl font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h2>
              <p className="text-yellow-400 text-2xl">
                💰 USD: ${coin.market_data.current_price.usd.toLocaleString()}
              </p>
              <p className="text-green-400 text-xl">
                🇮🇳 INR: ₹{coin.market_data.current_price.inr.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <CoinChart coinId={id} />
        </div>
      )}
    </div>
  );
};

export default CoinDetails;
