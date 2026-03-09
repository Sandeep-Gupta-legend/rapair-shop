import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Service from './models/Service.js';
import Product from './models/Product.js';
import Review from './models/Review.js';

dotenv.config();

const services = [
  {
    title: 'Mobile Repair',
    description: 'Complete diagnosis and repair for Android and iPhone devices. We handle speaker, mic, charging, and motherboard level issues with fast turnaround.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Display Replacement',
    description: 'Broken or flickering screen replacement using quality display assemblies with touch calibration and post-repair testing.',
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Battery Replacement',
    description: 'Battery health check and replacement for phones with fast drain, overheating, or sudden shutdown issues.',
    image: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Laptop Repair',
    description: 'Laptop hardware and software repair including SSD/RAM upgrades, keyboard issues, thermal servicing, and OS troubleshooting.',
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Software Installation',
    description: 'OS installation, updates, backup support, app setup, and performance optimization for mobile and laptop devices.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Mobile Accessories',
    description: 'Original and compatible accessories including chargers, cables, guards, back covers, and wireless audio products.',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80'
  }
];

const products = [
  {
    name: 'Smart Watch',
    price: 2499,
    description: 'Bluetooth calling smartwatch with heart-rate tracking, sports modes, and long battery life.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Pendrive 64GB USB 3.0',
    price: 699,
    description: 'High-speed USB 3.0 pendrive for quick file transfer, compatible with laptops, desktops, and TVs.',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Fast Charger 25W',
    price: 899,
    description: '25W Type-C fast charger with over-voltage and short-circuit protection for safe daily charging.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Wireless Earphones',
    price: 1299,
    description: 'True wireless stereo earbuds with low latency, clear call quality, and charging case.',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Premium Mobile Accessories Kit',
    price: 599,
    description: 'Combo kit with cable protector, cleaning tools, and adapter organizer for everyday use.',
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=900&q=80'
  }
];

const reviews = [
  {
    name: 'Rohit Sharma',
    rating: 5,
    message: 'Excellent service. My phone display was replaced quickly and the quality is very good.'
  },
  {
    name: 'Pooja Verma',
    rating: 5,
    message: 'Very cooperative staff and reasonable prices. Battery issue solved in one visit.'
  },
  {
    name: 'Imran Khan',
    rating: 4,
    message: 'Good experience overall. Laptop servicing was done properly and on time.'
  },
  {
    name: 'Sneha Patil',
    rating: 5,
    message: 'Trusted repair shop near Mira Road station. They explained the issue clearly before repair.'
  },
  {
    name: 'Amit Jadhav',
    rating: 4,
    message: 'Bought accessories and charger from here. Fair pricing and genuine quality.'
  },
  {
    name: 'Neha Kulkarni',
    rating: 5,
    message: 'Fast turnaround and polite behavior. My phone charging issue is fully fixed.'
  }
];

const seedData = async () => {
  try {
    await connectDB();

    await Promise.all([
      Service.deleteMany(),
      Product.deleteMany(),
      Review.deleteMany()
    ]);

    await Promise.all([
      Service.insertMany(services),
      Product.insertMany(products),
      Review.insertMany(reviews)
    ]);

    console.log('Seed data inserted successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeder failed:', error.message);
    process.exit(1);
  }
};

seedData();
