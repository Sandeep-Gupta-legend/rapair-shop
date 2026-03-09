# Samarth Mobile - Frontend

React frontend application for Samarth Mobile repair shop website.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, update to your deployed backend URL:
```env
VITE_API_URL=https://your-backend-url.com/api
```

### Development Server

```bash
npm run dev
```

Application will run on `http://localhost:5173`

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
client/
├── public/               # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── admin/      # Admin-specific components
│   │   ├── Footer.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── Navbar.jsx
│   │   └── WhatsAppButton.jsx
│   ├── pages/          # Page components
│   │   ├── admin/      # Admin pages
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── ManageMessages.jsx
│   │   │   ├── ManageProducts.jsx
│   │   │   ├── ManageReviews.jsx
│   │   │   └── ManageServices.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Reviews.jsx
│   │   └── Services.jsx
│   ├── services/       # API service layer
│   │   ├── api.js
│   │   └── apiService.js
│   ├── App.jsx         # Main app component with routes
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Styling

This project uses **Tailwind CSS** for styling.

### Custom Classes

Defined in `src/index.css`:

```css
.btn              # Base button style
.btn-primary      # Primary button
.btn-secondary    # Secondary button
.card             # Card container
.container-custom # Container with max-width
.skeleton         # Loading skeleton animation
.fade-in          # Fade-in animation
```

### Tailwind Configuration

Custom colors defined in `tailwind.config.js`:
- primary: `#2563eb` (blue-600)
- secondary: `#1e40af` (blue-800)
- accent: `#3b82f6` (blue-500)

## 🧩 Components

### Public Components

#### Navbar
- Responsive navigation bar
- Active route highlighting
- Mobile menu
- Call-to-action button

#### Footer
- Company information
- Quick links
- Contact details
- Social media links

#### WhatsAppButton
- Floating WhatsApp button
- Pre-filled message
- Bouncing animation

#### LoadingSkeleton
- Loading placeholders
- Card and table variants
- Smooth animations

### Admin Components

#### AdminLayout
- Sidebar navigation
- Header with logout
- Responsive mobile menu
- Protected route wrapper

#### PrivateRoute
- Authentication check
- Redirect to login if not authenticated

## 📄 Pages

### Public Pages

#### Home (`/`)
- Hero section with business info
- About section
- Featured services
- Customer reviews
- Google Maps embed
- Call-to-action buttons

#### Services (`/services`)
- Grid of all services
- Service images and descriptions
- Inquiry buttons

#### Products (`/products`)
- Product catalog
- Prices and descriptions
- WhatsApp order integration

#### Reviews (`/reviews`)
- Customer testimonials
- Star ratings
- Average rating display

#### Contact (`/contact`)
- Contact form
- Business information
- Google Maps
- Business hours

### Admin Pages

#### Admin Login (`/admin/login`)
- Email/password authentication
- JWT token storage
- Redirect after login

#### Dashboard (`/admin`)
- Statistics cards
- Quick insights
- Recent activity

#### Manage Services (`/admin/services`)
- Services table
- Add/Edit/Delete operations
- Image upload

#### Manage Products (`/admin/products`)
- Products table
- CRUD operations
- Price management

#### Manage Reviews (`/admin/reviews`)
- Reviews grid
- Add/Delete operations
- Rating display

#### Manage Messages (`/admin/messages`)
- Contact form submissions
- Read/Unread status
- View and delete messages

## 🔌 API Integration

All API calls are centralized in `src/services/apiService.js`:

```javascript
import { serviceAPI, productAPI, reviewAPI, contactAPI, adminAPI } from './services/apiService';

// Example: Fetch all services
const response = await serviceAPI.getAll();
const services = response.data.data;
```

### Available API Methods

#### Service API
- `getAll()` - Get all services
- `getOne(id)` - Get single service
- `create(formData)` - Create service
- `update(id, formData)` - Update service
- `delete(id)` - Delete service

#### Product API
- `getAll()` - Get all products
- `getOne(id)` - Get single product
- `create(formData)` - Create product
- `update(id, formData)` - Update product
- `delete(id)` - Delete product

#### Review API
- `getAll()` - Get all reviews
- `getOne(id)` - Get single review
- `create(data)` - Create review
- `update(id, data)` - Update review
- `delete(id)` - Delete review

#### Contact API
- `submit(data)` - Submit contact form
- `getMessages()` - Get all messages (admin)
- `getMessage(id)` - Get single message (admin)
- `deleteMessage(id)` - Delete message (admin)

#### Admin API
- `login(credentials)` - Admin login
- `register(data)` - Register admin
- `getProfile()` - Get admin profile
- `getStats()` - Get dashboard stats

## 🔐 Authentication

JWT token is stored in `localStorage` and automatically attached to API requests via Axios interceptor.

### Token Management

```javascript
// Save token (on login)
localStorage.setItem('adminToken', token);

// Get token
const token = localStorage.getItem('adminToken');

// Remove token (on logout)
localStorage.removeItem('adminToken');
```

### Automatic Token Attachment

Configured in `src/services/api.js`:
```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 📱 Responsive Design

The application is fully responsive:
- Mobile First approach
- Tailwind breakpoints:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

## 🎭 Notifications

Using **React Toastify** for notifications:

```javascript
import { toast } from 'react-toastify';

toast.success('Operation successful!');
toast.error('Operation failed!');
toast.info('Information message');
toast.warning('Warning message');
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on Vercel
3. Configure:
   - Framework Preset: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   - Name: `VITE_API_URL`
   - Value: Your backend URL
5. Deploy

### Netlify

1. Push code to GitHub
2. New site from Git
3. Configure:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`
4. Add environment variable
5. Deploy

## 📦 Dependencies

### Production
- react - UI library
- react-dom - React DOM rendering
- react-router-dom - Routing
- axios - HTTP client
- react-icons - Icons
- react-toastify - Notifications

### Development
- vite - Build tool
- tailwindcss - CSS framework
- autoprefixer - CSS processor
- postcss - CSS transformer

## 🧪 Development Tips

### Hot Module Replacement
Vite provides instant HMR. Changes reflect immediately without full reload.

### Proxy Configuration
API requests are proxied in development:
```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
}
```

### Environment Variables
Vite exposes env variables prefixed with `VITE_`:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🐛 Common Issues

### CORS Errors
- Ensure backend CORS is configured
- Check `.env` VITE_API_URL is correct

### Build Errors
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`

### Authentication Issues
- Check if token exists in localStorage
- Verify token is not expired
- Clear localStorage and login again

## 📞 Support

For issues or questions:
- Email: info@samarthmobile.com
- Phone: +91 98679 63398

---

**Built with ⚛️ React + ⚡ Vite**
