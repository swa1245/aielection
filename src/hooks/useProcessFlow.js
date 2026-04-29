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
        setSteps(res.data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch process steps');
        // Fallback mock data
        setSteps([
          {
            id: 's1',
            title: 'Voter Registration',
            description: 'Ensure you are registered to vote before the deadline.',
            details: [
              'Visit the official election portal',
              'Upload your proof of identity and address',
              'Submit the application form online or in-person',
              'Receive your voter ID card via mail'
            ],
            requiredDocs: ['National ID', 'Proof of Address'],
            estimatedTime: '2-3 weeks',
            icon: 'registration'
          },
          {
            id: 's2',
            title: 'Research Candidates',
            description: 'Review the platforms and backgrounds of running candidates.',
            details: [
              'Check official candidate lists',
              'Read party manifestos and platforms',
              'Attend local town hall meetings',
              'Verify candidate credentials'
            ],
            requiredDocs: [],
            estimatedTime: '1-2 days',
            icon: 'check'
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
