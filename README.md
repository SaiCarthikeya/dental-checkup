# 🦷 Dental Checkup System

A **full-stack web application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) that simulates a basic dental checkup system. It allows patients to request checkups, view results with images and descriptions, and export details as PDFs. Dentists can upload checkup results. The app includes secure user authentication with **JWT**.

---

## ✨ Features

- ✅ User registration and login  
- 🧑‍⚕️ View a list of available dentists  
- 📅 Request a checkup with a selected dentist  
- 🖼️ View checkup results (images + descriptions)  
- 📄 Export checkup details as PDF  
- 🔐 JWT-based user authentication  

---

## ⚙️ Setup Instructions

### 📋 Prerequisites

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (or local MongoDB)
- [Node.js](https://nodejs.org/) installed

---

### 🔧 Step 1: Set Up MongoDB

1. Create a MongoDB Atlas account (or set up a local instance).
2. Create a new **cluster**.
3. Copy the **connection string** provided by MongoDB Atlas.
4. Update your `.env` file with the string under `MONGO_URI`.

---

### 📥 Step 2: Clone the Repository

```bash
git clone https://github.com/SaiCarthikeya/dental-checkup-system.git
cd dental-checkup-system
```

---

### 🔙 Step 3: Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a `.env` file and add the following:

```env
PORT=5000
MONGO_URI=mongodb+srv...
JWT_SECRET=your_secure_jwt_secret
```

3. Install dependencies:

```bash

npm install
```

4. Start the backend server:

```bash
npm start
```

Backend should now be running at: `http://localhost:5000`

---

### 🖥️ Step 4: Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

Frontend should now be running at: `http://localhost:5173`

---

### 🌐 Step 5: Access the Application

Open your browser and go to: [http://localhost:5173](http://localhost:5173)  
Ensure the backend is running at: [http://localhost:5000](http://localhost:5000)

---

## 📌 Additional Information

- The frontend communicates with the backend using **REST APIs**.
- Authentication is handled using **JWT (JSON Web Tokens)**.
- Ensure your JWT secret is securely stored in the `.env` file.

---
