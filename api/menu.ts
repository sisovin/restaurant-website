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

// Get all menu items
router.get('/menu', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM MenuItems');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get menu categories
router.get('/menu/categories', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT DISTINCT category FROM MenuItems');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching menu categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get items by category
router.get('/menu/:category', async (req: Request, res: Response) => {
  const { category } = req.params;

  try {
    const result = await pool.query('SELECT * FROM MenuItems WHERE category = $1', [category]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin CRUD endpoints for menu management

// Create new menu item
router.post('/menu', async (req: Request, res: Response) => {
  const { name, description, price, category } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO MenuItems (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, description, price, category]
    );

    const menuItemId = result.rows[0].id;
    res.status(201).json({ menuItemId });
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update menu item
router.put('/menu/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;

  try {
    const result = await pool.query(
      'UPDATE MenuItems SET name = $1, description = $2, price = $3, category = $4 WHERE id = $5 RETURNING id',
      [name, description, price, category, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item updated' });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete menu item
router.delete('/menu/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM MenuItems WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item deleted' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
