require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const participantRoutes = require('./routes/participantRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/events', eventRoutes);
app.use('/api/participants', participantRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
