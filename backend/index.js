const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
require('dotenv').config()
const cookieParser = require('cookie-parser')

const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;


//middleware
app.use(express.json({limit:"25mb"}));
//app.use(express.urlencoded({limit:"25mb"}))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
    origin:'http://localhost:5173/',
    credentials:true
}))
//routes
const authRoutes  = require('./src/users/user.route');
app.use('/api/auth',authRoutes)

// ✅ MongoDB Atlas Connection
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }

  // ✅ Basic route
app.get('/', (req, res) => {
  res.send('Elysian server running.....');
});
}

main();



// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
