import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
import { config } from './config';

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        // Allow all origins if wildcard is set
        if (config.allowedOrigins.includes('*')) {
            return callback(null, true);
        }
        // Allow requests with no origin (like mobile apps, Postman, or file://)
        if (!origin) {
            return callback(null, true);
        }
        if (config.allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'TRACE', 'CONNECT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(compression());
app.use(cookieParser(config.cookieSecret));
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', router());

const server = http.createServer(app);

server.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);
    console.log(`DynamoDB Region: ${config.aws.region}`);
});