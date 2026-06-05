const express = require('express');
const app = express();
const port = 8989;
const  globalError = require('./middlewares/error')
require('dotenv').config();

app.use(express.json());
// Routes
const tasksRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');

app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);
app.use(globalError)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});