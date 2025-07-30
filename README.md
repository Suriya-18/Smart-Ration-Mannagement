# Smart Ration Management System

A full-stack web application designed to automate and digitize the public distribution process using Aadhar-based authentication and real-time tracking. This system enables fair and transparent ration allocation by integrating user verification, digital records, and automated stock updates.

## 🚀 Features

### For Citizens
- **User Registration & Authentication**: Secure signup and login with ration number
- **Digital Menu Browsing**: View available ration items with real-time stock information
- **Shopping Cart Management**: Add items to cart and manage quantities
- **Order Booking**: Place orders for ration items with automatic stock deduction
- **Order History**: Track all past orders and their status
- **Profile Management**: Update personal information and family details

### For Vendors
- **Stock Management**: Add, update, and monitor ration item inventory
- **Order Processing**: View and confirm incoming orders from citizens
- **Real-time Updates**: Automatic stock updates when orders are processed
- **Sales Analytics**: Track sales and inventory levels

### System Features
- **Aadhar-based Authentication**: Secure user verification system
- **Real-time Stock Tracking**: Live inventory updates across the system
- **Fair Distribution**: Automated allocation based on family size and eligibility
- **Digital Records**: Complete audit trail of all transactions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

### Frontend
- **React 19.0.0** - Modern UI framework
- **React Router DOM 7.3.0** - Client-side routing
- **Bootstrap 5.3.3** - Responsive CSS framework
- **Vite 6.2.0** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 4.21.2** - Web application framework
- **SQLite3 5.1.7** - Lightweight database
- **bcrypt 5.1.1** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing

### Database
- **SQLite** - File-based database for data persistence

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)



## 🏃‍♂️ Running the Application

### 1. Start the Backend Server
```bash
cd backend
node server.js
```
The backend server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server
```bash
npm run dev
```
The frontend application will start on `http://localhost:5173`

### 3. Access the Application
Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
SMART_RATION/
├── backend/                          # Backend server files
│   ├── server.js                     # Main server file
│   ├── package.json                  # Backend dependencies
│   ├── ration.db                     # SQLite database
│   └── userLogin.http               # API testing file
├── src/                             # Frontend source code
│   ├── Components/                  # React components
│   │   ├── BOOKINGANDVENDORSTUFF/   # Booking and vendor components
│   │   ├── FRONTLOGINSIGNUP/        # Authentication components
│   │   ├── HOMEPAGE/                # Homepage components
│   │   ├── ORDERSANDSTUFF/          # Order management components
│   │   └── RATIONITEMS/             # Product and cart components
│   ├── App.jsx                      # Main application component
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles
├── public/                          # Static assets
├── package.json                     # Frontend dependencies
├── vite.config.js                   # Vite configuration
└── README.md                        # Project documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User authentication

### User Management
- `GET /users` - Get all users
- `GET /users/:id` - Get specific user
- `PUT /users/:id` - Update user information

### Product Management
- `GET /products` - Get all products
- `POST /products` - Add new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Order Management
- `GET /orders` - Get all orders
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order status

## 👥 User Types

### Citizens
- Can browse available ration items
- Place orders and track order history
- Manage personal profile and family details

### Vendors
- Manage inventory and stock levels
- Process and confirm orders
- View sales analytics

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **Input Validation**: Server-side validation for all user inputs
- **Protected Routes**: Authentication required for sensitive operations
- **CORS Protection**: Cross-origin request protection

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Bootstrap Styling**: Modern and clean interface
- **Intuitive Navigation**: Easy-to-use navigation system
- **Real-time Updates**: Live stock and order updates

