const express = require('express');
const { connection } = require('./config/db');
const { userRoute } = require('./routes/userRoute');

require('dotenv').config()

const app = express();
app.use(express.json());

const Port = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.status(200).send('Form Management System')
})

app.use('/api', userRoute);

app.listen(Port, async () => {
    try {
        await connection.sync();
        console.log('Connected to SQL Database');
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running at http://localhost:${Port}`);
})
