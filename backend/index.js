const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ===========================
//        BOOK ROUTES
// ===========================

app.get('/books', async (req, res) => {
  const result = await db.query('SELECT * FROM ob_project.books order by id');
  res.json(result.rows);
});

app.get('/book/:id', async(req,res)=>{
  const result = await db.query('SELECT * from ob_project.books where id=$1',[req.params.id])
  res.json(result.rows[0])
})

app.post('/books', async (req, res) => {
  const { name, author, language, quantity } = req.body;
  const result = await db.query(
    'INSERT INTO ob_project.books (name, author, language, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, author, language, quantity]
  );
  res.json(result.rows[0]);
});

app.put('/books/:id', async (req, res) => {
  const { name, author, language, quantity } = req.body;
  const result = await db.query(
    'UPDATE ob_project.books SET name=$1, author=$2, language=$3, quantity=$4 WHERE id=$5 RETURNING *',
    [name, author, language, quantity, req.params.id]
  );
  res.json(result.rows[0]);
});

app.delete('/books/:id', async (req, res) => {
  await db.query('DELETE FROM ob_project.books WHERE id=$1', [req.params.id]);
  res.json({ message: 'Book deleted' });
});

app.get('/books/authors',async(req,res)=>{
  const result = await db.query('SELECT distinct author from ob_project.books')
  res.json(result.rows)
})

app.get('/book/:id/comments',async(req,res)=>{
  const result = await db.query('SELECT br.*, u.name from ob_project.book_reviews br join ob_project.users u on u.id=br.user_id where br.book_id=$1;',
    [req.params.id]
  )
  res.json(result.rows)
})

// ===========================
//        USER ROUTES
// ===========================

app.get('/users', async (req, res) => {
  const result = await db.query('SELECT * FROM ob_project.users');
  res.json(result.rows);
});

app.get('/user/:id', async (req,res)=>{
  const result = await db.query('Select * from ob_project.users where id=$1',[req.params.id])
  res.json(result.rows[0])
})

app.post('/login', async (req, res) => {
  const { email_id, password } = req.body;
  try {
    const result = await db.query(
      'SELECT * FROM ob_project.users WHERE lower(email_id) = $1',
      [email_id.toLowerCase()]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login successful',
      user: userWithoutPassword
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/user', async (req, res) => {
  try {
    const { name, email_id, contact, password } = req.body;

    if (!name || !email_id || !contact || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO ob_project.users (name, email_id, contact, password) VALUES ($1, $2, $3, $4)`,
      [name, email_id.toLowerCase(), contact, hashedPassword]
    );

    res.json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/user/:id', async (req, res) => {
  const { name, age, contact } = req.body;
  const result = await db.query(
    'UPDATE ob_project.users SET name=$1, age=$2, contact=$3 WHERE id=$4 RETURNING *',
    [name, age, contact, req.params.id]
  );
  res.json(result.rows[0]);
});

app.delete('/users/:id', async (req, res) => {
  await db.query('DELETE FROM ob_project.users WHERE id=$1', [req.params.id]);
  res.json({ message: 'User deleted' });
});

// ===========================
//          CART
// ===========================

app.get('/users/:id/cart', async (req, res) => {
  const result = await db.query('SELECT * FROM ob_project.carts WHERE user_id=$1', [req.params.id]);
  res.json(result.rows[0]);
});

app.post('/users/:id/cart', async (req, res) => {
  const userId = req.params.id;
  const { items } = req.body;

  const existing = await db.query('SELECT * FROM ob_project.carts WHERE user_id=$1', [userId]);
  if (existing.rows.length > 0) {
    const result = await db.query(
      'UPDATE ob_project.carts SET items=$1, added_on_date=NOW() WHERE user_id=$2 RETURNING *',
      [items, userId]
    );
    res.json(result.rows[0]);
  } else {
    const result = await db.query(
      'INSERT INTO ob_project.carts (user_id, items) VALUES ($1, $2) RETURNING *',
      [userId, items]
    );
    res.json(result.rows[0]);
  }
});

app.delete('/users/:id/cart', async (req, res) => {
  await db.query('DELETE FROM ob_project.carts WHERE user_id=$1', [req.params.id]);
  res.json({ message: 'Cart cleared' });
});

// ===========================
//         ORDER
// ===========================

app.get('/users/:id/orders', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM ob_project.orders WHERE user_id=$1 ORDER BY order_date DESC',
    [req.params.id]
  );
  res.json(result.rows);
});

app.post('/users/:id/orders', async (req, res) => {
  const userId = req.params.id;
  const { delivery_date } = req.body;

  const cartRes = await db.query('SELECT * FROM ob_project.carts WHERE user_id=$1', [userId]);
  if (cartRes.rows.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const items = cartRes.rows[0].items;

  // Decrement book stock
  for (const item of items) {
    await db.query(
      'UPDATE ob_project.books SET quantity = quantity - $1 WHERE id=$2',
      [item.quantity, item.book_id]
    );
  }

  const result = await db.query(
    'INSERT INTO ob_project.orders (user_id, items, delivery_date) VALUES ($1, $2, $3) RETURNING *',
    [userId, items, delivery_date]
  );

  await db.query('DELETE FROM ob_project.carts WHERE user_id=$1', [userId]);

  res.json(result.rows[0]);
});

// ===========================
//        SERVER START
// ===========================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
