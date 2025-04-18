# 🏠 Home Services App

A full-stack mobile application that allows users to register, log in, and explore a variety of home services such as plumbing, cleaning, electrical work, and more. Built using **React Native** for the frontend and **Node.js + MySQL** for the backend.

---

## 📱 Features

- **User Registration & Login** (JWT Auth)
- **Browse Home Services** with icons, descriptions, and pricing
- **Booking Services**: Users can book different home services directly from the app, selecting the service type, date, and time.
- **Discount/Offers** support for services
- **Bottom Tab Navigation** (Home, Profile, Services, etc.)
- **Form Validation & Error Handling**
- **Backend** built with Node.js + Express + MySQL


## 🛠️ Tech Stack

### Frontend (React Native)
- React Native Web
- Axios
- React Navigation
- Form validation

### Backend (Node.js)
- Express.js
- MySQL (with `mysql2` package)
- Bcrypt.js for password hashing
- JSON Web Token (JWT) for authentication
- CORS enabled

---

## 📦 Project Structure
...
/homeservices
  ├── /screens
  ├── /components
  ├── /assets
  ├── /Server
  └── App.js 
  └── package.json
  └── README.md
...

## 📦 Dependencies

### 📱 React Native (Frontend)

```bash
npm install
npm install @react-navigation/native
npm install @react-navigation/stack
npm install @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npm install axios

🖥️ Node.js (Backend)
bash
cd Server
npm install
npm install express cors mysql2 bcryptjs jsonwebtoken

🏗️ Database Setup (MySQL)
Run the following SQL:

CREATE TABLE login_users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  mobileNumber BIGINT NOT NULL,
  regDate DATETIME,
  PRIMARY KEY (email)
);

📝 Setup Instructions
Clone the repo:

git clone https://github.com/your-username/homeservices.git
cd homeservices

Install frontend dependencies
Configure your backend Server.js to match your local MySQL setup
Run backend server
node Server.js

Run the React Native app
npm start



Let me know if you’re using **Expo**, want to split frontend/backend into different repos, or want to auto-generate AP


