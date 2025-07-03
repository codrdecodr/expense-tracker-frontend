
# 💸 Expense Tracker

A full-stack expense tracker app built to help users manage and monitor their daily expenses efficiently.


## 🚀 Features

- ✅ User Registration & Login with secure JWT authentication
- ✅ Add, view, update and delete expenses
- ✅ Filter expenses by category
- ✅ Real-time expense list updates
- ✅ Total amount calculation
- ✅ Backend integration with MongoDB and Express


## 🧰 Tech Stack

### Frontend:
- React
- React Router
- CSS 

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for Authentication


## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/codrdecodr/expense-tracker-frontend.git
cd expense-tracker-frontend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

Make sure the backend server is also running (typically on port `5000`).


## 🔁 API Integration

All expense and user data is managed via RESTful APIs. The frontend communicates securely with the backend using stored JWT tokens.


## 📂 Project Structure

```bash
expense-tracker-frontend/
│
├── public/
├── src/
│   ├── components/       # Navbar, Forms, Lists
│   ├── pages/            # Login, Register, Dashboard
│   ├── util/             # auth utilities (e.g., token storage)
│   └── App.js
├── package.json
└── README.md
```

## 👤 Author

Developed by Mansi  
GitHub: [@codrdecodr](https://github.com/codrdecodr)

