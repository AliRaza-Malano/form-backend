const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const studentsRoutes = require("./routes/studentsRoutes");


const app = express();              
app.use(cors());          
app.use(express.json({ limit: "10mb" }));      // Increase limit for JSON
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Also handle URL-encoded data
app.use("/api/students", studentsRoutes);   

// Example route
app.get("/", (req, res) => {
    const myName = "AliRaza is working on MERN";
  res.send(myName);
});

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => console.error(err));
