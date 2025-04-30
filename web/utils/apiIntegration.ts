import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

// Fetch menu items from API
export const fetchMenuItems = async () => {
  const response = await axios.get('/api/menu');
  return response.data;
};

// Submit reservations to backend
export const submitReservation = async (reservationData) => {
  const response = await axios.post('/api/reservations', reservationData);
  return response.data;
};

// Handle form submissions
export const handleFormSubmission = async (formData, endpoint) => {
  const response = await axios.post(endpoint, formData);
  return response.data;
};

// Set up React Query for data fetching
export const useMenuItems = () => {
  return useQuery('menuItems', fetchMenuItems);
};

export const useSubmitReservation = () => {
  const queryClient = useQueryClient();
  return useMutation(submitReservation, {
    onSuccess: () => {
      queryClient.invalidateQueries('reservations');
    },
  });
};

// Implement error handling for API calls
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API call error:', error);
    return Promise.reject(error);
  }
);
