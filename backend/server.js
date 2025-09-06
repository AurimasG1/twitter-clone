import express from 'express';
import path from 'path';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import notificationRoutes from './routes/notification.route.js';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

app.use(express.json({ limit: '6mb' })); // to parse req.body DoS attack denial of service
// limit shouldn't be too high to prevent DoS
app.use(express.urlencoded({ extended: true })); // to parse from data

app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/notifications', notificationRoutes);

if (process.env.NODE_ENV === 'production') {
	// Serve frontend static files
	app.use(express.static(path.join(__dirname, '/frontend/dist')));

	// ALL other requests server frontend
	app.get('/{*any}', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
	});
} else {
	// in Development, just show a simple message on root
	app.get('/', (req, res) => {
		res.send('API is running...');
	});
}

app.listen(PORT, () => {
	console.log(`server is up and running on port ${PORT}`);
	connectMongoDB();
});
