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

export type Product = { name: string; price: string; was: string; unit: string; img: string };

// Images in /public/live are copied from the live site's CDN (see public/live/README.md).
const img = (file: string) => `/live/products/${file}`;

export const products: Product[] = [
  { name: "Best Choice Walnut Pieces", price: "$2.49", was: "$4.79", unit: "42¢/oz", img: img("7003859825.png") },
  { name: "Kemps Black Jack Cherry Low Fat Smooth & Creamy Frozen Yogurt", price: "$3.49", was: "$6.29", unit: "7¢/oz", img: img("4148303572.jpg") },
  { name: "Kemps Fat Free Rainbow Sherbet 1.69 Qt. Tub", price: "$3.49", was: "$6.19", unit: "6¢/oz", img: img("4148300330.jpg") },
  { name: "Fathers Table Cheesecake, Variety Sampler", price: "$5.29", was: "$8.99", unit: "33¢/oz", img: img("1037416205.jpg") },
  { name: "Fris Vodka 80 Proof - 1.75L", price: "$8.99", was: "$14.99", unit: "15¢/oz", img: img("8800402614.png") },
  { name: "Louis Kemp Crab Delights Flake Style Imitation Crabmeat", price: "$2.49", was: "$4.15", unit: "31¢/oz", img: img("7929690103.jpg") },
  { name: "Crystal Farms Marble Jack Cheese Sticks", price: "$2.99", was: "$4.79", unit: "33¢/oz", img: img("7592530373.png") },
  { name: "Crystal Farms Wisconsin Mozzarella String Cheese", price: "$2.99", was: "$4.79", unit: "30¢/oz", img: img("7592530067.jpg") },
  { name: "Best Choice Pure Vanilla Extract 2 Oz", price: "$4.49", was: "$7.15", unit: "$2.25/oz", img: img("7003862814.png") },
  { name: "Coca-Cola Fridge Pack Cans, 12 Fl Oz", price: "$6.99", was: "$10.99", unit: "5¢/oz", img: img("4900002890.png") },
  { name: "Kraft Powermac Original 7.25oz - 7.25 OZ", price: "$2.29", was: "$3.59", unit: "32¢/oz", img: img("2100008743.jpg") },
  { name: "Orville Redenbacher's Butter Classic Bag Microwave Popcorn", price: "$3.99", was: "$6.25", unit: "67¢/ct", img: img("2700037241.jpg") },
  { name: "Best Choice Shelled Walnuts 6 Oz", price: "$2.49", was: "$3.89", unit: "42¢/oz", img: img("7003859969.png") },
  { name: "Pringles Potato Crisps Chips Variety Pack", price: "$8.99", was: "$13.99", unit: "70¢/oz", img: img("3800032890.jpg") },
  { name: "Annie's Homegrown Cheddar Bunnies Crackers Organic Baked Snack - 7.5 Oz", price: "$3.99", was: "$6.19", unit: "53¢/oz", img: img("1356230215.jpg") },
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
