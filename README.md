# School Management API 🚀📚

## Introduction 🎯
This project provides a Node.js and Express-based REST API for managing school data. It allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location. The database used is MongoDB.

## Features ✨
- Add a school to the database ✅
- Retrieve a list of schools sorted by distance from a given location 🌍
- Bulk insertion of sample schools 🏫
- Hosted on a cloud platform ☁️

## Tech Stack 🛠️
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Hosting**: (To be added based on deployment)

---

## Setup Instructions 🏗️

### 1️⃣ Clone the Repository 🖥️
```sh
git clone https://github.com/Shrikant478/school-management-api.git
cd school-management-api
```

### 2️⃣ Install Dependencies 📦
```sh
npm install
```

### 3️⃣ Configure Environment Variables 🔑
Create a `.env` file in the project root and add the following:
```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4️⃣ Start the Server 🚀
```sh
npm start
```
The server will run on `http://localhost:5000`.

---

## API Endpoints 📡

### ➕ Add a School
**Endpoint:** `POST /addSchool`

**Request Body (JSON):**
```json
{
  "name": "Greenwood High",
  "address": "123 Elm Street",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Response:**
```json
{
  "message": "School added successfully"
}
```

---

### 📋 List Schools by Proximity
**Endpoint:** `GET /listSchools?latitude=40.7128&longitude=-74.0060`

**Response (Sorted by Distance):**
```json
[
  {
    "name": "Springfield Academy",
    "address": "456 Maple Ave",
    "latitude": 40.7306,
    "longitude": -73.9352,
    "distance": 1.2
  },
  {
    "name": "Lakeside School",
    "address": "789 Oak Blvd",
    "latitude": 40.7412,
    "longitude": -73.9896,
    "distance": 3.5
  }
]
```

---

### 🏫 Add Multiple Schools
**Endpoint:** `POST /addMultipleSchools`

**Response:**
```json
{
  "message": "Sample schools added successfully"
}
```

---

## Testing with Postman 🛠️
1. Open **Postman**.
2. Import the Postman collection (provided in the repo).
3. Send requests to the APIs.
4. Verify responses and data.

---

## Contributing 🤝
Feel free to raise issues and submit PRs to improve the API.

---

## License 📜
This project is open-source and available under the MIT License.

---

🚀 **Happy Coding!**

