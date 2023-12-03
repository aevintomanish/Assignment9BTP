// productsData.js

const axios = require('axios');

async function fetchProducts() {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

module.exports = {
  fetchProducts,
};
