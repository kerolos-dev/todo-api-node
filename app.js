const express = require('express');
const app = express();
const port = 8989;
require('dotenv').config();

app.use(express.json());

// Routes
const tasksRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');

app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});