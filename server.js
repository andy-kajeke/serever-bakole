require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.listen(process.env.APP_PORT, () => {
    console.log('server is running at http://localhost:' + process.env.APP_PORT);
});

const userRouter = require('./apis/users/users.router');
const taskRouter = require('./apis/Tasks/categories/taskCategories.router');
const employerRouter = require('./apis/Tasks/subcategories/subcategories.router');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/task_icons', express.static('task_icons/'));
app.use('/api/v1/employer/advert', employerRouter);