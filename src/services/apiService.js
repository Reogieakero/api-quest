export const fetchApiData = async () => {
  try {
    const NASA_KEY = process.env.EXPO_PUBLIC_NASA_API_KEY;
    const NEWS_KEY = process.env.EXPO_PUBLIC_NEWSDATA_API_KEY;

    const [cryptoRes, phNewsRes, worldNewsRes, spaceRes, weatherRes] = await Promise.all([
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
      fetch(`https://newsdata.io/api/1/latest?apikey=${NEWS_KEY}&country=ph&language=en`),
      fetch(`https://newsdata.io/api/1/latest?apikey=${NEWS_KEY}&language=en&category=technology`),
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`),
      fetch('https://api.open-meteo.com/v1/forecast?latitude=6.95&longitude=126.21&current_weather=true')
    ]);

    const cryptoData = await cryptoRes.json();
    const phNewsData = await phNewsRes.json();
    const worldNewsData = await worldNewsRes.json();
    const spaceData = await spaceRes.json();
    const weatherData = await weatherRes.json();

    const apiData = [];

    apiData.push({
      id: 'weather-mati',
      title: 'Mati Station Intel',
      desc: `Current Intel: Mati City is at ${weatherData?.current_weather?.temperature}°C. Coastal conditions monitored.`,
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'success',
      source: 'weather'
    });

    const phResults = phNewsData?.results || [];
    phResults.forEach((article, index) => {
      apiData.push({
        id: `news-ph-${article.article_id || index}`,
        title: article.title || 'PH Intel',
        desc: article.description || 'Local Philippine data stream intercepted.',
        image: article.image_url || 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: 'success',
        source: 'news-ph'
      });
    });

    const worldResults = worldNewsData?.results || [];
    worldResults.forEach((article, index) => {
      apiData.push({
        id: `news-world-${article.article_id || index}`,
        title: article.title || 'Global Intel',
        desc: article.description || 'International technology signals received.',
        image: article.image_url || 'https://images.pexels.com/photos/1504711/pexels-photo-1504711.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: 'success',
        source: 'news-world'
      });
    });

    apiData.push({
      id: `crypto-btc`,
      title: 'Market Pulse',
      desc: `Bitcoin Ledger: Currently trading at $${cryptoData?.bitcoin?.usd?.toLocaleString() || 'N/A'}.`,
      image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800',
      status: 'success',
      source: 'crypto'
    });

    apiData.push({
      id: `space-nasa`,
      title: spaceData?.title || 'Deep Space Monitor',
      desc: `NASA APOD: Daily cosmic metadata intercept complete.`,
      image: spaceData?.url || 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
      status: 'success',
      source: 'space'
    });

    return apiData;

  } catch (error) {
    console.error("API Sync Error:", error);
    return [{ id: 'err', title: 'System Offline', desc: 'Sync failed.', image: null, status: 'pending', source: 'system' }];
  }
};