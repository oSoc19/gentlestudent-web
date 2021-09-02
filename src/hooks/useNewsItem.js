import { useState, useEffect } from 'react';
import { getNewsById } from '../connector/news';

function useNewsItem(initialNews = null, id) {
  const [news, setNews] = useState(initialNews);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const news = await (await getNewsById(id)).json();
        setNews(news);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return [error, loading, news];
}

export default useNewsItem;