# Quick Setup Guide

Follow these steps to set up the Samarth Mobile project locally:

## Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account

## Setup Instructions

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (backend + frontend)
npm run install-all
```

### 2. Configure Backend
```bash
# Navigate to server directory
cd server

# Copy environment example
copy .env.example .env

# Edit .env file with your credentials:
# - MongoDB Atlas URI
# - JWT Secret (generate random string)
# - Cloudinary credentials
```

### 3. Configure Frontend
```bash
# Navigate to client directory
cd client

# Copy environment example
copy .env.example .env

# Edit .env file:
# VITE_API_URL=http://localhost:5000/api
```

### 4. Create Admin Account

Start the backend server first:
```bash
cd server
npm run dev
```

Then use a tool like Postman to create admin:
```
POST http://localhost:5000/api/admin/register
Content-Type: application/json

{
  "email": "admin@samarthmobile.com",
  "password": "your_secure_password"
}
```

### 5. Run Development Servers

Option 1 - Run both servers at once (from root):
```bash
npm run dev
```

Option 2 - Run separately:

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

### 6. Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Admin Panel**: http://localhost:5173/admin

### Default Admin Credentials
After creating admin account, use:
- Email: admin@samarthmobile.com
- Password: (password you set during registration)

## Troubleshooting

**Backend won't start?**
- Check MongoDB connection string
- Verify all environment variables are set
- Check port 5000 is not in use

**Frontend won't start?**
- Check VITE_API_URL is correct
- Verify backend is running
- Check port 5173 is not in use

**Can't login to admin?**
- Verify admin account was created
- Check browser console for errors
- Verify backend is running

## Next Steps

1. Add sample services, products, and reviews through admin panel
2. Test contact form
3. Customize content and images
4. Deploy to production (see DEPLOYMENT.md)

## Need Help?

- Read the main README.md
- Check DEPLOYMENT.md for production setup
- Review individual README files in server/ and client/

---

**Ready to go! 🚀**
