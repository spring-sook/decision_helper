import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import https from 'https';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
// import { db } from './utils/database';
import { verifyToken } from "./middleware/auth.middleware";
import userRoutes from './routes/user.routes';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

let httpServer: http.Server | https.Server;

console.log('☕️ Development mode: Initializing HTTP server.');
httpServer = http.createServer(app);

// 허용할 도메인 목록
const allowedOrigins = process.env.NODE_ENV === 'production' ? [
  'https://buildingshopai.com',
  'https://www.buildingshopai.com',
  'https://sa.inicis.com',
  'https://kssa.inicis.com',
  'https://fcsa.inicis.com'
] : [
  'http://localhost:3000',
  'http://192.168.0.164:3000',
  'http://nexusnas.iptime.org:7500',
  'http://jungin425.iptime.org:7500',
  'https://sa.inicis.com',
  'https://kssa.inicis.com',
  'https://fcsa.inicis.com'
];

// app.use(cors());
app.use(cors({
  origin: (origin, callback) => {
    console.log('request origin', origin);
    // origin이 없는 경우 (예: Postman, 서버 내부 요청, 팝업 등)
    if (!origin || origin === 'null') return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  '/static/images', // URL prefix
  express.static('/mnt/static/images') // 실제 서버 디렉토리
);


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/*', verifyToken);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 오류가 발생했습니다.' });
});

// Initialize database connection and start server
const startServer = async () => {
  try {
    // await db.connect();
    httpServer.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  // await db.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Shutting down gracefully...');
  // await db.disconnect();
  process.exit(0);
});

startServer();
