// Mock data only — mirrors what the live Weekly Ad page shows, no API calls.
export const store = {
  hours: "Open today 7:00 AM – 10:00 PM",
  pharmacy: "Pharmacy Hours: Mon–Fri 9am–8pm · Sat 9am–5pm · Sun 11am–5pm",
  address: "3425 Ingersoll Ave, Des Moines, IA",
  phone: "(515) 255-3118",
};

// Signed-out view, as on the live page (cart count is the live page's demo value).
export const user = { cartCount: 304 };

export const results = { total: 118, onSale: 94 };

export const departments = ["Recommended For You", "Grocery", "Produce"];

export const sortOptions = ["Featured", "Biggest savings", "Price: low to high", "Price: high to low", "Name"];

/**
 * `dept` is what the live page shows (inconsistent: "FOOD", "Miscellaneous" or missing).
 * `category` is PROPOSED: one normalized label per deal, used by the proposed layouts.
 */
export type InStoreDeal = { name: string; price: string; dept?: string; category: InStoreCategory; img: string };

export const inStoreCategories = ["Meat", "Produce", "Deli", "Snacks"] as const;
export type InStoreCategory = (typeof inStoreCategories)[number];

/** PROPOSED: mock ad week shown on the in-store variants (the live page doesn't say). */
export const adWeek = { from: "Wed, Oct 14", to: "Tue, Oct 20" };

// Images in /public/live are copied from the live site's CDN (see public/live/README.md).
export const inStoreDeals: InStoreDeal[] = [
  { name: "Tortilla Chips", price: "$3.99", category: "Snacks", img: "/live/ad/tortilla-chips.jpg" },
  { name: "Quarter Loin chops", price: "$2.99", dept: "Miscellaneous", category: "Meat", img: "/live/ad/quarter-loin-chops.jpg" },
  { name: "Sunion Tearless Sweet", price: "$1.29", dept: "Produce", category: "Produce", img: "/live/plu/4166.jpg" },
  { name: "Sliced White Mushrooms", price: "$1.99", category: "Produce", img: "/live/ad/sliced-white-mushrooms.jpg" },
  { name: "Bartlett Pears", price: "$1.49", dept: "FOOD", category: "Produce", img: "/live/plu/4409.jpg" },
  { name: "Turkey Bacon Swiss Ciabatta Sandwich", price: "$9.99", category: "Deli", img: "/live/ad/turkey-bacon-swiss-ciabatta-sandwich.jpg" },
  { name: "Boneless New York Strip Steak", price: "$14.99", category: "Meat", img: "/live/ad/boneless-new-york-strip-steak.jpg" },
  { name: "Boneless Beef Bottom Round Roast", price: "$6.99", category: "Meat", img: "/live/ad/boneless-beef-bottom-round-roast.jpg" },
  { name: "Bottom Round Steaks", price: "$7.29", category: "Meat", img: "/live/ad/bottom-round-steaks.jpg" },
  { name: "Chicken Drumsticks or Thighs", price: "$1.29", category: "Meat", img: "/live/ad/chicken-drumsticks-or-thighs.jpg" },
  { name: "Stuffed Peppers Ground Beef", price: "$6.99", category: "Deli", img: "/live/ad/stuffed-peppers-ground-beef.jpg" },
  { name: "Pork Spare Ribs", price: "$3.59", category: "Meat", img: "/live/ad/pork-spare-ribs.jpg" },
];

export type Product = { name: string; price: string; was: string; unit?: string; img: string };

export const products: Product[] = [
  { name: "Best Choice Walnut Pieces", price: "$2.49", was: "$4.79", unit: "42¢/oz", img: "/live/products/7003859825.png" },
  { name: "Kemps Black Jack Cherry Low Fat Smooth & Creamy Frozen Yoghurt - 1.5qt", price: "$3.49", was: "$6.29", unit: "7¢/oz", img: "/live/products/4148303572.jpg" },
  { name: "Kemps Fat Free Rainbow Sherbet 1.69 Qt. Tub", price: "$3.49", was: "$6.19", unit: "6¢/oz", img: "/live/products/4148300330.jpg" },
  { name: "Fathers Table Cheesecake, Variety Sampler", price: "$5.29", was: "$8.99", unit: "33¢/oz", img: "/live/products/1037416205.jpg" },
  { name: "Fris Vodka 80 Proof – 1.75L", price: "$8.99", was: "$14.99", img: "/live/products/8800402614.png" },
  { name: "Louis Kemp Crab Delights Flake Style Imitation Crabmeat", price: "$2.49", was: "$4.15", unit: "31¢/oz", img: "/live/products/7929690103.jpg" },
  { name: "Crystal Farms Marble Jack Cheese Sticks", price: "$2.99", was: "$4.79", unit: "33¢/oz", img: "/live/products/7592530373.png" },
  { name: "Crystal Farms Wisconsin Mozzarella String Cheese", price: "$2.99", was: "$4.79", unit: "30¢/oz", img: "/live/products/7592530067.jpg" },
  { name: "Best Choice Pure Vanilla Extract 2 Oz", price: "$4.49", was: "$7.15", unit: "$2.25/oz", img: "/live/products/7003862814.png" },
  { name: "Coca-Cola Fridge Pack Cans, 12 Fl Oz", price: "$6.99", was: "$10.99", img: "/live/products/4900002890.png" },
  { name: "Kraft Powermac Original 7.25oz - 7.25 OZ", price: "$2.29", was: "$3.59", unit: "32¢/oz", img: "/live/products/2100008743.jpg" },
  { name: "Orville Redenbacher's Butter Classic Bag Microwave Popcorn", price: "$3.99", was: "$6.25", unit: "67¢/ct", img: "/live/products/2700037241.jpg" },
  { name: "Best Choice Shelled Walnuts 6 Oz", price: "$2.49", was: "$3.89", unit: "42¢/oz", img: "/live/products/7003859969.png" },
  { name: "Pringles Potato Crisps Chips Variety Pack", price: "$8.99", was: "$13.99", unit: "70¢/oz", img: "/live/products/3800032890.jpg" },
  { name: "Annie's Homegrown Cheddar Bunnies Crackers Organic Baked Snack - 7.5 Oz", price: "$3.99", was: "$6.19", unit: "53¢/oz", img: "/live/products/1356230215.jpg" },
  { name: "Bertolli Shrimp Scampi & Linguine Frozen Meal", price: "$5.99", was: "$9.15", unit: "27¢/oz", img: "/live/products/3100067102.jpg" },
  { name: "Best Choice Lemon Cake Mix", price: "$0.99", was: "$1.49", unit: "6¢/oz", img: "/live/products/7003860730.png" },
  { name: "Best Choice Yellow Cake Mix", price: "$0.99", was: "$1.49", unit: "6¢/oz", img: "/live/products/7003830153.png" },
  { name: "BelGioioso Parmesan Cheese, Wedge", price: "$2.79", was: "$4.19", unit: "56¢/oz", img: "/live/products/3114252375.jpg" },
  { name: "Heinz No Salt Added Tomato Ketchup 14 Oz. Bottle", price: "$2.99", was: "$4.49", unit: "21¢/oz", img: "/live/products/1300000897.jpg" },
  { name: "Eggo Protein Buttermilk Vanilla Waffles, Breakfast Food", price: "$4.99", was: "$7.45", unit: "37¢/oz", img: "/live/products/3800030940.jpg" },
  { name: "Eggo Waffles Buttermilk Zero", price: "$4.99", was: "$7.45", unit: "51¢/oz", img: "/live/products/3800033593.jpg" },
  { name: "Pwbc Cat Complt 3 Lb", price: "$3.49", was: "$5.19", unit: "$1.16/lb", img: "/live/products/7003867307.png" },
  { name: "Buddig Original Ham With Natural Juices", price: "$3.49", was: "$5.15", unit: "39¢/oz", img: "/live/products/7740010832.jpg" },
  { name: "P.F. Chang's Home Menu Beef & Broccoli Skillet Frozen Meal", price: "$5.99", was: "$8.79", unit: "27¢/oz", img: "/live/products/3100067001.jpg" },
  { name: "Dove Ice Cream Bars, Vanilla & Chocolate, Minis, Variety Pack", price: "$4.99", was: "$7.29", unit: "67¢/oz", img: "/live/products/4767748527.jpg" },
  { name: "Black Velvet Canadian Whisky", price: "$15.99", was: "$22.99", img: "/live/products/9674900304.jpg" },
  { name: "Best Choice Chewy Peanut Butter Chocolate Chip Granola Bars", price: "$2.99", was: "$4.29", unit: "30¢/oz", img: "/live/products/7003858910.png" },
  { name: "Best Choice Honey Garlic Wings Seasoning Mix 1.25 Oz", price: "$0.69", was: "$0.99", unit: "55¢/oz", img: "/live/products/7003867180.png" },
  { name: "Pillsbury Grands! Buttermilk Biscuits Value Pack", price: "$4.99", was: "$7.15", unit: "12¢/oz", img: "/live/products/1800073412.jpg" },
  { name: "Zatarain's Etouffee Base Mix 3.2 Oz", price: "$1.99", was: "$2.85", unit: "62¢/oz", img: "/live/products/7142909532.jpg" },
  { name: "Bubly Bellini Bliss Sparkling Water - 8pk/12 Fl Oz Cans", price: "$3.99", was: "$5.69", unit: "4¢/oz", img: "/live/products/1200021430.jpg" },
  { name: "McCormick Mild Chili Seasoning Mix - 1.25 Ounce", price: "$0.99", was: "$1.39", unit: "79¢/oz", img: "/live/products/5210015520.jpg" },
  { name: "Best Choice Milk Chocolate Baking Chips", price: "$2.49", was: "$3.49", unit: "22¢/oz", img: "/live/products/7003859670.png" },
  { name: "Chi-Chi's Mild Thick & Chunky Salsa 16 Oz", price: "$2.49", was: "$3.49", unit: "16¢/oz", img: "/live/products/3760029538.jpg" },
  { name: "Bertolli Salsa Alfredo Sauce 425g", price: "$2.99", was: "$4.15", unit: "20¢/oz", img: "/live/products/3620021929.jpg" },
  { name: "Best Choice Lite Cherry Pie Filling", price: "$2.99", was: "$4.15", unit: "15¢/oz", img: "/live/products/7003834524.png" },
  { name: "Zesta Saltine Crackers, Original 11.0 Oz", price: "$2.99", was: "$4.15", unit: "27¢/oz", img: "/live/products/3010013003.png" },
  { name: "Tostitos Scoops! Original Tortilla Chips - 10 Ounce", price: "$3.99", was: "$5.49", img: "/live/products/2840006408.png" },
  { name: "Hormel Real Bacon Bits 6 Oz. Pouch", price: "$4.49", was: "$6.09", unit: "75¢/oz", img: "/live/products/3760001434.jpg" },
];

export const footerColumns: { title: string; links: string[] }[] = [
  { title: "Customer Service", links: ["Contact Us", "FAQ", "Delivery & Pickup", "Returns & Refunds", "Gift Cards", "Product Recalls"] },
  { title: "Shop", links: ["Weekly Deals", "Coupons", "Recipes & Meal Planner", "Shop All Departments", "My Shopping List", "My Rewards"] },
  { title: "Company", links: ["About Us", "Careers", "Apply for a Job", "Store Location & Hours", "Supply Chain Transparency"] },
  { title: "Policies & Disclosures", links: ["Terms of Use", "Privacy Policy"] },
];
