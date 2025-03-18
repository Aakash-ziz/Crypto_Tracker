import { useEffect, useState } from "react";
import { fetchData } from "../api";  // ✅ Correct import
import Loader from "./Loader";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getExchanges = async () => {
      try {
        const data = await fetchData("/exchanges");
        setExchanges(data);
        console.log(`🏛️ Loaded ${data.length} exchanges`);
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to fetch exchanges:", error);
      }
    };

    getExchanges();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? <Loader /> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {exchanges.map((exchange) => (
            <div key={exchange.id} className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
              {/* ✅ Display Exchange Logo */}
              <img 
                src={exchange.image} 
                alt={exchange.name} 
                className="w-16 h-16 mb-2 rounded-full border-2 border-yellow-400"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/50"; // ✅ Fallback image
                }}
              />
              <h3 className="text-lg font-bold text-white">{exchange.name}</h3>
              <p className="text-yellow-400">Trust Score: {exchange.trust_score}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exchanges;
