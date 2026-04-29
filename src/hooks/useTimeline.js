import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useTimeline = (country) => {
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country) return;

    const fetchTimeline = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.getTimeline(country);
        setTimeline(res.timeline || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch timeline');
        // Fallback mock data for visual testing if API fails
        setTimeline([
          { date: 'Jan 1, 2024', event: 'Primary Elections Begin' },
          { date: 'Jul 15, 2024', event: 'National Convention' },
          { date: 'Nov 5, 2024', event: 'General Election Day' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeline();
  }, [country]);

  return { timeline, isLoading, error, setError };
};
