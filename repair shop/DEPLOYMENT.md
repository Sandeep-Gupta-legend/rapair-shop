# 🚀 Deployment Guide - Samarth Mobile

Complete guide to deploy the Samarth Mobile MERN stack application to production.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account
- ✅ MongoDB Atlas account
- ✅ Cloudinary account
- ✅ Vercel account (for frontend)
- ✅ Render or Railway account (for backend)

## 🗂️ Deployment Overview

```
┌─────────────────────┐
│   Frontend (Vercel) │
│  React + Vite App   │
└──────────┬──────────┘
           │ API Calls
           ▼
┌─────────────────────┐
│ Backend (Render)    │
│ Node.js + Express   │
└──────────┬──────────┘
           │
           ├──────────────┐
           │              │
           ▼              ▼
    ┌──────────┐   ┌──────────┐
    │ MongoDB  │   │Cloudinary│
    │  Atlas   │   │  (CDN)   │
    └──────────┘   └──────────┘
```

## 📝 Step-by-Step Deployment

### Step 1: Setup MongoDB Atlas

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE shared cluster
   - Select region (closest to your users)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to Database Access
   - Click "Add New Database User"
   - Choose password authentication
   - Username: `samarthmobile_admin`
   - Generate strong password
   - User Privileges: Read and write to any database
   - Click "Add User"

4. **Configure Network Access**
   - Go to Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to Database
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `samarthmobile`

   Example:
   ```
   mongodb+srv://samarthmobile_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/samarthmobile?retryWrites=true&w=majority
   ```

### Step 2: Setup Cloudinary

1. **Create Account**
   - Go to [Cloudinary](https://cloudinary.com/)
   - Sign up for free account

2. **Get Credentials**
   - Go to Dashboard
   - Note down:
     - Cloud Name
     - API Key
     - API Secret

3. **Create Upload Preset (Optional)**
   - Go to Settings → Upload
   - Enable unsigned uploading
   - Create preset: `samarth-mobile`

### Step 3: Prepare Code for Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/samarth-mobile.git
   git push -u origin main
   ```

2. **Verify .gitignore**
   Ensure these files are ignored:
   ```
   node_modules/
   .env
   dist/
   build/
   ```

### Step 4: Deploy Backend to Render

1. **Create Account**
   - Go to [Render](https://render.com/)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Configure:
     ```
     Name: samarth-mobile-backend
     Region: Choose closest to India (Singapore recommended)
     Branch: main
     Root Directory: server
     Runtime: Node
     Build Command: npm install
     Start Command: npm start
     ```

3. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   Add these variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGO_URI=<your_mongodb_atlas_connection_string>
   JWT_SECRET=<generate_random_32_character_string>
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   ```

   **Generate JWT Secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://samarth-mobile-backend.onrender.com`

5. **Verify Backend**
   - Visit: `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

### Step 5: Create Admin Account

Using Postman, Thunder Client, or curl:

```bash
POST https://your-backend-url.onrender.com/api/admin/register
Content-Type: application/json

{
  "email": "admin@samarthmobile.com",
  "password": "YourSecurePassword123!"
}
```

**⚠️ IMPORTANT:** After creating admin account, comment out or remove the register route in `server/routes/adminRoutes.js` for security:

```javascript
// router.post('/register', registerAdmin); // Disabled for production
```

Commit and push the change to redeploy.

### Step 6: Deploy Frontend to Vercel

1. **Create Account**
   - Go to [Vercel](https://vercel.com/)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..."
   - Select "Project"
   - Import your GitHub repository

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variable**
   - Go to Project Settings
   - Click "Environment Variables"
   - Add:
     ```
     Name: VITE_API_URL
     Value: https://your-backend-url.onrender.com/api
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-5 minutes)
   - Your site will be live at: `https://samarth-mobile.vercel.app`

### Step 7: Configure Custom Domain (Optional)

#### Vercel Custom Domain

1. Go to Project Settings → Domains
2. Add your domain: `samarthmobile.com`
3. Follow DNS configuration instructions
4. Add DNS records in your domain provider:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

#### Update Backend CORS

In `server/server.js`, update CORS configuration:

```javascript
app.use(cors({
  origin: [
    'https://samarthmobile.com',
    'https://www.samarthmobile.com',
    'https://samarth-mobile.vercel.app'
  ],
  credentials: true
}));
```

## ✅ Post-Deployment Checklist

### Backend Verification
- [ ] Health check endpoint working
- [ ] Admin login working
- [ ] Database connection successful
- [ ] Cloudinary uploads working
- [ ] All API endpoints responding
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Admin register route disabled

### Frontend Verification
- [ ] Website loading correctly
- [ ] All pages accessible
- [ ] Images loading from Cloudinary
- [ ] Forms submitting successfully
- [ ] Admin login works
- [ ] Admin dashboard accessible
- [ ] CRUD operations working
- [ ] Mobile responsive
- [ ] WhatsApp button working
- [ ] Google Maps embedded

## 🔧 Common Deployment Issues

### Issue 1: "Cannot GET /api/..."
**Solution:** Check if backend URL in frontend .env is correct and doesn't have trailing slash

### Issue 2: CORS Error
**Solution:** 
1. Add your frontend URL to backend CORS configuration
2. Redeploy backend

### Issue 3: Images Not Uploading
**Solution:**
1. Verify Cloudinary credentials in backend .env
2. Check Cloudinary dashboard for upload errors
3. Ensure image size is under 5MB

### Issue 4: MongoDB Connection Failed
**Solution:**
1. Verify connection string is correct
2. Check if IP whitelist includes 0.0.0.0/0
3. Verify database user has correct permissions

### Issue 5: Render Service Sleeping
**Solution:**
- Render free tier sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- Consider upgrading to paid plan or using a service like [Uptime Robot](https://uptimerobot.com/) to ping your API every 10 minutes

### Issue 6: Environment Variables Not Working
**Solution:**
1. Ensure variables are prefixed with `VITE_` for frontend
2. Restart/redeploy after adding variables
3. Check for typos in variable names

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong, random secrets
   - Rotate JWT secret periodically

2. **Database**
   - Use strong database passwords
   - Enable MongoDB encryption
   - Regular backups

3. **Admin Access**
   - Disable admin registration in production
   - Use strong admin passwords
   - Enable 2FA if possible

4. **API Security**
   - Configure CORS properly
   - Rate limiting (consider implementing)
   - Input validation
   - XSS protection

5. **Cloudinary**
   - Set upload restrictions
   - Enable moderation
   - Configure size limits

## 📊 Monitoring

### Render Dashboard
- Monitor service health
- View logs
- Check resource usage
- Set up alerts

### Vercel Analytics
- Page views
- Performance metrics
- Error tracking

### MongoDB Atlas
- Database metrics
- Query performance
- Connection monitoring

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployments:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Automatic Deployment**
   - Vercel automatically deploys frontend
   - Render automatically deploys backend
   - Monitor deployment in dashboards

## 💰 Cost Breakdown

### Free Tier Limits
- **Vercel**: Unlimited personal projects
- **Render**: 750 hours/month (sleeps after 15 min)
- **MongoDB Atlas**: 512 MB storage
- **Cloudinary**: 25 GB storage, 25 GB bandwidth

### Recommended Upgrades
For production traffic:
- **Render**: $7/month (no sleep, more resources)
- **MongoDB Atlas**: $9/month (2GB+ storage)
- **Cloudinary**: $0+ pay-as-you-go

## 🆘 Support & Troubleshooting

### Get Help
- **Render**: [Render Community](https://community.render.com/)
- **Vercel**: [Vercel Discord](https://vercel.com/discord)
- **MongoDB**: [MongoDB Forum](https://www.mongodb.com/community/forums/)

### Logs
- **Backend logs**: Render Dashboard → Logs
- **Frontend logs**: Browser console
- **Database logs**: MongoDB Atlas → Logs

## 📚 Additional Resources

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Cloudinary Docs](https://cloudinary.com/documentation)

---

**🎉 Congratulations! Your Samarth Mobile website is now live!**

Website: `https://your-domain.vercel.app`  
Admin Panel: `https://your-domain.vercel.app/admin`

For any issues, refer to the troubleshooting section or check the service dashboards.
