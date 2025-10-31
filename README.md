# 🎨 StoryCraft — AI-Powered Story Generation Platform  

> ✨ A full-stack web application that lets users create, view, and manage AI-generated stories powered by **Gemini API** and **MongoDB**.

---

## 🚀 Tech Stack  

### 🖥️ Frontend  
- **React + Vite**  
- **Tailwind CSS**  
- **Axios** for API calls  

### ⚙️ Backend  
- **Node.js + Express.js**  
- **MongoDB + Mongoose**  
- **JWT Authentication**  
- **CORS & dotenv for environment configuration**  

---

## 🌍 Live Links  

| Service | URL |
|----------|-----|
| **Frontend (Vercel)** | [https://story-craft-seven.vercel.app/](https://story-craft-seven.vercel.app/) |
| **Backend (Render)** | [https://storycraft-backend-s4gn.onrender.com](https://storycraft-backend-s4gn.onrender.com) |

---

---

## 🧠 Features  

✅ AI-based story generation using Gemini API  
✅ User authentication with JWT (Login/Signup)  
✅ MongoDB database for storing stories and user info  
✅ View story history and regenerate stories  
✅ Fully responsive design  

---

## 🧰 Installation & Setup  

Follow these steps to run the project locally 👇  

### 1️⃣ Clone the repository  

```bash
git clone https://github.com/your-username/StoryCraft.git
cd StoryCraft
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Then create a .env file inside the backend folder (based on .env.example):
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
```

Then create a .env file inside the frontend folder (based on .env.example):
```bash
VITE_GEMINI_API_URL=your_api_key_here
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

### 4️⃣ Access the App

Open your browser and go to
👉 http://localhost:5173


---






