import fs from "fs";
import path from "path";

// 🧾 مسار ملف المنتجات
const filePath = path.resolve("./index.mjs");
;
let content = fs.readFileSync(filePath, "utf-8");

// 🧠 أسماء جديدة للمنتجات (هيتكرّر لو عدد المنتجات أكتر)
const names = [
  "iPhone 15 Pro Max",
  "Samsung Galaxy S24 Ultra",
  "MacBook Air M3",
  "Sony WH-1000XM5 Headphones",
  "Dell XPS 13 Laptop",
  "Apple Watch Ultra 2",
  "Canon EOS R50 Camera",
  "Bose SoundLink Speaker",
  "Dyson V15 Vacuum",
  "GoPro Hero 12",
];

// ✨ استبدال الأسماء القديمة بأسماء جديدة
let index = 0;
content = content.replace(/name:\s*"Product\s*\d+"/g, () => {
  const newName = names[index % names.length];
  index++;
  return `name: "${newName}"`;
});

// 💾 حفظ التغييرات
fs.writeFileSync(filePath, content, "utf-8");

console.log(`✅ Done! ${index} product names updated.`);
