import express from 'express';
import { Pool } from 'pg';
import { Request, Response } from 'express';

const router = express.Router();
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || '5432', 10),
});

// Reservation model
interface Reservation {
  id: number;
  userId: number;
  date: Date;
  time: string;
  guests: number;
}

// Create new reservation
router.post('/reservations', async (req: Request, res: Response) => {
  const { userId, date, time, guests } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Reservations (userId, date, time, guests) VALUES ($1, $2, $3, $4) RETURNING id',
      [userId, date, time, guests]
    );

    const reservationId = result.rows[0].id;
    res.status(201).json({ reservationId });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all reservations (admin)
router.get('/reservations', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM Reservations');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single reservation
router.get('/reservations/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Reservations WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update reservation
router.put('/reservations/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, date, time, guests } = req.body;

  try {
    const result = await pool.query(
      'UPDATE Reservations SET userId = $1, date = $2, time = $3, guests = $4 WHERE id = $5 RETURNING id',
      [userId, date, time, guests, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({ message: 'Reservation updated' });
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Cancel reservation
router.delete('/reservations/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM Reservations WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({ message: 'Reservation cancelled' });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
