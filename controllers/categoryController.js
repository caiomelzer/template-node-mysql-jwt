const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Category = require('../models/categoryModel');

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ error: 'Categoria não encontrado!' });
    }
    res.send(category);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (!categories) {
      return res.status(404).send({ error: 'Nenhuma categoria não encontrado!' });
    }
    res.send(categories);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


module.exports = {
  getCategoryById,
  getAllCategories
};

