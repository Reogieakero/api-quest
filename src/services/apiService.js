export const fetchMissionData = async () => {
  try {
    const NASA_KEY = process.env.EXPO_PUBLIC_NASA_API_KEY;
    const NEWS_KEY = process.env.EXPO_PUBLIC_NEWSDATA_API_KEY;

    // MATI CITY COORDINATES: lat=6.95, lon=126.21
    const [cryptoRes, newsRes, spaceRes, weatherRes] = await Promise.all([
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
      fetch(`https://newsdata.io/api/1/latest?apikey=${NEWS_KEY}&language=en&category=technology`),
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`),
      fetch('https://api.open-meteo.com/v1/forecast?latitude=6.95&longitude=126.21&current_weather=true')
    ]);

    const cryptoData = await cryptoRes.json();
    const newsData = await newsRes.json();
    const spaceData = await spaceRes.json();
    const weatherData = await weatherRes.json();

    const latestNews = newsData?.results?.[0];
    const matiTemp = weatherData?.current_weather?.temperature;

    return [
      {
        id: 'weather-mati',
        title: 'Mati Station Intel',
        desc: `Current Intel: Mati City is at ${matiTemp}°C. Coastal conditions monitored for mission deployment.`,
        image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: 'success'
      },
      {
        id: `news-${latestNews?.article_id || '1'}`,
        title: latestNews?.title ? latestNews.title.substring(0, 45) + '...' : 'Tech Intercept',
        desc: latestNews?.description ? latestNews.description.substring(0, 90) + '...' : 'New technology data stream intercepted.',
        image: latestNews?.image_url || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
        status: 'success'
      },
      {
        id: `crypto-${Date.now()}`,
        title: 'Market Pulse',
        desc: `Bitcoin Ledger: Currently trading at $${cryptoData?.bitcoin?.usd?.toLocaleString() || 'N/A'}. Analyze volatility.`,
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800',
        status: 'success'
      },
      {
        id: `space-${spaceData?.date || '1'}`,
        title: spaceData?.title || 'Deep Space Monitor',
        desc: `NASA APOD: Daily cosmic metadata intercept complete. Parsing deep space gateway signals.`,
        image: spaceData?.url || 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
        status: 'success'
      }
    ];
  } catch (error) {
    console.error("API Sync Error:", error);
    return [
      { 
        id: 'err', 
        title: 'System Offline', 
        desc: 'Gateway timeout. Local cache active.', 
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800', 
        status: 'pending' 
      }
    ];
  }
};