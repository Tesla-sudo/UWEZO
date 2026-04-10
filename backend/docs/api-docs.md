# UWEZO API Documentation
**For Frontend & WhatsApp Integration Teams**

**Base URL:** `http://localhost:5000/api`  
**Production URL:** (to be added later)

**Authentication:** Most routes require JWT token in headers:
```http
Authorization: Bearer <token>

📋 Available Endpoints
1. User Management

Method,Endpoint,Description,Auth Required
POST,/users/register,Register new user,No
GET,/users/profile,Get user profile + reputation,Yes

Register User

POST {{base_url}}/users/register
{
  "phoneNumber": "254712345678",
  "name": "Amina Eldoret",
  "language": "swahili"
}

Response:

{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": { ...user object... }
}

2. Payments (M-PESA via PayHero)
Method,Endpoint,Description,Auth Required
POST,/payments/stk-push,Trigger M-PESA STK Push,Yes
POST,/payments/callback,PayHero webhook (backend only),No

Trigger STK Push
POST {{base_url}}/payments/stk-push
{
  "phoneNumber": "254712345678",
  "amount": 100,
  "userId": "67f8a1b2c3d4e5f6a7b8c9d0",
  "customerName": "Amina Eldoret"
}

Success Response

{
  "success": true,
  "message": "STK Push sent successfully. Check your phone for M-PESA prompt.",
  "data": { ...transaction... }
}

3. Investments

Method,Endpoint,Description,Auth Required
POST,/investments/practice,Start risk-free practice session,Yes
POST,/investments/record,Record successful investment,Yes
GET,/investments/history,Get investment history,Yes

practice simulator

POST {{base_url}}/investments/practice
{ "userId": "..." }

4. Broker Verification
Method,Endpoint,Description,Auth Required
GET,/brokers/verify/:licenseNumber,Verify CMA licensed broker,Yes

5. USSD (Feature Phone)
Method,Endpoint,Description
POST,/ussd/handle,Handle USSD menu requests