import axios from "axios";
import { YOUR_APP_ID, YOUR_APP_KEY } from "./APIKeys";

let lastRequestTime = 0;
const requestInterval = 6000; 

export const generateApiLink = (base, queryParams) => {
  const timestamp = new Date().getTime();
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `${base}?${queryString}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&timestamp=${timestamp}`;
};

export const getRecipes = async (url, setRecipes) => {
  const now = Date.now();

  if (now - lastRequestTime < requestInterval) {
    const waitTime = requestInterval - (now - lastRequestTime);
    console.log(`Throttling request, waiting for ${waitTime}ms`);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }

  lastRequestTime = Date.now();

  try {
    const response = await axios.get(url);
    setRecipes(response.data.hits);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

