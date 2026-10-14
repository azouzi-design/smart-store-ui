// Mock data only — mirrors what the live homepage shows, no API calls.
export const store = {
  hours: "Open today 7:00 AM – 10:00 PM",
  pharmacy: "Pharmacy Hours: Mon–Fri 9am–8pm · Sat 9am–5pm · Sun 11am–5pm",
  address: "3425 Ingersoll Ave, Des Moines, IA",
  phone: "(515) 255-3118",
};

export const user = { name: "Sam", listCount: 1, cartCount: 152 };

export const departments = [
  "Recommended For You",
  "Bakery",
  "Beer & Wine",
  "Dairy",
  "Deli",
  "Grocery",
  "Household",
  "Meat & Poultry",
  "Produce",
];

export type Product = { name: string; price: string; was: string; unit: string };

export const products: Product[] = [
  { name: "Best Choice Walnut Pieces", price: "$2.49", was: "$4.79", unit: "42¢/oz" },
  { name: "Kemps Black Jack Cherry Low Fat Smooth & Creamy Frozen Yogurt", price: "$3.49", was: "$6.29", unit: "7¢/oz" },
  { name: "Hormel Original Crumbled Real Bacon - 4.3 Ounce", price: "$3.99", was: "$7.19", unit: "93¢/oz" },
  { name: "Kemps Fat Free Rainbow Sherbet 1.69 Qt. Tub", price: "$3.49", was: "$6.19", unit: "6¢/oz" },
  { name: "Fathers Table Cheesecake, Variety Sampler", price: "$5.29", was: "$8.99", unit: "33¢/oz" },
  { name: "Best Choice Half & Half", price: "$1.49", was: "$2.49", unit: "9¢/oz" },
  { name: "Heinz Yellow Mustard - 14oz", price: "$1.49", was: "$2.49", unit: "11¢/oz" },
  { name: "Fris Vodka 80 Proof - 1.75L", price: "$8.99", was: "$14.99", unit: "15¢/oz" },
  { name: "Louis Kemp Crab Delights Flake Style Imitation Crabmeat", price: "$2.49", was: "$4.15", unit: "31¢/oz" },
  { name: "Best Choice Milk Chocolate Baking Chips", price: "$2.49", was: "$4.09", unit: "22¢/oz" },
  { name: "Crystal Farms Marble Jack Cheese Sticks", price: "$2.99", was: "$4.79", unit: "33¢/oz" },
  { name: "Crystal Farms Wisconsin Mozzarella String Cheese", price: "$2.99", was: "$4.79", unit: "30¢/oz" },
  { name: "Best Choice Pure Vanilla Extract 2 Oz", price: "$4.49", was: "$7.15", unit: "$2.25/oz" },
  { name: "Coca-Cola Fridge Pack Cans, 12 Fl Oz", price: "$6.99", was: "$10.99", unit: "5¢/oz" },
  { name: "Kraft Powermac Original 7.25oz - 7.25 OZ", price: "$2.29", was: "$3.59", unit: "32¢/oz" },
];

export const trust = [
  { icon: "💲", title: "Save more", sub: "Personalized deals just for you" },
  { icon: "🌿", title: "Fresh & local", sub: "Quality you can count on" },
  { icon: "🤝", title: "Community first", sub: "Proud to serve our neighbors" },
  { icon: "🔒", title: "Secure & private", sub: "Your data is always protected" },
];

export const footerColumns: { title: string; links: string[] }[] = [
  { title: "Customer Service", links: ["Contact Us", "FAQ", "Delivery & Pickup", "Returns & Refunds", "Gift Cards", "Product Recalls"] },
  { title: "Shop", links: ["Weekly Deals", "Coupons", "Recipes & Meal Planner", "Shop All Departments", "My Shopping List", "My Rewards"] },
  { title: "Company", links: ["About Us", "Careers", "Apply for a Job", "Store Location & Hours", "Supply Chain Transparency"] },
  { title: "Policies & Disclosures", links: ["Terms of Use", "Privacy Policy"] },
];
