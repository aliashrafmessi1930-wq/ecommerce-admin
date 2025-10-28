import { Router } from "express";
import Stripe from "stripe";

const router = Router();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// ✅ تأكد إن المفتاح السري موجود
if (!stripeSecretKey) {
  console.warn("⚠️ STRIPE_SECRET_KEY is missing in .env file!");
}

router.post("/checkout", async (req, res) => {
  try {
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-06-20",
    });

    const { items = [], email } = req.body;

    const line_items = items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.discountedPrice * 100,
        product_data: {
          name: item.name,
          description: item.description || "",
          images: item.images || [],
        },
      },
    }));

    // ✅ إنشاء الجلسة الجديدة
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:3003/success",
      cancel_url: "http://localhost:3003/cancel",
      metadata: { email },
    });

    // 🟩 أضف اللوجات هنا 👇
    console.log("✅ Stripe Checkout Session Created:");
    console.log("Checkout URL:", session.url);
    console.log("Success URL:", session.success_url);

    // ✅ رجّع الـ URL عشان نستخدمه في الفرونت
    res.json({ success: true, id: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
