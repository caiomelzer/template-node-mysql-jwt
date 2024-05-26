const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const modality = require('../models/modalityModel');

const getModalityById = async (req, res) => {
  try {
    const modality = await modality.findById(req.params.id);
    if (!modality) {
      return res.status(404).send({ error: 'Modalidade não encontrado!' });
    }
    res.send(modality);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getAllModalities = async (req, res) => {
  try {
    const modalities = await modality.findAll();
    if (!modalities) {
      return res.status(404).send({ error: 'Nenhuma modalidade não encontrado!' });
    }
    res.send(modalities);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


module.exports = {
  getModalityById,
  getAllModalities
};

