export interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  category: string;
  specs: string[];
  variants?: {
    name: string;
    options: string[];
  }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'hospital-bed-1',
    name: 'Tula Premium Adjustable Hospital Bed',
    brand: 'Tula Medical',
    sku: 'TB-100-PREM',
    price: 2499.95,
    originalPrice: 2999.95,
    rating: 4.8,
    reviewCount: 124,
    images: [
      'https://image.made-in-china.com/202f0j00iHBbkQsgCDoe/Low-Price-Premium-Quality-Three-Function-Medical-Furniture-Height-Adjustable-Hospital-Electric-Beds-for-Sale.webp',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516549655669-df6654e435de?w=800&h=800&fit=crop',
    ],
    description: 'The Tula Premium Adjustable Hospital Bed provides ultimate comfort and support for patients at home. Featuring multiple adjustment points and a high-quality mattress.',
    category: 'Hospital Beds',
    specs: [
      'Full electric adjustment',
      'Weight capacity: 450 lbs',
      'Adjustable height: 15" to 30"',
      'Trendelenburg and reverse Trendelenburg positions'
    ],
    variants: [
      { name: 'Mattress Type', options: ['Standard Foam', 'Memory Foam', 'Air Alternating'] },
      { name: 'Side Rails', options: ['Half Length', 'Full Length'] }
    ]
  },
  {
    id: 'hospital-bed-2',
    name: 'MediCare Pro Full Electric Hospital Bed',
    brand: 'Drive Medical',
    sku: 'MC-PRO-ELEC',
    price: 1899.99,
    originalPrice: 2299.99,
    rating: 4.7,
    reviewCount: 89,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1LLjAZkGKnH9hG2Q3B9FBo8ZiHiEiKXTI5g&s',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516549655669-df6654e435de?w=800&h=800&fit=crop',
    ],
    description: 'Professional-grade electric hospital bed with smooth motorized adjustments for head, foot, and height. Ideal for home care and clinical settings.',
    category: 'Hospital Beds',
    specs: [
      '3-motor electric system',
      'Weight capacity: 500 lbs',
      'Wireless remote control',
      'Adjustable height: 14" to 32"'
    ],
    variants: [
      { name: 'Frame Color', options: ['Silver', 'White', 'Black'] },
      { name: 'Mattress Size', options: ['Twin XL', 'Full'] }
    ]
  },
  {
    id: 'hospital-bed-3',
    name: 'ComfortCare Semi-Electric Bed',
    brand: 'Invacare',
    sku: 'CC-SEMI-200',
    price: 1599.50,
    originalPrice: 1999.50,
    rating: 4.6,
    reviewCount: 156,
    images: [
      'https://andersonwheelchair.com/wp-content/uploads/2020/07/medline-semi-electric-.jpg2_.jpg',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516549655669-df6654e435de?w=800&h=800&fit=crop',
    ],
    description: 'Semi-electric hospital bed with electric head/foot adjustment and manual height control. Perfect balance of functionality and affordability.',
    category: 'Hospital Beds',
    specs: [
      'Electric head/foot adjustment',
      'Manual height adjustment',
      'Weight capacity: 400 lbs',
      '4-wheel locking casters'
    ],
    variants: [
      { name: 'Side Rails', options: ['None', 'Half Rails', 'Full Rails'] },
      { name: 'IV Pole', options: ['Included', 'Not Included'] }
    ]
  },
  {
    id: 'hospital-bed-4',
    name: 'Heritage Classic Manual Hospital Bed',
    brand: 'Heritage',
    sku: 'HC-MAN-300',
    price: 899.99,
    rating: 4.4,
    reviewCount: 203,
    images: [
      'https://medicalproductbd.com/wp-content/uploads/2024/12/manual-hospital-bed-price-in-bangladesh.png',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516549655669-df6654e435de?w=800&h=800&fit=crop',
    ],
    description: 'Traditional manual crank hospital bed with durable steel construction. Reliable and easy to operate for long-term care.',
    category: 'Hospital Beds',
    specs: [
      'Manual crank operation',
      'Heavy-duty steel frame',
      'Weight capacity: 350 lbs',
      'Trendelenburg position capable'
    ],
    variants: [
      { name: 'Finish', options: ['Chrome', 'Powder Coat'] },
      { name: 'Headboard', options: ['Standard', 'Deluxe'] }
    ]
  },
  {
    id: 'hospital-bed-5',
    name: 'UltraCare Bariatric Hospital Bed',
    brand: 'Graham Field',
    sku: 'UC-BARI-1000',
    price: 3299.99,
    originalPrice: 3799.99,
    rating: 4.9,
    reviewCount: 67,
    images: [
      'https://image.rehabmart.com/include-mt/img-resize.asp?output=webp&path=/productimages/inuse~9.jpg&quality=&newwidth=540',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516549655669-df6654e435de?w=800&h=800&fit=crop',
    ],
    description: 'Heavy-duty bariatric hospital bed designed for patients up to 1000 lbs. Features reinforced frame and extra-wide mattress.',
    category: 'Hospital Beds',
    specs: [
      'Weight capacity: 1000 lbs',
      'Extra-wide 48" frame',
      '4-motor electric system',
      'Reinforced steel construction'
    ],
    variants: [
      { name: 'Width', options: ['42"', '48"', '54"'] },
      { name: 'Motor System', options: ['3-Motor', '4-Motor'] }
    ]
  },
  {
    id: 'hospital-bed-6',
    name: 'Pediatric Care Hospital Bed',
    brand: 'Stryker',
    sku: 'ST-PED-200',
    price: 2799.95,
    rating: 4.8,
    reviewCount: 42,
    images: [
      'https://www.medik-medical.com/data/watermark/20210818/611c6a0cf2145.jpg',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516549655669-df6654e435de?w=800&h=800&fit=crop',
    ],
    description: 'Specialized pediatric hospital bed with safety features for children. Adjustable height and side rails for child safety.',
    category: 'Hospital Beds',
    specs: [
      'Child-safe side rails',
      'Adjustable height: 12" to 28"',
      'Weight capacity: 250 lbs',
      'Colorful, child-friendly design'
    ],
    variants: [
      { name: 'Theme', options: ['Animals', 'Space', 'Ocean', 'Neutral'] },
      { name: 'Age Range', options: ['2-6 years', '6-12 years'] }
    ]
  },
  {
    id: 'hospital-bed-7',
    name: 'ICU Critical Care Bed',
    brand: 'Hill-Rom',
    sku: 'HR-ICU-PRO',
    price: 8999.99,
    originalPrice: 10999.99,
    rating: 4.9,
    reviewCount: 31,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnG3FBJ86_pWUWORrPK51Vc8Gi-lY5jsEXIA&s',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516549655669-df6654e435de?w=800&h=800&fit=crop',
    ],
    description: 'Advanced ICU hospital bed with integrated monitoring systems, CPR release, and advanced positioning capabilities for critical care.',
    category: 'Hospital Beds',
    specs: [
      'Integrated patient monitoring',
      'CPR emergency release',
      'Advanced positioning memory',
      'Touchscreen control panel'
    ],
    variants: [
      { name: 'Monitoring Package', options: ['Basic', 'Advanced', 'Full ICU'] },
      { name: 'Frame Type', options: ['Standard', 'Low Height'] }
    ]
  },
  {
    id: 'hospital-bed-8',
    name: 'HomeCare Adjustable Low Bed',
    brand: 'Joerns',
    sku: 'JC-LOW-150',
    price: 2199.95,
    rating: 4.7,
    reviewCount: 118,
    images: [
      'https://image.made-in-china.com/202f0j00qwolUIjtEFkD/Home-Care-Hi-Low-Adjustable-Bed-Electric-Hospital-Bed-with-Okin-Motors.webp',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516549655669-df6654e435de?w=800&h=800&fit=crop',
    ],
    description: 'Low-height hospital bed designed for fall prevention and easy patient transfer. Ideal for home care and rehabilitation.',
    category: 'Hospital Beds',
    specs: [
      'Low height: 7" from floor',
      'Fall prevention design',
      'Weight capacity: 400 lbs',
      'Easy transfer capability'
    ],
    variants: [
      { name: 'Height Range', options: ['7"-24"', '9"-30"'] },
      { name: 'Safety Features', options: ['Basic', 'Advanced'] }
    ]
  },
  {
    id: 'wheelchair-1',
    name: 'AeroFly Ultra-Lite Wheelchair',
    brand: 'Drive Medical',
    sku: 'AF18FDABK',
    price: 649.95,
    rating: 4.5,
    reviewCount: 260,
    images: [
      'https://cdn11.bigcommerce.com/s-lj028lthvz/images/stencil/1280x1280/products/1247/10242/drive-aerofly-ultra-lite-wheelchair__53197.1756436188.jpg?c=2',
      'https://images.unsplash.com/photo-1577219498110-b6d0c3d12d8e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1584467541268-b8c6c44a6b3c?w=800&h=800&fit=crop',
    ],
    description: 'The AeroFly Ultra-Lite Wheelchair is designed for maximum portability and comfort. Its lightweight frame makes it easy to transport while providing a stable ride.',
    category: 'Wheelchairs',
    specs: [
      'Ultralight magnesium alloy frame: 13.3 lbs',
      'Attendant brakes and wheel locks',
      'Lightweight spoke wheels with treaded flat-free tires',
      '19.6" turning radius'
    ],
    variants: [
      { name: 'Color', options: ['Silver', 'Black', 'Blue'] },
      { name: 'Seat Size', options: ['18"', '20"'] }
    ]
  },
  {
    id: 'scooter-1',
    name: 'Tula Mobility Pro Scooter',
    brand: 'Tula Medical',
    sku: 'TM-PRO-4',
    price: 1299.00,
    rating: 4.7,
    reviewCount: 85,
    images: [
      'https://www.themobilityshop.ie/images/detailed/109/2.png',
      'https://images.unsplash.com/photo-1570125909236-7c6b0d8b4c6a?w=800&h=800&fit=crop',
    ],
    description: 'Experience freedom with the Tula Mobility Pro Scooter. Perfect for both indoor and outdoor use with a long-lasting battery and comfortable seating.',
    category: 'Scooters',
    specs: [
      'Top speed: 5 mph',
      'Range: up to 15 miles',
      'Weight capacity: 300 lbs',
      'Disassembles into 5 lightweight pieces'
    ],
    variants: [
      { name: 'Color', options: ['Red', 'Blue', 'White'] }
    ]
  },
  {
    id: 'lift-chair-1',
    name: 'CloudComfort Lift Recliner',
    brand: 'Golden Technologies',
    sku: 'CC-LIFT-1',
    price: 899.00,
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://www.mobilityaids.com.au/wp-content/uploads/2021/08/Configura-Comfort-in-vinyl-scaled.jpg',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=800&fit=crop',
    ],
    description: 'The CloudComfort Lift Recliner offers smooth lifting and reclining at the touch of a button. Upholstered in premium, easy-to-clean fabric.',
    category: 'Lift Chairs',
    specs: [
      '3-position lift and recline',
      'Quiet, smooth lift system',
      'Battery backup included',
      'Plush, overstuffed design'
    ],
    variants: [
      { name: 'Fabric', options: ['Suede', 'Leatherette', 'Velvet'] },
      { name: 'Color', options: ['Brown', 'Grey', 'Navy'] }
    ]
  },
  {
    id: 'mattress-1',
    name: 'Therapeutic Memory Foam Mattress',
    brand: 'Tula Medical',
    sku: 'TM-MEM-100',
    price: 799.95,
    originalPrice: 999.95,
    rating: 4.6,
    reviewCount: 189,
    images: [
      'https://www.gowfb.ca/cdn/shop/products/rest-therapy-mattress-6-inch-tranquility-bamboo-memory-foam-mattress-available-in-4-sizes-28584266170430.jpg?v=1747946691&width=800',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=800&fit=crop',
    ],
    description: 'Pressure-relieving memory foam mattress designed for hospital beds and home care. Provides optimal support and comfort for extended bed rest.',
    category: 'Mattresses',
    specs: [
      '3-inch memory foam comfort layer',
      'Waterproof and stain-resistant cover',
      'Anti-microbial treatment',
      'Available in all standard bed sizes'
    ],
    variants: [
      { name: 'Size', options: ['Twin', 'Full', 'Queen'] },
      { name: 'Thickness', options: ['6"', '8"', '10"'] }
    ]
  },
  {
    id: 'patient-lift-1',
    name: 'SafeLift Patient Transfer System',
    brand: 'Invacare',
    sku: 'SL-2000',
    price: 1899.00,
    rating: 4.8,
    reviewCount: 67,
    images: [
      'https://cdnb.medi-shop.gr/45380-large_default/body-up-bu2000-heavy-duty-patient-lift-transfer.jpg',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=800&fit=crop',
    ],
    description: 'Electric patient lift with smooth hydraulic operation for safe transfers between bed, chair, and bathroom.',
    category: 'Patient Lifts',
    specs: [
      '450 lb weight capacity',
      'Battery-powered operation',
      'Adjustable spreader bar',
      'Foldable for storage'
    ],
    variants: [
      { name: 'Sling Type', options: ['Universal', 'Bathing', 'Toileting'] },
      { name: 'Power Source', options: ['AC', 'Battery'] }
    ]
  },
  {
    id: 'ramp-1',
    name: 'Modular Aluminum Access Ramp',
    brand: 'Handi-Ramp',
    sku: 'HR-MOD-8',
    price: 449.95,
    rating: 4.4,
    reviewCount: 93,
    images: [
      'https://www.rampchamp.com.au/cdn/shop/files/Artboard1.png?v=1692927557&width=1214',
      'https://images.unsplash.com/photo-1558618666-6c8c5c5c5c5c?w=800&h=800&fit=crop',
    ],
    description: 'Modular aluminum ramp system for wheelchair access. Adjustable length and portable design.',
    category: 'Ramps',
    specs: [
      'Aluminum construction',
      'Non-slip surface',
      'Adjustable from 4 to 8 feet',
      'Portable and lightweight'
    ],
    variants: [
      { name: 'Length', options: ['4 ft', '6 ft', '8 ft'] },
      { name: 'Width', options: ['30"', '36"'] }
    ]
  },
  {
    id: 'electric-wheelchair-1',
    name: 'PowerDrive Electric Wheelchair',
    brand: 'Pride Mobility',
    sku: 'PD-EXCEL',
    price: 2899.00,
    originalPrice: 3299.00,
    rating: 4.7,
    reviewCount: 142,
    images: [
      'https://www.mytopia.com.au/media/catalog/product/h/w/hwceleeq14ka_clean.jpg?optimize=medium&fit=bounds&height=1024&width=1024&canvas=1024:1024',
      'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&h=800&fit=crop',
    ],
    description: 'Full-featured electric wheelchair with joystick control, comfortable seating, and long-range battery.',
    category: 'Electric Wheelchairs',
    specs: [
      'Top speed: 4 mph',
      'Range: up to 12 miles',
      'Weight capacity: 300 lbs',
      'Disassembles for transport'
    ],
    variants: [
      { name: 'Color', options: ['Red', 'Blue', 'Black'] },
      { name: 'Battery Type', options: ['Standard', 'Extended'] }
    ]
  }
];
