# Updated API Guide - Token-Based userId

## 🎯 Key Changes

**Old Approach:**
- Frontend sends `userId` in body

**New Approach:** ✅
- EMI purchase → User must be logged in
- Backend automatically extracts `userId` from JWT token
- Frontend **NO NEED** to send `userId` in body

---

## 📝 Updated API Examples

### 1. Buy Course - Guest User (Non-EMI) ✅

**No token needed, no userId needed**

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

✅ Works without token  
✅ No userId needed  
✅ Full payment

---

### 2. Buy Course - Registered User (Non-EMI) ✅

**Token optional, userId auto-extracted**

```bash
curl -X POST http://localhost:5000/api/v1/course/buy \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{
  "courseId": "674d1234567890abcdef1234",
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "mobile": "9123456789",
  "amount": 15000,
  "paymentMethod": "CARD",
  "isEmi": false
}'
```

✅ Token optional  
✅ userId auto-extracted from token  
✅ Backend checks duplicate purchase  
✅ Full payment

---

### 3. Buy Course - Registered User (EMI) ✅

**Token REQUIRED, userId auto-extracted**

```bash
curl -X POST http://localhost:5000/api/v1/course/buy \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{
  "courseId": "674d1234567890abcdef1234",
  "name": "Amit Singh",
  "email": "amit@example.com",
  "mobile": "9988776655",
  "amount": 15000,
  "paymentMethod": "UPI",
  "isEmi": true,
  "emiDurationMonths": 6
}'
```

✅ Token REQUIRED  
✅ userId auto-extracted from token  
✅ No need to send userId in body  
✅ First installment payment

**Response:**
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

### 4. Buy Course - Guest User (EMI) ❌

**No token = Error**

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

**Response:**
```json
{
  "success": false,
  "message": "EMI option is only available for registered users. Please login first."
}
```

❌ EMI not allowed without login

---

## 🔄 Backend Logic

```javascript
exports.buyCourse = async (req, res) => {
  const { courseId, name, email, mobile, amount, paymentMethod, isEmi, emiDurationMonths } = req.body;
  
  // ✅ Auto-extract userId from token (optionalAuth middleware)
  const userId = req.user?.id || null;
  
  // Validation
  if (isEmi && !userId) {
    return setBadRequest(res, 'EMI option is only available for registered users. Please login first.');
  }
  
  // Service call
  await coursePurchaseService.buyCourse({
    courseId,
    userId,  // ✅ Automatically from token
    name,
    email,
    mobile,
    amount,
    paymentMethod,
    isEmi,
    emiDurationMonths
  });
};
```

---

## 🎨 Frontend Examples

### React Example - Guest User (Non-EMI)

```javascript
const GuestPurchase = ({ course }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const handleBuy = async () => {
    const response = await fetch('http://localhost:5000/api/v1/course/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // ❌ No Authorization header
      },
      body: JSON.stringify({
        courseId: course._id,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        amount: course.sellingPrice,
        paymentMethod: 'UPI',
        isEmi: false
        // ❌ No userId needed
      })
    });

    const data = await response.json();
    // Initialize Razorpay...
  };

  return (
    <form>
      <input placeholder="Name" value={formData.name} onChange={...} />
      <input placeholder="Email" value={formData.email} onChange={...} />
      <input placeholder="Mobile" value={formData.mobile} onChange={...} />
      <button onClick={handleBuy}>Buy Now</button>
    </form>
  );
};
```

---

### React Example - Registered User (EMI)

```javascript
const RegisteredUserPurchase = ({ course, user }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    isEmi: false,
    emiDurationMonths: 6
  });

  const handleBuy = async () => {
    const token = localStorage.getItem('authToken');

    const response = await fetch('http://localhost:5000/api/v1/course/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // ✅ Token bhejo
      },
      body: JSON.stringify({
        courseId: course._id,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        amount: course.sellingPrice,
        paymentMethod: 'UPI',
        isEmi: formData.isEmi,
        emiDurationMonths: formData.isEmi ? formData.emiDurationMonths : null
        // ✅ No userId needed - backend extracts from token
      })
    });

    const data = await response.json();
    
    if (data.success) {
      // Initialize Razorpay...
    } else {
      alert(data.message);
    }
  };

  return (
    <form>
      <input placeholder="Name" value={formData.name} onChange={...} />
      <input placeholder="Email" value={formData.email} onChange={...} />
      <input placeholder="Mobile" value={formData.mobile} onChange={...} />
      
      <label>
        <input 
          type="checkbox" 
          checked={formData.isEmi}
          onChange={(e) => setFormData({...formData, isEmi: e.target.checked})}
        />
        Pay in EMI
      </label>
      
      {formData.isEmi && (
        <select 
          value={formData.emiDurationMonths}
          onChange={(e) => setFormData({...formData, emiDurationMonths: parseInt(e.target.value)})}
        >
          <option value={3}>3 Months</option>
          <option value={6}>6 Months</option>
          <option value={12}>12 Months</option>
        </select>
      )}
      
      <button onClick={handleBuy}>Buy Course</button>
    </form>
  );
};
```

---

### React Example - Smart Component (Auto-detect)

```javascript
const SmartPurchaseForm = ({ course }) => {
  const { user, isLoggedIn } = useAuth(); // Your auth context
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    isEmi: false,
    emiDurationMonths: 6
  });

  const handleBuy = async () => {
    const headers = {
      'Content-Type': 'application/json'
    };

    // ✅ Add token if logged in
    if (isLoggedIn) {
      headers['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
    }

    // ✅ Validate EMI selection
    if (formData.isEmi && !isLoggedIn) {
      alert('Please login to use EMI option');
      return;
    }

    const response = await fetch('http://localhost:5000/api/v1/course/buy', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        courseId: course._id,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        amount: course.sellingPrice,
        paymentMethod: 'UPI',
        isEmi: formData.isEmi,
        emiDurationMonths: formData.isEmi ? formData.emiDurationMonths : null
        // ✅ No userId - backend handles it
      })
    });

    const data = await response.json();
    
    if (data.success) {
      // Initialize Razorpay...
    } else {
      alert(data.message);
    }
  };

  return (
    <form>
      <input placeholder="Name" value={formData.name} onChange={...} />
      <input placeholder="Email" value={formData.email} onChange={...} />
      <input placeholder="Mobile" value={formData.mobile} onChange={...} />
      
      {isLoggedIn && (
        <label>
          <input 
            type="checkbox" 
            checked={formData.isEmi}
            onChange={(e) => setFormData({...formData, isEmi: e.target.checked})}
          />
          Pay in EMI
        </label>
      )}
      
      {formData.isEmi && (
        <select 
          value={formData.emiDurationMonths}
          onChange={(e) => setFormData({...formData, emiDurationMonths: parseInt(e.target.value)})}
        >
          <option value={3}>3 Months</option>
          <option value={6}>6 Months</option>
          <option value={12}>12 Months</option>
        </select>
      )}
      
      <button onClick={handleBuy}>
        {formData.isEmi ? 'Buy with EMI' : 'Buy Now'}
      </button>
    </form>
  );
};
```

---

## ✅ Summary

| Scenario | Token Required? | userId in Body? | How userId is Set? |
|----------|----------------|-----------------|-------------------|
| **Guest + Non-EMI** | ❌ No | ❌ No | `null` |
| **Registered + Non-EMI** | ⚠️ Optional | ❌ No | From token (if provided) |
| **Registered + EMI** | ✅ Yes | ❌ No | ✅ Auto from token |
| **Guest + EMI** | ❌ Not allowed | ❌ N/A | ❌ Error |

---

## 🔑 Key Benefits

1. ✅ **Security** - userId can't be faked (comes from verified token)
2. ✅ **Simplicity** - Frontend doesn't need to send userId
3. ✅ **Flexibility** - Guest users can still buy (non-EMI)
4. ✅ **Validation** - EMI automatically requires login

---

## 🎯 Request Body Comparison

### Old (Manual userId):
```json
{
  "courseId": "674d...",
  "userId": "674d9999888877776666",  // ❌ Manual
  "name": "Amit",
  "email": "amit@example.com",
  "mobile": "9988776655",
  "amount": 15000,
  "paymentMethod": "UPI",
  "isEmi": true,
  "emiDurationMonths": 6
}
```

### New (Auto userId):
```json
{
  "courseId": "674d...",
  // ✅ No userId field
  "name": "Amit",
  "email": "amit@example.com",
  "mobile": "9988776655",
  "amount": 15000,
  "paymentMethod": "UPI",
  "isEmi": true,
  "emiDurationMonths": 6
}
```
+ Header: `Authorization: Bearer TOKEN`

Done! 🚀
