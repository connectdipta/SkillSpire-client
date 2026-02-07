# 🌐 SkillSpire Frontend

Frontend application for **SkillSpire**, a modern contest creation and participation platform where users can compete, win prizes, and climb the leaderboard.

Built with **React**, **Firebase Authentication**, and a modern UI/UX approach.

---

## 🔗 Live Website
- **Local URL:** `https://skillspire-client-beta.vercel.app/`  

---

## 🛠️ Technologies Used
- **React (Vite)**
- **React Router**
- **Firebase Authentication**
- **Axios**
- **Tailwind CSS + DaisyUI**
- **Framer Motion**
- **SweetAlert2**
- **AOS (Animate On Scroll)**

---

## 🎨 UI Highlights
- Modern **dark-themed UI**
- Fully **responsive design** (mobile, tablet, desktop)
- Smooth **animations** (Framer Motion + AOS)
- **Role-based dashboards**
- Real-time **leaderboard**
- Contest **status badges** (Active / Ended)

---

## 🔐 Authentication System
- Email & Password Login
- Google Login (Firebase)
- JWT-based session (via backend cookies)
- Auto-login on refresh
- Secure logout

### 🔄 Authentication Flow
1. User logs in via **Firebase**
2. Frontend sends user data to backend `/jwt`
3. Backend sets JWT in **HTTP-only cookie**
4. Protected routes automatically validate JWT

---

## 👥 User Roles & Dashboards

### 👤 Normal User
- Browse contests
- Join contests (payment)
- Submit entries
- View participated contests
- View winning contests
- Appear on leaderboard

### 🧑‍🎨 Contest Creator
- Create contests
- Edit/Delete pending contests
- View submissions
- Declare winners

### 🛡️ Admin
- Approve / reject contests
- Delete contests
- Manage users
- Full system access

---


---

## 🔒 Route Protection

| Route Type | Protection |
|-----------|-----------|
| Private Routes | Logged-in users only |
| Admin Routes | Admin role required |
| Creator Routes | Creator role required |

### Implemented Using
- `AuthProvider`
- Custom hooks (`useAdmin`, `useCreator`)
- Backend JWT validation

---

## 🏆 Core Features

### 🎯 Contest System
- Contest cards with **Active / Ended** status
- Participant count
- Prize pool display
- Search & filter contests

### 📝 Submission System
- Secure submission per contest
- Creator-only submission view
- Winner declaration

### 🥇 Leaderboard
- Ranked by total wins
- Profile photo & name
- Animated podium UI

### 🏅 My Winning Contests
- List of all winning contests
- Prize earned
- Winning date
- Direct access to winning entry

### 💳 Payment Integration (Simulation)
- Contest registration via payment API
- Prevents duplicate registration
- Auto participant count update

---

## ⚙️ Environment Variables

Create a `.env` file in the frontend root and add:

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_API_URL=http://localhost:3000
🚀 Getting Started
Install Dependencies
npm install
Run Development Server
npm run dev
🔗 Backend Dependency
This frontend depends on the SkillSpire Backend API for:

Authentication (JWT)

Contest management

Payments

Submissions

Leaderboard

👉 Make sure the backend server is running before login.

🔑 Demo Login Credentials
Use the following credentials to explore different roles in the application.

⚠️ These credentials are for testing/demo purposes only.

🛡️ Admin Account
Email: dip@gmail.com

Password: dip@gmail.com

Admin Access Includes:

Approve / reject contests

Delete contests

Manage users

Full system control

🧑‍🎨 Contest Creator Account
Email: dipta@gmail.com

Password: dipta@gmail.com

Creator Access Includes:

Create contests

Edit/Delete pending contests

View submissions

Declare winners

👤 Normal User Account
Email: user@skillspire.com

Password: User@123

User Access Includes:

Join contests

Submit entries

View leaderboard

View winning contests

🔐 Notes
Authentication handled using Firebase Authentication

Role verification via backend JWT

JWT stored in HTTP-only cookies for enhanced security

✅ Assignment Requirement Coverage
✔ Google & Email Authentication
✔ Role-based dashboards
✔ Contest creation & approval
✔ Secure submission & winner system
✔ Leaderboard
✔ Modern UI with animations
✔ Protected routes
✔ Backend integration via JWT

👨‍💻 Author
DIPTA ACHARJEE
BSc in CSE
