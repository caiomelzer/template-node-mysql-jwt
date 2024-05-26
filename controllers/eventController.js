const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Event = require('../models/eventModel');
const User = require('../models/userModel');
const createEvent = async (req, res) => {
	try {
		const { name, category_id, start_at, end_at, modality_id } = req.body;

		const organizer_id = User.getUserLogged(User.getUserToken(req))
		const eventData = { name, category_id, start_at, end_at, organizer_id, modality_id };
		const result = await Event.create(eventData);
		res.status(201).send({ message: 'Evento criado com sucesso!', event_id: result.insertId });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const getEvents = async (req, res) => {
	try {
		const filters = req.query
		const events = await Event.findAll(filters);
		res.send(events);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

const getEventById = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) {
			return res.status(404).send({ error: 'Evento não encontrado!' });
		}
		res.send(event);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
};

module.exports = {
	createEvent,
	getEvents,
	getEventById
};

