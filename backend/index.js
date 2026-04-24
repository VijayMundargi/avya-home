require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const ErrorMiddleware = require('./middlewares/Error');
const UserRoute = require('./routes/user.route.js');
const assocaiateRoute = require('./routes/associate.route.js')
const db = require('./config/database.js');

const app = express();


app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.use(express.json());        
app.use(cookieParser());        


app.use('/api', UserRoute);
app.use('/api',assocaiateRoute);


app.use(ErrorMiddleware);      

db.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("DB Error:", err));

db.sync()
  .then(() => console.log("Tables created"))
  .catch(err => console.log(err));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port :${PORT}`);
});