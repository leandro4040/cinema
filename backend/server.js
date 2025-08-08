require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./src/api/routes/authRoutes');
const mediaRoutes = require('./src/api/routes/mediaRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});