const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
        [email, hashedPassword]
    );
    res.json({ message: 'User created', user: result.rows[0] });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    const user = result.rows[0];
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Wrong password' });
    const token = jwt.sign(
        { id: user.id, email: user.email },
        'mysecretkey',
        { expiresIn: '1d' }
    );
    res.json({ message: 'Login successful', token });
};



module.exports = { register, login };