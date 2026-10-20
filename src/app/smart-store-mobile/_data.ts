/**
 * Mock data mirroring a screenshot of the live mobile app (2026-10-20).
 * Product photos in public/mobile are cropped from that screenshot, so each one
 * carries the exact size and position it had on screen (px inside the 146×130
 * image box, centered horizontally).
 */

export type MobileProduct = {
  id: string;
  name: string;
  price: string;
  unit: "ea" | "/lb";
  approx?: boolean;
  perUnit?: string;
  qty: number; // 0 shows "+ Add"
  img: { src: string; w: number; h: number; top: number; cover?: boolean };
};

export const cartCount = 13;
export const listCount = 13;
export const resultCount = 125;

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

export const products: MobileProduct[] = [
  {
    id: "lunchables",
    name: "Lunchables Lunch Combinations, Pizza with Pepperoni",
    price: "$1.99",
    unit: "ea",
    perUnit: "46¢/oz",
    qty: 4,
    img: { src: "/mobile/lunchables.png", w: 108, h: 98, top: 0 },
  },
  {
    id: "voortman",
    name: "Voortman Bakery Sugar Free Chocolate Chip Cookies",
    price: "$4.69",
    unit: "ea",
    perUnit: "59¢/oz",
    qty: 3,
    img: { src: "/mobile/voortman.png", w: 117, h: 41, top: 40 },
  },
  {
    id: "salmon",
    name: "Fresh Salmon",
    price: "$22.99",
    unit: "/lb",
    approx: true,
    qty: 0,
    img: { src: "/mobile/salmon.png", w: 146, h: 97, top: 11, cover: true },
  },
  {
    id: "shrimp",
    name: "Grtn Styl Shrimp",
    price: "$12.89",
    unit: "ea",
    qty: 0,
    img: { src: "/mobile/shrimp.png", w: 146, h: 97, top: 11, cover: true },
  },
];
