# SkyGeni_Project

This is a full-stack React + TypeScript + D3.js + Express project that visualizes ACV (Annual Contract Value) data across customer types, teams, and account industries. The frontend uses Material UI and D3.js for beautiful data visualizations, and the backend serves JSON data via Express APIs.

---

## 🗂 Project Structure

```
SkyGeni_Project/
├── frontend/              # React app with D3.js charts
├── backend/               # Node.js + TypeScript server with APIs
└── README.md
```

---

## 🚀 Functionality Overview

- 📊 **Customer Type Dashboard**  
  - Stacked Bar + Donut Chart showing ACV trends across new vs existing customers.

- 👥 **Team Dashboard**  
  - Grouped Bar Chart showing team ACV per quarter.
  - Donut chart for overall ACV contribution by team.

- 🏭 **Account Industry Dashboard**  
  - Horizontal Bar Chart showing ACV distribution by industry.

---

## ⚙️ Setup Instructions

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/mangalhammad55/SkyGeni_Project.git
cd SkyGeni_Project
```

---

### 📦 2. Install Dependencies

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd ../frontend
npm install
```

---

### ▶️ 3. Run the Application

#### Step 1: Start Backend Server

```bash
cd backend
npm start
```

This starts an Express server at: `http://localhost:5000`

#### Step 2: Start Frontend React App

```bash
cd ../frontend
npm start
```

This starts the React app at: `http://localhost:3000`

---

## 🔗 API Endpoints

- `GET /api/customer-type`
- `GET /api/account-industry`
- `GET /api/team`
- `GET /api/acv-range`

These endpoints serve preloaded JSON data files to the frontend.

---

## 🧱 Technologies Used

- **Frontend**: React, TypeScript, D3.js, Material UI
- **Backend**: Node.js, Express, TypeScript
- **Charts**: Stacked Bar, Donut, Grouped Bar, Horizontal Bar

---

## 📸 Screenshot

![UI Screenshot](./screenshot.png)

---

## 👤 Author

**Mangal Hammad**  
[GitHub Profile](https://github.com/mangalhammad55)

---

## 📝 License

This project is licensed under the MIT License.
