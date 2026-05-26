# Complete CURL Examples - All APIs with Edge Cases

## 📚 Table of Contents
1. [Course Purchase APIs](#course-purchase-apis)
2. [EMI Payment APIs](#emi-payment-apis)
3. [User Dashboard APIs](#user-dashboard-apis)
4. [Edge Cases & Error Scenarios](#edge-cases--error-scenarios)

---

## 🛒 Course Purchase APIs

### 1. Buy Course - Guest User (Non-EMI) ✅

**Success Case:**
```bash
curl -X POST http://localhost:5000/api/v1/course/buy \
-H "Content-Type: application/json" \
-d '{
  "courseId": "674d1234567890abcdef1234",
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "mobile": "9876543210",
  "amount": 15000,
  "paymentMethod": "UPI",
  "isEmi": false
}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Course purchase initiated. Pay full amount now.",
  "data": {
    "paymentId": "674d1234567890abcdef5678",
    "course": {
      "_id": "674d1234567890abcdef1234",
      "title": "UPSC Prelims 2025",
      "sellingPrice": 15000,
      "thumbnail": {
        "_id": "674d...",
        "filename": "thumb.jpg",
        "contentType": "image/jpeg"
      }
    },
    "razorpayOrder": {
      "id": "order_MNopQRstUVwxYZ12",
      "amount": 1500000,
      "currency": "INR"
    },
    "paymentDetails": {
      "isEmi": false,
      "emiDurationMonths": null,
      "monthlyEmiAmount": 0,
      "totalAmount": 15000,
      "amountToPay": 15000
    }
  }
}
```

---

### 2. Buy Course - Registered User (Non-EMI) ✅

**Success Case:**
```bash
curl -X POST http://localhost:5000/api/v1/course/buy \
-H "Content-Type: application/json" \
-d '{
  "courseId": "674d1234567890abcdef1234",
  "userId": "674d9999888877776666",
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "mobile": "9123456789",
  "amount": 15000,
  "paymentMethod": "CARD",
  "isEmi": false
}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Course purchase initiated. Pay full amount now.",
  "data": {
    "paymentId": "674d...",
    "razorpayOrder": {
      "amount": 1500000
    },
    "paymentDetails": {
      "isEmi": false,
      "totalAmount": 15000,
      "amountToPay": 15000
    }
  }
}
```

---

### 3. Buy Course - Registered User (EMI - 3 months) ✅

**Success Case:**
```bash
curl -X POST http://localhost:5000/api/v1/course/buy \
-H "Content-Type: application/json" \
-d '{
  "courseId": "674d1234567890abcdef1234",
  "userId": "674d9999888877776666",
  "name": "Amit Singh",
  "email": "amit@example.com",
  "mobile": "9988776655",
  "amount": 15000,
  "paymentMethod": "UPI",
  "isEmi": true,
  "emiDurationMonths": 3
}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Course purchase initiated. Pay first EMI installment now.",
  "data": {
    "paymentId": "674d...",
    "razorpayOrder": {
      "id": "order_...",
      "amount": 500000,
      "currency": "INR"
    },
    "paymentDetails": {
      "isEmi": true,
      "emiDurationMonths": 3,
      "monthlyEmiAmount": 5000,
      "totalAmount": 15000,
      "amountToPay": 5000
    }
  }
}
```

---

### 4. Buy Course - Registered User (EMI - 6 months) ✅

```bash
curl -X POST http://localhost:5000/api/v1/course/buy \
-H "Content-Type: application/json" \
-d '{
  "courseId": "674d1234567890abcdef1234",
  "userId": "674d9999888877776666",
  "name": "Neha Gupta",
  "email": "neha@example.com",
  "mobile": "9876543210",
  "amount": 15000,
  "paymentMethod": "NETBANKING",
  "isEmi": true,
  "emiDurationMonths": 6
}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Course purchase initiated. Pay first EMI installment now.",
  "data": {
    "paymentId": "674d...",
    "razorpayOrder": {
      "amount": 250000
    },
    "paymentDetails": {
      "isEmi": true,
      "emiDurationMonths": 6,
      "monthlyEmiAmount": 2500,
      "totalAmount": 15000,
      "amountToPay": 2500
    }
  }
}
```

---

### 5. Buy Course - Registered User (EMI - 12 months) ✅

```bash
curl -X POST http://localhost:5000/api/v1/course/buy \
-H "Content-Type: application/json" \
-d '{
  "courseId": "674d1234567890abcdef1234",
  "userId": "674d9999888877776666",
  "name": "Vikram Patel",
  "email": "vikram@example.com",
  "mobile": "9123456789",
  "amount": 15000,
  "paymentMethod": "CARD",
  "isEmi": true,
  "emiDurationMonths": 12
}'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "razorpayOrder": {
      "amount": 125000
    },
    "paymentDetails": {
      "emiDurationMonths": 12,
      "monthlyEmiAmount": 1250,
      "amountToPay": 1250
    }
  }
}
```

---

### 6. Verify Purchase (Non-EMI) ✅

```bash
curl -X POST http://localhost:5000/api/v1/course/verify-purchase \
-H "Content-Type: application/json" \
-d '{
  "paymentId": "674d1234567890abcdef5678",
  "razorpayPaymentId": "pay_MNopQRstUVwxYZ12",
  "razorpayOrderId": "order_MNopQRstUVwxYZ12",
  "razorpaySignature": "abc123def456ghi789jkl012mno345pqr678stu901vwx234yz"
}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Course purchased successfully",
  "data": {
    "payment": {
      "_id": "674d1234567890abcdef5678",
      "status": "SUCCESS",
      "amount": 15000,
      "isEmi": false,
      "paymentDate": "2025-11-20T10:30:00.000Z"
    },
    "purchase": {
      "_id": "674d9876543210fedcba9876",
      "courseId": "674d1234567890abcdef1234",
      "userId": null,
      "guestInfo": {
        "name": "Rahul Kumar",
        "email": "rahul@example.com",
        "mobile": "9876543210"
      },
      "totalAmount": 15000,
      "isEmi": false,
      "status": "ACTIVE"
    }
  }
}
```

---

### 7. Verify Purchase (EMI) ✅

```bash
curl -X POST http://localhost:5000/api/v1/course/verify-purchase \
-H "Content-Type: application/json" \
-d '{
  "paymentId": "674d1234567890abcdef5678",
  "razorpayPaymentId": "pay_XYZ123ABC456",
  "razorpayOrderId": "order_XYZ789ABC123",
  "razorpaySignature": "xyz789abc123def456ghi789jkl012mno345"
}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Course purchased successfully",
  "data": {
    "payment": {
      "_id": "674d1234567890abcdef5678",
      "status": "SUCCESS",
      "amount": 15000,
      "isEmi": true,
      "emiDurationMonths": 6,
      "installmentsCompleted": 1,
      "emiStatus": "ACTIVE"
    },
    "purchase": {
      "_id": "674d9876543210fedcba9876",
      "userId": "674d9999888877776666",
      "totalAmount": 15000,
      "isEmi": true,
      "emiDurationMonths": 6,
      "status": "ACTIVE"
    }
  }
}
```

---

## 💳 EMI Payment APIs

### 8. Get Pending Installments ✅

```bash
curl -X GET http://localhost:5000/api/v1/emi/pending-installments \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzRkOTk5OTg4ODg3Nzc3NjY2NiIsInVzZXJ0eXBlIjoidXNlciIsImlhdCI6MTczMjEwMDAwMCwiZXhwIjoxNzMyMTg2NDAwfQ.abc123def456"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Pending installments fetched successfully",
  "data": [
    {
      "_id": "674d5555666677778888",
      "installmentNumber": 2,
      "amountDue": 2500,
      "dueDate": "2025-12-20T00:00:00.000Z",
      "status": "PENDING",
      "paymentId": {
        "courseId": {
          "title": "UPSC Prelims 2025"
        }
      }
    },
    {
      "_id": "674d6666777788889999",
      "installmentNumber": 3,
      "amountDue": 2500,
      "dueDate": "2026-01-20T00:00:00.000Z",
      "status": "PENDING",
      "paymentId": {
        "courseId": {
          "title": "UPSC Prelims 2025"
        }
      }
    },
    {
      "_id": "674d7777888899990000",
      "installmentNumber": 4,
      "amountDue": 2500,
      "dueDate": "2026-02-20T00:00:00.000Z",
      "status": "PENDING"
    },
    {
      "_id": "674d8888999900001111",
      "installmentNumber": 5,
      "amountDue": 2500,
      "dueDate": "2026-03-20T00:00:00.000Z",
      "status": "PENDING"
    },
    {
      "_id": "674d9999000011112222",
      "installmentNumber": 6,
      "amountDue": 2500,
      "dueDate": "2026-04-20T00:00:00.000Z",
      "status": "PENDING"
    }
  ]
}
```

---

### 9. Get All Installments (PAID + PENDING) ✅

```bash
curl -X GET http://localhost:5000/api/v1/emi/my-installments \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Installments fetched successfully",
  "data": [
    {
      "_id": "674d4444555566667777",
      "installmentNumber": 1,
      "amountDue": 2500,
      "dueDate": "2025-11-20T00:00:00.000Z",
      "status": "PAID",
      "paidDate": "2025-11-20T10:30:00.000Z",
      "paymentReferenceId": "pay_MNopQRstUVwxYZ12"
    },
    {
      "_id": "674d5555666677778888",
      "installmentNumber": 2,
      "amountDue": 2500,
      "dueDate": "2025-12-20T00:00:00.000Z",
      "status": "PENDING"
    },
    {
      "_id": "674d6666777788889999",
      "installmentNumber": 3,
      "amountDue": 2500,
      "dueDate": "2026-01-20T00:00:00.000Z",
      "status": "PENDING"
    }
  ]
}
```

---

### 10. Pay Installment (2nd Installment) ✅

```bash
curl -X POST http://localhost:5000/api/v1/emi/pay-installment \
-H "Content-Type: application/json" \
-d '{
  "installmentId": "674d5555666677778888"
}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Installment payment initiated successfully",
  "data": {
    "installmentId": "674d5555666677778888",
    "installmentNumber": 2,
    "amountDue": 2500,
    "dueDate": "2025-12-20T00:00:00.000Z",
    "razorpayOrder": {
      "id": "order_XYZ789ABC123",
      "amount": 250000,
      "currency": "INR"
    }
  }
}
```

---

### 11. Verify Installment Payment ✅

```bash
curl -X POST http://localhost:5000/api/v1/emi/verify-installment-payment \
-H "Content-Type: application/json" \
-d '{
  "installmentId": "674d5555666677778888",
  "razorpayPaymentId": "pay_XYZ123ABC456",
  "razorpayOrderId": "order_XYZ789ABC123",
  "razorpaySignature": "xyz789abc123def456ghi789jkl012mno345pqr678"
}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Installment payment verified successfully",
  "data": {
    "installment": {
      "_id": "674d5555666677778888",
      "installmentNumber": 2,
      "amountDue": 2500,
      "status": "PAID",
      "paidDate": "2025-11-20T11:00:00.000Z",
      "paymentReferenceId": "pay_XYZ123ABC456"
    }
  }
}
```

---

### 12. Pay Last Installment (6th) ✅

```bash
curl -X POST http://localhost:5000/api/v1/emi/pay-installment \
-H "Content-Type: application/json" \
-d '{
  "installmentId": "674d9999000011112222"
}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Installment payment initiated successfully",
  "data": {
    "installmentId": "674d9999000011112222",
    "installmentNumber": 6,
    "amountDue": 2500,
    "dueDate": "2026-04-20T00:00:00.000Z",
    "razorpayOrder": {
      "id": "order_LAST123",
      "amount": 250000,
      "currency": "INR"
    }
  }
}
```

---

### 13. Verify Last Installment (Auto-Complete) ✅

```bash
curl -X POST http://localhost:5000/api/v1/emi/verify-installment-payment \
-H "Content-Type: application/json" \
-d '{
  "installmentId": "674d9999000011112222",
  "razorpayPaymentId": "pay_LAST123ABC",
  "razorpayOrderId": "order_LAST123",
  "razorpaySignature": "last789abc123def456"
}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Installment payment verified successfully",
  "data": {
    "installment": {
      "_id": "674d9999000011112222",
      "installmentNumber": 6,
      "status": "PAID",
      "paidDate": "2026-04-20T10:00:00.000Z"
    }
  }
}
```

**Note:** After this, backend automatically:
- Updates payment `emiStatus` → `COMPLETED`
- Updates payment `installmentsCompleted` → `6`
- Updates purchase `status` → `COMPLETED`

---

## 👤 User Dashboard APIs

### 14. Get My Purchases ✅

```bash
curl -X GET http://localhost:5000/api/v1/course/my-purchases \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Purchases fetched successfully",
  "data": [
    {
      "_id": "674d9876543210fedcba9876",
      "courseId": {
        "_id": "674d1234567890abcdef1234",
        "title": "UPSC Prelims 2025",
        "description": "Complete preparation course",
        "sellingPrice": 15000,
        "duration": "6 months",
        "mode": "Online",
        "thumbnail": {
          "_id": "674d...",
          "filename": "thumb.jpg",
          "contentType": "image/jpeg"
        }
      },
      "userId": "674d9999888877776666",
      "totalAmount": 15000,
      "isEmi": true,
      "emiDurationMonths": 6,
      "status": "ACTIVE",
      "purchaseDate": "2025-11-20T10:30:00.000Z",
      "paymentId": {
        "orderId": "ord_abc123",
        "amount": 15000,
        "status": "SUCCESS",
        "paymentDate": "2025-11-20T10:30:00.000Z"
      }
    }
  ]
}
```

---

### 15. Get Single Purchase Details ✅

```bash
curl -X GET http://localhost:5000/api/v1/course/purchase/674d9876543210fedcba9876 \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Purchase details fetched successfully",
  "data": {
    "_id": "674d9876543210fedcba9876",
    "courseId": {
      "_id": "674d1234567890abcdef1234",
      "title": "UPSC Prelims 2025",
      "sellingPrice": 15000
    },
    "userId": {
      "name": "Amit Singh",
      "email": "amit@example.com",
      "mobile": "9988776655"
    },
    "totalAmount": 15000,
    "isEmi": true,
    "emiDurationMonths": 6,
    "status": "ACTIVE",
    "purchaseDate": "2025-11-20T10:30:00.000Z"
  }
}
```

---

## ❌ Edge Cases & Error Scenarios

### Error 1: Missing Required Fields

```bash
curl -X POST http://localhost:5000/api/v1/course/buy \
-H "Content-Type: application/json" \
-d '{
  "courseId": "674d1234567890abcdef1234",
  "name": "Rahul Kumar"
}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Missing required fields: courseId, name, email, mobile, amount, or paymentMethod"
}
```

---

### Error 2: Amount Mismatch

```bash
curl -X POST http://localhost:5000/api/v1/course/buy \
-H "Content-Type: application/json" \
-d '{
  "courseId": "674d1234567890abcdef1234",
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "mobile": "9876543210",
  "amount": 10000,
  "paymentMethod": "UPI",
  "isEmi": false
}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Amount mismatch. Course price is ₹15000 but you sent ₹10000"
}
```

---

### Error 3: Guest User Trying EMI

```bash
curl -X POST http://localhost:5000/api/v1/course/buy \
-H "Content-Type: application/json" \
-d '{
  "courseId": "674d1234567890abcdef1234",
  "name": "Guest User",
  "email": "guest@example.com",
  "mobile": "9876543210",
  "amount": 15000,
  "paymentMethod": "UPI",
  "isEmi": true,
  "emiDurationMonths": 6
}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "EMI option is only available for registered users. Please provide userId or login."
}
```

---

### Error 4: Invalid EMI Duration

```bash
curl -X POST http://localhost:5000/api/v1/course/buy \
-H "Content-Type: application/json" \
-d '{
  "courseId": "674d1234567890abcdef1234",
  "userId": "674d9999888877776666",
  "name": "Amit Singh",
  "email": "amit@example.com",
  "mobile": "9988776655",
  "amount": 15000,
  "paymentMethod": "UPI",
  "isEmi": true,
  "emiDurationMonths": 1
}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "EMI duration must be at least 2 months"
}
```

---

### Error 5: Course Not Found

```bash
curl -X POST http://localhost:5000/api/v1/course/buy \
-H "Content-Type: application/json" \
-d '{
  "courseId": "674d0000000000000000",
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "mobile": "9876543210",
  "amount": 15000,
  "paymentMethod": "UPI",
  "isEmi": false
}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Course not found"
}
```

---

### Error 6: Duplicate Purchase (Registered User)

```bash
curl -X POST http://localhost:5000/api/v1/course/buy \
-H "Content-Type: application/json" \
-d '{
  "courseId": "674d1234567890abcdef1234",
  "userId": "674d9999888877776666",
  "name": "Amit Singh",
  "email": "amit@example.com",
  "mobile": "9988776655",
  "amount": 15000,
  "paymentMethod": "UPI",
  "isEmi": false
}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "You have already purchased this course"
}
```

---

### Error 7: Invalid Payment Verification

```bash
curl -X POST http://localhost:5000/api/v1/course/verify-purchase \
-H "Content-Type: application/json" \
-d '{
  "paymentId": "674d1234567890abcdef5678",
  "razorpayPaymentId": "pay_INVALID",
  "razorpayOrderId": "order_INVALID",
  "razorpaySignature": "invalid_signature"
}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Payment verification failed"
}
```

---

### Error 8: Installment Not Found

```bash
curl -X POST http://localhost:5000/api/v1/emi/pay-installment \
-H "Content-Type: application/json" \
-d '{
  "installmentId": "674d0000000000000000"
}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Installment not found"
}
```

---

### Error 9: Installment Already Paid

```bash
curl -X POST http://localhost:5000/api/v1/emi/pay-installment \
-H "Content-Type: application/json" \
-d '{
  "installmentId": "674d4444555566667777"
}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "This installment has already been paid"
}
```

---

### Error 10: Missing Authorization Token

```bash
curl -X GET http://localhost:5000/api/v1/emi/pending-installments
```

**Expected Response:**
```json
{
  "message": "Invalid credentials, no token provided"
}
```

---

### Error 11: Invalid/Expired Token

```bash
curl -X GET http://localhost:5000/api/v1/emi/pending-installments \
-H "Authorization: Bearer invalid_or_expired_token"
```

**Expected Response:**
```json
{
  "message": "Token has expired"
}
```
or
```json
{
  "message": "Not authorized to access this route"
}
```

---

## 📊 Summary Table

| API | Method | Auth Required | Purpose |
|-----|--------|---------------|---------|
| `/course/buy` | POST | ❌ No | Initiate purchase (EMI/Non-EMI) |
| `/course/verify-purchase` | POST | ❌ No | Verify payment |
| `/course/my-purchases` | GET | ✅ Yes | Get user's purchases |
| `/course/purchase/:id` | GET | ✅ Yes | Get single purchase |
| `/emi/pay-installment` | POST | ❌ No | Initiate installment payment |
| `/emi/verify-installment-payment` | POST | ❌ No | Verify installment payment |
| `/emi/my-installments` | GET | ✅ Yes | Get all installments |
| `/emi/pending-installments` | GET | ✅ Yes | Get pending installments |

---

## 🎯 Testing Checklist

- [ ] Guest user - Non-EMI purchase
- [ ] Registered user - Non-EMI purchase
- [ ] Registered user - EMI purchase (3 months)
- [ ] Registered user - EMI purchase (6 months)
- [ ] Registered user - EMI purchase (12 months)
- [ ] Verify non-EMI payment
- [ ] Verify EMI payment (first installment)
- [ ] Get pending installments
- [ ] Pay 2nd installment
- [ ] Verify 2nd installment
- [ ] Pay all remaining installments
- [ ] Verify last installment (auto-complete)
- [ ] Get my purchases
- [ ] Amount mismatch error
- [ ] Guest user EMI error
- [ ] Invalid EMI duration error
- [ ] Duplicate purchase error
- [ ] Invalid signature error
- [ ] Already paid installment error

Done! 🚀
