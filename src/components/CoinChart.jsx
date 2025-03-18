import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { fetchData } from "../api";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChartData = async () => {
      try {
        const data = await fetchData(`/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
        const prices = data.prices.map((price) => ({
          x: new Date(price[0]).toLocaleDateString(),
          y: price[1],
        }));

        setChartData({
          labels: prices.map((p) => p.x),
          datasets: [
            {
              label: "Price (USD)",
              data: prices.map((p) => p.y),
              borderColor: "rgb(255, 205, 86)",
              backgroundColor: "rgba(255, 205, 86, 0.2)",
            },
          ],
        });

        console.log(`📊 CoinChart Data Points: ${prices.length}`);
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to fetch chart data:", error);
      }
    };

    getChartData();
  }, [coinId]);

  return (
    <div className="mt-4">
      {loading ? <p>Loading chart...</p> : <Line data={chartData} />}
    </div>
  );
};

export default CoinChart;
