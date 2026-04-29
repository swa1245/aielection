import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useProcessFlow = (country) => {
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country) return;

    const fetchSteps = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.getSteps(country);
        setSteps(res.steps || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch process steps');
        // Fallback mock data
        setSteps([
          {
            step: 1,
            title: 'Voter Registration',
            details: 'Ensure you are registered to vote before the deadline.',
            documents: ['ID', 'Proof of Address'],
            resources: ['Registration Portal'],
            options: ['Online', 'In-person']
          },
          {
            step: 2,
            title: 'Research Candidates',
            details: 'Review the platforms and backgrounds of running candidates.',
            documents: [],
            resources: ['Voter Guide'],
            options: []
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSteps();
  }, [country]);

  return { steps, isLoading, error, setError };
};
