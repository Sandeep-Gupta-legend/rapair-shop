# Samarth Mobile - समर्थ मोबाईल

A production-ready MERN stack website for Samarth Mobile repair shop in Mira Road, Mumbai.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

### Public Website
- **Home Page**: Hero section, shop introduction, services overview, customer reviews
- **Services Page**: Complete list of repair services with images
- **Products Page**: Mobile accessories catalog with prices
- **Reviews Page**: Customer testimonials and ratings
- **Contact Page**: Contact form, business info, Google Maps integration
- **WhatsApp Integration**: Floating WhatsApp button for instant contact
- **Responsive Design**: Mobile-first, fully responsive across all devices

### Admin Dashboard
- **Secure Authentication**: JWT-based admin authentication
- **Dashboard Overview**: Real-time statistics and quick insights
- **Service Management**: CRUD operations for services with image upload
- **Product Management**: CRUD operations for products with pricing
- **Review Management**: Add and manage customer reviews
- **Message Management**: View and manage contact form submissions

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (MongoDB Atlas)
- **JWT** - Authentication
- **Cloudinary** - Image storage and CDN
- **Multer** - File upload handling
- **Bcrypt.js** - Password hashing

## 📁 Project Structure

```
repair shop/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   │   └── admin/     # Admin dashboard pages
│   │   ├── services/      # API service layer
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── server/                # Backend Node.js application
    ├── config/            # Configuration files
    ├── controllers/       # Request handlers
    ├── middleware/        # Custom middleware
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    ├── utils/             # Utility functions
    ├── server.js          # Entry point
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "repair shop"
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Create Admin Account

Use a tool like Postman or Thunder Client to create an admin account:

**POST** `http://localhost:5000/api/admin/register`

**Body (JSON)**:
```json
{
  "email": "admin@samarthmobile.com",
  "password": "your_secure_password"
}
```

⚠️ **Important**: After creating the first admin, disable the register route in production for security.

### 4. Frontend Setup

Open a new terminal:
```bash
cd client
npm install
```

Create `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

The application will run on `http://localhost:5173`

## 📝 API Documentation

### Public Endpoints

#### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

#### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get single review

#### Contact
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Protected)

#### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Register admin (disable in production)
- `GET /api/admin/profile` - Get admin profile
- `GET /api/admin/stats` - Get dashboard statistics

#### Services (Admin)
- `POST /api/services` - Create service (with image upload)
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

#### Products (Admin)
- `POST /api/products` - Create product (with image upload)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

#### Reviews (Admin)
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

#### Messages (Admin)
- `GET /api/contact/messages` - Get all messages
- `GET /api/contact/messages/:id` - Get single message (marks as read)
- `DELETE /api/contact/messages/:id` - Delete message

### Authentication

Protected routes require JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 🌐 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import project on Vercel
3. Configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `client`
4. Add environment variable:
   - `VITE_API_URL`: Your backend URL
5. Deploy

### Backend (Render/Railway)

#### Option 1: Render
1. Create new Web Service
2. Connect your GitHub repository
3. Configure:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables (from .env)
5. Deploy

#### Option 2: Railway
1. Create new project
2. Connect GitHub repository
3. Add environment variables
4. Deploy automatically

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Add database user
3. Whitelist IP addresses (or use 0.0.0.0/0 for all)
4. Get connection string
5. Update `MONGO_URI` in environment variables

### Image Storage (Cloudinary)

1. Sign up for Cloudinary account
2. Get your credentials from dashboard
3. Update environment variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Input validation
- CORS enabled
- Environment variables for sensitive data
- Cloudinary secure image upload

## 📱 Business Information

**Shop Name**: Samarth Mobile (समर्थ मोबाईल)  
**Rating**: 4.6 ⭐ (189 Reviews)  
**Phone**: +91 98679 63398  
**Address**: Shop no B 54, Shanti Shopping Centre, B Wing, Opposite Mira Road Station, Mira Road East, Mumbai, Maharashtra 401107  
**Category**: Mobile phone repair shop

## 🤝 Contributing

This is a production website for Samarth Mobile. For any improvements or bug fixes, please contact the administrator.

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

For any queries or support:
- **Phone**: +91 98679 63398
- **Email**: info@samarthmobile.com
- **WhatsApp**: [Click Here](https://wa.me/919867963398)

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Cloudinary for image storage
- Vercel for frontend hosting
- Render/Railway for backend hosting

---

**Built with ❤️ for Samarth Mobile**
