require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ProjectRoute = require('./routes/project.route.js')
const ErrorMiddleware = require('./middlewares/Error');
const UserRoute = require('./routes/user.route.js');
const assocaiateRoute = require('./routes/associate.route.js')
require('./models/ProjectModel.js');
const db = require('./config/database.js');
const PlotRoute = require('./routes/plot.route.js');
require('./models/PlotModel.js');
const corsConfig = require('./config/corsConfig.js')
const CustomerRoute = require('./routes/customer.route.js')
const app = express();



app.use(corsConfig());
app.use(express.json());        
app.use(cookieParser());        
app.use(express.urlencoded({ extended: true }));

app.use('/api', UserRoute);
app.use('/api',assocaiateRoute);
app.use('/api',ProjectRoute)
app.use('/api/plot', PlotRoute);
app.use('/api',CustomerRoute)


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