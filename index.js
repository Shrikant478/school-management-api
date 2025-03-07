// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// School Schema & Model
const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

const School = mongoose.model('School', schoolSchema);

// Root Route - Return all schools instead of a welcome message
app.get('/', async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add School API
app.post('/addSchool', async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newSchool = new School({ name, address, latitude, longitude });
    await newSchool.save();
    res.status(201).json({ message: 'School added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add Multiple Schools API
app.post('/addMultipleSchools', async (req, res) => {
  try {
    const schoolsData = [
      { name: "Greenwood High", address: "123 Elm Street", latitude: 40.7128, longitude: -74.0060 },
      { name: "Springfield Academy", address: "456 Maple Ave", latitude: 40.7306, longitude: -73.9352 },
      { name: "Lakeside School", address: "789 Oak Blvd", latitude: 40.7412, longitude: -73.9896 },
      { name: "Sunshine Public School", address: "321 Pine Rd", latitude: 40.7549, longitude: -73.9840 },
      { name: "Mountainview School", address: "654 Cedar Lane", latitude: 40.7580, longitude: -73.9855 },
      { name: "Riverdale High", address: "987 Birch Street", latitude: 40.7624, longitude: -73.9745 },
      { name: "Hilltop Academy", address: "852 Walnut Ave", latitude: 40.7698, longitude: -73.9815 },
      { name: "Valley View School", address: "963 Chestnut St", latitude: 40.7781, longitude: -73.9629 },
      { name: "Harbor School", address: "159 Bay Rd", latitude: 40.7831, longitude: -73.9712 },
      { name: "Sunset Elementary", address: "753 Park Lane", latitude: 40.7900, longitude: -73.9754 },
      { name: "Meadowbrook High", address: "852 Lake Ave", latitude: 40.7967, longitude: -73.9503 },
      { name: "Westwood Academy", address: "357 Valley Rd", latitude: 40.8032, longitude: -73.9568 },
      { name: "Brookside School", address: "741 Willow St", latitude: 40.8100, longitude: -73.9645 },
      { name: "Pinecrest Academy", address: "268 Highland Ave", latitude: 40.8169, longitude: -73.9532 },
      { name: "New Horizon School", address: "974 Summit Blvd", latitude: 40.8222, longitude: -73.9439 }
    ];
    await School.insertMany(schoolsData);
    res.status(201).json({ message: 'Sample schools added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Calculate Distance Function
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// List Schools API
app.get('/listSchools', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    const schools = await School.find();
    const sortedSchools = schools.map(school => ({
      ...school._doc,
      distance: calculateDistance(latitude, longitude, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);
    res.json(sortedSchools);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
