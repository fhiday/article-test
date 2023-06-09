import axios from 'axios';

const API_BASE_URL = 'https://api.onway.kailmedia.com/api';

export const getArticles = async (page = 1, searchTerm = '', page_size=5) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles`, {
      params: {
          search: searchTerm,
          page,
          page_size
      },
      headers: {
          'Access-Control-Allow-Origin': true,
        },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getOneArticles = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles/${id}`, {
      headers: {
          'Access-Control-Allow-Origin': true,
        },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createArticle = async (articleData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/articles`, articleData);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateArticle = async (articleData, id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/articles/${id}`, articleData);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteArticle = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/articles/${id}`);
  } catch (error) {
    console.log(error);
  }
};
