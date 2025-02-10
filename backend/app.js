import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './database/db.js';
import userRoutes from './routes/user.routes.js';
import eventRoutes from './routes/event.routes.js';
import http from "http";
import { Server } from "socket.io";

import dotenv from 'dotenv';
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});
app.use(morgan('dev'));

const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  optionsSuccessStatus: 200, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes(io));

const port = process.env.PORT || 3000;


server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});