import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const api = {
  chat: async (message, country) => {
    try {
      const response = await apiClient.post('/chat', { message, country });
      return response.data;
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  },

  getTimeline: async (country) => {
    try {
      const response = await apiClient.get(`/timeline/${country}`);
      return response.data;
    } catch (error) {
      console.error('Timeline API Error:', error);
      throw error;
    }
  },

  getSteps: async (country) => {
    try {
      const response = await apiClient.get(`/steps/${country}`);
      return response.data;
    } catch (error) {
      console.error('Steps API Error:', error);
      throw error;
    }
  }
};
