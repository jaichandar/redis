const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config();
const { connectDb } = require('./db/connectDb');
const app = express();

const PORT = process.env.PORT || 4000;

connectDb().then((response) => {
    console.log(response.message);
})

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

// Router Wrapper
app.use('/api/v1', require('./routers/index'));

app.get('/api/v1/health-check', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Redis application is up and running'
    })
})

app.listen(PORT, () => {
    console.log(`Application Started on PORT: ${PORT}`);
})