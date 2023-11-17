// index.js
import express from 'express';
import bodyParser from 'body-parser';
import database from './src/database/database.js'
import router from './src/routes/auth.js';

// dotenv
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;

// bodyParser for middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', router);

// Sinkron database
database.sync()
.then(() => {
    // console.log("Database synced");
    // server
    app.listen(port, ()  => {
        console.log(`Server is running on port: ${port}`)
    });
})
.catch((err) => {
    console.error('Error sync DB:', err)
})

