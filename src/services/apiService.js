export const fetchMissionData = async () => {
  try {
    const NASA_KEY = process.env.EXPO_PUBLIC_NASA_API_KEY;
    const NEWS_KEY = process.env.EXPO_PUBLIC_NEWSDATA_API_KEY;

    const [cryptoRes, newsRes, spaceRes] = await Promise.all([
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
      fetch(`https://newsdata.io/api/1/latest?apikey=${NEWS_KEY}&language=en&category=technology`),
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`)
    ]);

    const cryptoData = await cryptoRes.json();
    const newsData = await newsRes.json();
    const spaceData = await spaceRes.json();

    const latestNews = newsData?.results?.[0];

    // Check your terminal for this output!
    console.log("--- DEBUG NEWS DATA ---");
    console.log("Article Title:", latestNews?.title);
    console.log("Image URL from API:", latestNews?.image_url);
    console.log("-----------------------");

    let newsImage = latestNews?.image_url;
    if (newsImage && newsImage.startsWith('http:')) {
      newsImage = newsImage.replace('http:', 'https:');
    }

    return [
      {
        id: `news-${latestNews?.article_id || Date.now()}`,
        title: latestNews?.title ? latestNews.title.substring(0, 45) + '...' : 'Tech Intel',
        desc: latestNews?.description ? latestNews.description.substring(0, 90) + '...' : 'New technology data stream intercepted.',
        image: newsImage || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
        status: 'success'
      },
      {
        id: `crypto-${Date.now()}`,
        title: 'Market Pulse',
        desc: `Live Feed: Bitcoin is currently trading at $${cryptoData?.bitcoin?.usd?.toLocaleString() || 'N/A'}.`,
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800',
        status: 'success'
      },
      {
        id: `space-${spaceData?.date || Date.now()}`,
        title: spaceData?.title || 'Deep Space Monitor',
        desc: `NASA APOD: Daily cosmic metadata intercept complete.`,
        image: spaceData?.url || 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
        status: 'success'
      }
    ];
  } catch (error) {
    console.error("CRITICAL ERROR:", error);
    return [
      { id: 'err', title: 'Gateway Offline', desc: 'Sync failed.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800', status: 'pending' }
    ];
  }
};