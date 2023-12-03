// server.js

const express = require('express');
const productsData = require('./productsData');

const app = express();
const PORT = process.env.PORT || 5007;

app.get('/products', async (req, res) => {
  const { id, category, brand } = req.query;

  try {
    const products = await productsData.fetchProducts();

    if (id) {
      const productById = products.find(product => product.id.toString() === id);
      if (productById) {
        return res.json(productById);
      } else {
        return res.status(404).json({ error: 'Product not found' });
      }
    }

    if (category) {
      const productsByCategory = products.filter(product => product.category === category);
      return res.json(productsByCategory);
    }

    if (brand) {
      const productsByBrand = products.filter(product => product.brand === brand);
      return res.json(productsByBrand);
    }

    return res.status(400).json({ error: 'Please provide valid parameters' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
