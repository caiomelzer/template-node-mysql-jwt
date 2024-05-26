const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
	  try {
		      const { name, email, password } = req.body;
		      const hashedPassword = await bcrypt.hash(password, 10);
		      const userData = { name, email, password: hashedPassword };

		      const result = await User.create(userData);
		      res.status(201).send({ message: 'Usuário criado com sucesso!', userId: result.insertId });
		    } catch (err) {
			        res.status(500).send({ error: err.message });
			      }
};

const loginUser = async (req, res) => {
	  try {
		      const { email, password } = req.body;
		      const user = await User.findByEmail(email);
		      if (!user) {
			            return res.status(404).send({ error: 'Usuário não encontrado!' });
			          }

		      const isMatch = await bcrypt.compare(password, user.password);
		      if (!isMatch) {
			            return res.status(400).send({ error: 'Senha incorreta!' });
			          }

		      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
		      res.send({ token });
		    } catch (err) {
			        res.status(500).send({ error: err.message });
			      }
};

const getUsers = async (req, res) => {
	  try {
		      const users = await User.findAll();
		      res.send(users);
		    } catch (err) {
			        res.status(500).send({ error: err.message });
			      }
};

const getUserById = async (req, res) => {
	  try {
		      const user = await User.findById(req.params.id);
		      if (!user) {
			            return res.status(404).send({ error: 'Usuário não encontrado!' });
			          }
		      res.send(user);
		    } catch (err) {
			        res.status(500).send({ error: err.message });
			      }
};

const updateUser = async (req, res) => {
	  try {
		      const { name, email } = req.body;
		      const userData = { name, email };

		      const result = await User.update(req.params.id, userData);
		      res.send({ message: 'Usuário atualizado com sucesso!' });
		    } catch (err) {
			        res.status(500).send({ error: err.message });
			      }
};

const deleteUser = async (req, res) => {
	  try {
		      await User.delete(req.params.id);
		      res.send({ message: 'Usuário deletado com sucesso!' });
		    } catch (err) {
			        res.status(500).send({ error: err.message });
			      }
};

module.exports = {
	  createUser,
	  loginUser,
	  getUsers,
	  getUserById,
	  updateUser,
	  deleteUser
};

