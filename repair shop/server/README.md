# Samarth Mobile - Backend API

Backend server for Samarth Mobile repair shop website built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

Server will be running on `http://localhost:5000`

## 📁 Project Structure

```
server/
├── config/
│   ├── db.js              # MongoDB connection
│   └── cloudinary.js      # Cloudinary configuration
├── controllers/
│   ├── adminController.js
│   ├── contactController.js
│   ├── productController.js
│   ├── reviewController.js
│   └── serviceController.js
├── middleware/
│   ├── authMiddleware.js  # JWT authentication
│   └── upload.js          # Multer file upload
├── models/
│   ├── Admin.js
│   ├── ContactMessage.js
│   ├── Product.js
│   ├── Review.js
│   └── Service.js
├── routes/
│   ├── adminRoutes.js
│   ├── contactRoutes.js
│   ├── productRoutes.js
│   ├── reviewRoutes.js
│   └── serviceRoutes.js
├── utils/
│   ├── cloudinaryHelper.js
│   └── generateToken.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## 🗄️ Database Models

### Admin
- email (unique, required)
- password (hashed, required)
- createdAt

### Service
- title (required)
- description (required)
- image (Cloudinary URL, required)
- createdAt

### Product
- name (required)
- price (required)
- description (required)
- image (Cloudinary URL, required)
- createdAt

### Review
- name (required)
- message (required)
- rating (1-5, required)
- createdAt

### ContactMessage
- name (required)
- email (required)
- phone (required)
- message (required)
- read (boolean)
- createdAt

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📡 API Endpoints

### Public Endpoints

#### Health Check
```http
GET /api/health
```

#### Services
```http
GET /api/services          # Get all services
GET /api/services/:id      # Get single service
```

#### Products
```http
GET /api/products          # Get all products
GET /api/products/:id      # Get single product
```

#### Reviews
```http
GET /api/reviews           # Get all reviews
GET /api/reviews/:id       # Get single review
```

#### Contact
```http
POST /api/contact          # Submit contact form
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "message": "I need to repair my phone screen"
}
```

### Admin Endpoints

#### Authentication
```http
POST /api/admin/login      # Admin login
```

**Body:**
```json
{
  "email": "admin@samarthmobile.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "...",
    "email": "admin@samarthmobile.com",
    "token": "jwt_token_here"
  }
}
```

#### Register Admin (Disable in production)
```http
POST /api/admin/register
```

#### Get Profile
```http
GET /api/admin/profile     # Requires authentication
```

#### Get Dashboard Stats
```http
GET /api/admin/stats       # Requires authentication
```

### Protected CRUD Endpoints (Require Authentication)

#### Services
```http
POST /api/services         # Create service (multipart/form-data)
PUT /api/services/:id      # Update service (multipart/form-data)
DELETE /api/services/:id   # Delete service
```

**Body (FormData):**
- title (string)
- description (string)
- image (file) - optional for update

#### Products
```http
POST /api/products         # Create product (multipart/form-data)
PUT /api/products/:id      # Update product (multipart/form-data)
DELETE /api/products/:id   # Delete product
```

**Body (FormData):**
- name (string)
- price (number)
- description (string)
- image (file) - optional for update

#### Reviews
```http
POST /api/reviews          # Create review
PUT /api/reviews/:id       # Update review
DELETE /api/reviews/:id    # Delete review
```

**Body (JSON):**
```json
{
  "name": "Customer Name",
  "message": "Great service!",
  "rating": 5
}
```

#### Messages
```http
GET /api/contact/messages          # Get all messages
GET /api/contact/messages/:id      # Get single message (marks as read)
DELETE /api/contact/messages/:id   # Delete message
```

## 📦 Dependencies

### Production
- express - Web framework
- mongoose - MongoDB ODM
- dotenv - Environment variables
- cors - CORS middleware
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- multer - File upload handling
- cloudinary - Image storage
- express-validator - Input validation

### Development
- nodemon - Auto-restart server

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env` file
2. **JWT Secret**: Use a strong, random secret key
3. **Password Hashing**: Passwords are hashed using bcrypt
4. **Input Validation**: All inputs are validated
5. **CORS**: Configure CORS for specific origins in production
6. **Admin Registration**: Disable `/api/admin/register` route after creating the first admin

## 🌐 Deployment

### Prepare for Production

1. Set NODE_ENV to production
2. Update CORS origins
3. Disable admin registration route
4. Use strong JWT secret
5. Whitelist IPs in MongoDB Atlas

### Deploy to Render

1. Create new Web Service
2. Connect GitHub repository
3. Set root directory to `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables
7. Deploy

### Deploy to Railway

1. Create new project
2. Connect repository
3. Add environment variables
4. Deploy automatically

## 📝 Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
```

## 🐛 Error Handling

The API returns errors in the following format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## 📞 Support

For issues or questions:
- Email: info@samarthmobile.com
- Phone: +91 98679 63398

---

**Made with ❤️ for Samarth Mobile**
