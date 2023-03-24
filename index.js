const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


// const notfoundMiddleware = require('./middleware/notfound');
const connectDB = require('./db_config/database');
const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');


const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));





//test route
app.get('/app/v1', (req, res, next) => {
    res.send('Hello World');
});

//CRUD routes
app.use('/app/v1', require('./routes/todoRoutes'));

app.use(notFound);
app.use(errorHandler);


app.listen(3000, () => {
    console.log('Server started on port 3000');
})

// connect to PostgreSQL server
connectDB();