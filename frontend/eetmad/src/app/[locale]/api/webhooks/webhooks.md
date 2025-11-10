# لا! مو كل الـ Endpoints تحتاج Webhooks 🚫

---

## **متى تحتاج Webhooks؟** ✅

**فقط** للأحداث اللي تيجي من **خدمات خارجية**:

### **1. بوابات الدفع (Payment Gateways):**

```
Stripe    → /api/webhooks/stripe
PayPal    → /api/webhooks/paypal
Tap       → /api/webhooks/tap
```

### **2. خدمات الإشعارات:**

```
Firebase  → /api/webhooks/notifications
Pusher    → /api/webhooks/pusher
```

### **3. خدمات الإيميل:**

```
SendGrid  → /api/webhooks/email
Mailgun   → /api/webhooks/mailgun
```

---

## **متى **ما** تحتاج Webhooks؟** ❌

### **الـ Endpoints العادية في منصتنا:**

```typescript
// ❌ هذي مو webhooks - هذي API عادية:

POST   /api/requests          ← إنشاء طلب جديد
GET    /api/requests          ← جلب الطلبات
GET    /api/requests/[id]     ← جلب طلب محدد
PATCH  /api/requests/[id]     ← تحديث طلب
DELETE /api/requests/[id]     ← حذف طلب

POST   /api/offers            ← إرسال عرض
GET    /api/offers            ← جلب العروض
PATCH  /api/offers/[id]       ← تحديث عرض

POST   /api/auth/login        ← تسجيل دخول
POST   /api/auth/register     ← تسجيل حساب جديد
```

---

## **في منصة اعتماد، نحتاج Webhooks فقط لـ:** 🎯

```
frontend/eetmad/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── webhooks/           ← Webhooks فقط
│   │   │   │   ├── stripe/
│   │   │   │   │   └── route.ts    ← دفعات Stripe
│   │   │   │   └── tap/
│   │   │   │       └── route.ts    ← دفعات Tap (السعودية)
│   │   │   │
│   │   │   ├── requests/           ← API عادية
│   │   │   │   └── route.ts
│   │   │   ├── offers/             ← API عادية
│   │   │   │   └── route.ts
│   │   │   └── auth/               ← API عادية
│   │   │       └── route.ts
```

---

## **مثال توضيحي:** 💡

### **سيناريو: عميل يطلب تصميم موقع**

```javascript
// 1️⃣ العميل يملأ نموذج الطلب في التطبيق
// ← يرسل POST /api/requests
// ← هذي API عادية ✅

const response = await fetch('/api/requests', {
  method: 'POST',
  body: JSON.stringify({
    title: "تصميم موقع إلكتروني",
    budget: 5000
  })
});

// ====================================

// 2️⃣ مورد يرد على الطلب بعرض
// ← يرسل POST /api/offers
// ← هذي API عادية ✅

const offer = await fetch('/api/offers', {
  method: 'POST',
  body: JSON.stringify({
    requestId: "req_123",
    price: 4500
  })
});

// ====================================

// 3️⃣ العميل يوافق ويدفع
// ← يرسل POST /api/payments
// ← التطبيق يتواصل مع Stripe

const payment = await initiateStripePayment({
  amount: 4500,
  offerId: "offer_456"
});

// ====================================

// 4️⃣ Stripe يعالج الدفعة وينجح
// ← Stripe يرسل webhook تلقائياً
// ← POST /api/webhooks/stripe
// ← هذا webhook! ✅

// ملف: /api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const event = await req.json();

  if (event.type === 'payment_intent.succeeded') {
    // ✅ تحديث حالة العرض
    await updateOffer(event.metadata.offerId, {
      status: 'paid'
    });

    // ✅ إرسال إشعار للمورد
    await notifySupplier({
      message: "تم استلام الدفعة، ابدأ العمل!"
    });
  }

  return new Response('OK');
}
```

---

## **جدول المقارنة:** 📊

| **نوع الطلب**                      | **مثال**                    | **هل نحتاج Webhook؟** |
| ---------------------------------- | --------------------------- | --------------------- |
| العميل ينشئ طلب                    | `POST /api/requests`        | ❌ لا - API عادية     |
| المورد يرسل عرض                    | `POST /api/offers`          | ❌ لا - API عادية     |
| جلب قائمة الطلبات                  | `GET /api/requests`         | ❌ لا - API عادية     |
| **Stripe يخبرنا بنجاح الدفع**      | `POST /api/webhooks/stripe` | ✅ **نعم**            |
| **SendGrid يخبرنا بإرسال الإيميل** | `POST /api/webhooks/email`  | ✅ **نعم**            |
| تحديث ملف المستخدم                 | `PATCH /api/users/[id]`     | ❌ لا - API عادية     |

---

## **القاعدة الذهبية:** 🌟

```
هل الطلب جاي من:
├── التطبيق نفسه (المستخدم)? ← API عادية
└── خدمة خارجية (Stripe, PayPal)? ← Webhook
```

---

## **في منصة اعتماد، نحتاج Webhooks فقط لـ:** 📝

### **1. الدفعات:**

```typescript
// src/app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  // معالجة webhook من Stripe
}
```

### **2. الإشعارات (اختياري):**

```typescript
// src/app/api/webhooks/notifications/route.ts
export async function POST(req: Request) {
  // إذا استخدمنا خدمة إشعارات خارجية
}
```

---

## **ملخص سريع:** ⚡

- ✅ **Webhooks = رسائل من خدمات خارجية**
- ❌ **API عادية = طلبات من التطبيق نفسه**
- 🎯 **في منصتنا نحتاج webhooks فقط للدفعات**
- 📁 **باقي الـ endpoints كلها API عادية**

---

**هل تريد أن أريك:**

1. ❓ كيف نبني باقي الـ API Routes العادية؟
2. ❓ أو نركز على Stripe Webhook فقط؟
3. ❓ أو نكمل بناء المشروع؟

قل لي وش تفضل! 🚀
