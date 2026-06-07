import bcrypt from 'bcryptjs';
import { connectDatabase } from '../config/database.js';
import { ROLES } from '../constants/roles.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import { createSlug } from '../utils/slug.js';

const sampleProducts = [
  {
    name: 'Premium Cotton Panjabi',
    description: 'Comfortable cotton panjabi suitable for Eid, Jummah, and everyday wear.',
    category: 'Fashion',
    brand: 'Dhaka Wear',
    price: 1850,
    stock: 50,
    images: ['https://example.com/images/panjabi.jpg'],
    variants: [
      { size: 'M', color: 'White', stock: 15 },
      { size: 'L', color: 'Navy', stock: 20 },
      { size: 'XL', color: 'Black', stock: 15 }
    ],
    isActive: true
  },
  {
    name: 'Wireless Bluetooth Earbuds',
    description: 'Compact earbuds with clear sound and long battery backup.',
    category: 'Electronics',
    brand: 'TechBangla',
    price: 2450,
    stock: 80,
    images: ['https://example.com/images/earbuds.jpg'],
    variants: [
      { color: 'Black', stock: 40 },
      { color: 'White', stock: 40 }
    ],
    isActive: true
  },
  {
    name: 'Non Stick Cooking Set',
    description: 'Durable non-stick cookware set for modern Bangladeshi kitchens.',
    category: 'Home Essentials',
    brand: 'RannaGhor',
    price: 3990,
    stock: 30,
    images: ['https://example.com/images/cookware.jpg'],
    variants: [{ color: 'Grey', stock: 30 }],
    isActive: true
  }
];

const seed = async () => {
  await connectDatabase();

  const adminEmail = 'admin@example.com';
  const passwordHash = await bcrypt.hash('Admin@12345', 12);

  await User.findOneAndUpdate(
    { email: adminEmail },
    {
      name: 'Store Admin',
      email: adminEmail,
      password: passwordHash,
      passwordHash,
      role: ROLES.ADMIN,
      phone: '+8801700000000'
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  for (const product of sampleProducts) {
    await Product.findOneAndUpdate(
      { slug: createSlug(product.name) },
      { ...product, slug: createSlug(product.name) },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  console.log('Seed completed');
  process.exit(0);
};

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
