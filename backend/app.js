import 'dotenv/config';
import express from 'express';

import AdsRoutes from './routes/AdsRoutes.js';

import cookieParser from "cookie-parser";

import cors from 'cors';





// Middlewares globaux
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Routes
app.use('/ads', AdsRoutes); //monte les routes sur Express, attention au chemin dans routes



// Middleware d'erreur


// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});