import { Pool } from 'pg';
import mongoose from 'mongoose';

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || '5432', 10),
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB database');
});

// TypeScript interfaces for models
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface Reservation {
  id: number;
  userId: number;
  date: Date;
  time: string;
  guests: number;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface Testimonial {
  id: number;
  userId: number;
  message: string;
  rating: number;
}

// Database seed script
const seedDatabase = async () => {
  // PostgreSQL seed data
  const users = [
    { name: 'John Doe', email: 'john@example.com', password: 'password123' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
  ];

  const reservations = [
    { userId: 1, date: new Date(), time: '18:00', guests: 2 },
    { userId: 2, date: new Date(), time: '19:00', guests: 4 },
  ];

  const menuItems = [
    { name: 'Pizza', description: 'Delicious cheese pizza', price: 10, category: 'Main' },
    { name: 'Salad', description: 'Fresh garden salad', price: 5, category: 'Appetizer' },
  ];

  const testimonials = [
    { userId: 1, message: 'Great food!', rating: 5 },
    { userId: 2, message: 'Excellent service!', rating: 4 },
  ];

  try {
    await pool.query('BEGIN');

    for (const user of users) {
      await pool.query('INSERT INTO Users (name, email, password) VALUES ($1, $2, $3)', [
        user.name,
        user.email,
        user.password,
      ]);
    }

    for (const reservation of reservations) {
      await pool.query(
        'INSERT INTO Reservations (userId, date, time, guests) VALUES ($1, $2, $3, $4)',
        [reservation.userId, reservation.date, reservation.time, reservation.guests]
      );
    }

    for (const menuItem of menuItems) {
      await pool.query(
        'INSERT INTO MenuItems (name, description, price, category) VALUES ($1, $2, $3, $4)',
        [menuItem.name, menuItem.description, menuItem.price, menuItem.category]
      );
    }

    for (const testimonial of testimonials) {
      await pool.query(
        'INSERT INTO Testimonials (userId, message, rating) VALUES ($1, $2, $3)',
        [testimonial.userId, testimonial.message, testimonial.rating]
      );
    }

    await pool.query('COMMIT');
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error seeding PostgreSQL database:', error);
  }

  // MongoDB seed data
  const UserModel = mongoose.model('User', new mongoose.Schema<User>({
    id: Number,
    name: String,
    email: String,
    password: String,
  }));

  const ReservationModel = mongoose.model('Reservation', new mongoose.Schema<Reservation>({
    id: Number,
    userId: Number,
    date: Date,
    time: String,
    guests: Number,
  }));

  const MenuItemModel = mongoose.model('MenuItem', new mongoose.Schema<MenuItem>({
    id: Number,
    name: String,
    description: String,
    price: Number,
    category: String,
  }));

  const TestimonialModel = mongoose.model('Testimonial', new mongoose.Schema<Testimonial>({
    id: Number,
    userId: Number,
    message: String,
    rating: Number,
  }));

  try {
    await UserModel.insertMany(users);
    await ReservationModel.insertMany(reservations);
    await MenuItemModel.insertMany(menuItems);
    await TestimonialModel.insertMany(testimonials);
  } catch (error) {
    console.error('Error seeding MongoDB database:', error);
  }
};

seedDatabase();
