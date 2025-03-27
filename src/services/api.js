import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    return {
      success: false,
      message: error.response.data.error || 'An error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      success: false,
      message: 'No response from server. Please check your network connection.',
      status: null
    };
  } else {
    // Something happened in setting up the request
    return {
      success: false,
      message: 'Error processing your request',
      status: null
    };
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return { success: true, token: response.data.token };
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchUsers = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?page=${page}`);
    return { 
      success: true, 
      data: response.data.data, 
      total_pages: response.data.total_pages 
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
    return { 
      success: true, 
      data: response.data,
      message: 'User updated successfully'
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/users/${id}`);
    return { 
      success: true, 
      message: 'User deleted successfully' 
    };
  } catch (error) {
    return handleApiError(error);
  }
};