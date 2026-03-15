export const fetchMissionData = async () => {
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

    const phNews = phNewsData?.results?.[0];
    const worldNews = worldNewsData?.results?.[0];

    return [
      {
        id: 'weather-mati',
        title: 'Mati Station Intel',
        desc: `Current Intel: Mati City is at ${weatherData?.current_weather?.temperature}°C. Coastal conditions monitored.`,
        image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: 'success'
      },
      {
        id: `news-ph`,
        title: phNews?.title ? phNews.title.substring(0, 45) + '...' : 'PH Intel',
        desc: phNews?.description ? phNews.description.substring(0, 90) + '...' : 'Local Philippine data stream intercepted.',
        image: phNews?.image_url || 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800',
        status: 'success'
      },
      {
        id: `news-world`,
        title: worldNews?.title ? worldNews.title.substring(0, 45) + '...' : 'Global Intel',
        desc: worldNews?.description ? worldNews.description.substring(0, 90) + '...' : 'International technology signals received.',
        image: worldNews?.image_url || 'https://images.unsplash.com/photo-1504711432869-efd597cdd042?w=800',
        status: 'success'
      },
      {
        id: `crypto-btc`,
        title: 'Market Pulse',
        desc: `Bitcoin Ledger: Currently trading at $${cryptoData?.bitcoin?.usd?.toLocaleString() || 'N/A'}.`,
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800',
        status: 'success'
      },
      {
        id: `space-nasa`,
        title: spaceData?.title || 'Deep Space Monitor',
        desc: `NASA APOD: Daily cosmic metadata intercept complete.`,
        image: spaceData?.url || 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
        status: 'success'
      }
    ];
  } catch (error) {
    console.error("API Sync Error:", error);
    return [{ id: 'err', title: 'System Offline', desc: 'Sync failed.', image: null, status: 'pending' }];
  }
};