import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useTimeline = (country) => {
  const [data, setData] = useState({ events: [], stats: null });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country) return;

    const fetchTimeline = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.getTimeline(country);
        setData(res.data || { events: [], stats: null });
      } catch (err) {
        setError(err.message || 'Failed to fetch timeline');
        // Fallback mock data for dashboard testing
        setData({
          events: [
            { id: '1', date: 'Jan 1, 2024', title: 'Primary Elections', description: 'Initial voting starts.', status: 'completed' },
            { id: '2', date: 'Nov 5, 2024', title: 'General Election', description: 'The main event.', status: 'upcoming' }
          ],
          stats: {
            daysUntilPolling: '188 Days',
            projectedTurnout: '72.1%',
            activeVoters: '168M',
            healthScore: 88,
            cycleInsight: 'High early voter engagement recorded across major districts.'
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeline();
  }, [country]);

  return { events: data.events, stats: data.stats, isLoading, error, setError };
};
