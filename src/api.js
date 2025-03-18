import axios from "axios";

export const BASE_URL = "https://api.coingecko.com/api/v3";

const api = axios.create({
  baseURL: BASE_URL,
});

const cache = {}; // ✅ Cache object

export const fetchData = async (endpoint) => {
  if (cache[endpoint]) {
    console.log(`🔄 Using cached data for: ${endpoint}`);
    return cache[endpoint]; // ✅ Return cached data
  }

  console.log(`⚡ Fetching new data from API: ${endpoint}`);
  try {
    const response = await api.get(endpoint);
    cache[endpoint] = response.data; // ✅ Store response in cache
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error);
    throw error;
  }
};
