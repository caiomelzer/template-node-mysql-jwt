const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const eventRoutes = require('./routes/eventRoutes');
const modalityRoutes = require('./routes/modalityRoutes');
require('dotenv').config();
const setupSwagger = require('./swagger'); // Importa a configuração do Swagger

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/modalities', modalityRoutes);

// Configura o Swagger
setupSwagger(app);

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});

