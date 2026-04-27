Currently Phase 1 Complete — Core Plot Management System  
Phase 2 in Progress — Booking, Payments & Commission Engine

#  Avya CRM - Plot Management System

##  Features

###  Project Management
- Create & manage multiple projects
- Location, area, pricing, launch date

###  Plot Inventory
- Add plots with block, dimension, category
- Pricing (BSP + PLC)

###  Status Tracking
- Available / Hold / Booked / Sold Out
- Status history timeline

###  Filters
- Project
- Status
- Size range
- Price range
- Block code

###  Plot Grid View
- Visual map with color coding

###  Export
- Export plots to Excel

---

##  Tech Stack
- Frontend: React + Tailwind
- Backend: Node.js + Express
- DB: MySQL + Sequelize

---

##  Setup

```bash
npm install
npm run dev

##  Upcoming Features

### 👤 Customer & Booking Management
- Customer KYC (Aadhar, PAN, nominee, document upload)
- Plot booking with customer assignment
- Booking amount tracking
- Auto plot status update (Available → Booked → Sold)

###  Payment & Installment System
- Record installments (RTGS / NEFT / Cheque / Cash)
- Payment status (Received / Pending / Bounced)
- Balance tracking & auto-completion
- Monthly payment statements
- Booking receipt PDF generation

###  PLC & Discount Engine
- Category-based PLC charges
- Customer-level discount management
- Dynamic price recalculation

###  Commission & Payout System
- Multi-level income (Self, Level, Leadership, Royalty)
- Monthly bonus calculation
- Automated payout cycles
- TDS calculation (5% / 20% as per PAN rules)
- Payout statement & reports

###  Referral Network System
- Multi-level associate tree
- Downline tracking & performance stats
- Visual tree UI
- Network analytics dashboard

### 🛠 Admin Panel
- Full project & plot control
- Booking & payment management
- Associate management
- Commission configuration
- Audit logs (who did what)

###  Reports & Analytics
- Revenue dashboards
- Project-wise sales reports
- Associate performance tracking
- Excel exports

###  PDF & Communication
- Welcome letter generation
- Booking receipt PDF
- Payout statements
- TDS certificates
- SMS notifications (payment alerts, OTP, etc.)

### 🗺 Advanced UI Enhancements
- Interactive Plot Map (click → details popup)
- Real-time status updates
- Dashboard insights


##  Environment Variables (Backend)

Create a `.env` file inside the `/backend` folder and add:

```env
PORT=5000

JWT_SECRET=your_jwt_secret_here

DB_NAME=your_database_name
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=localhost
DB_DIALECT=mysql

NODE_ENV=development

# Email (SMTP)
SMTP_USER=your_email@example.com
SMTP_PASS=your_app_password

# Twilio (SMS)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
FROM_NUMBER=your_twilio_number

##  Project Structure
backend/
│
├── config/
│   └── database.js           # DB connection
│
├── controllers/
│   ├── plot.controller.js
│   ├── project.controller.js
│   └── associate.controller.js
│
├── models/
│   ├── PlotModel.js
│   ├── ProjectModel.js
│   ├── PlotHistoryModel.js
│   └── index.js              # Sequelize associations
│
├── routes/
│   ├── plot.route.js
│   ├── project.route.js
│   └── auth.route.js
│
├── middlewares/
│   ├── auth.js
│   ├── catchAsyncError.js
│   └── errorHandler.js
│
├── utils/
│   ├── sendEmail.js
│   ├── generateToken.js
│   └── sms.js
│
├── .env                      # Environment variables (not committed)
├── app.js                    # Express app
├── server.js / index.js      # Entry point
└── package.json



frontend/
│
├── src/
│   ├── api/
│   │   ├── axios.js
│   │   ├── plot.api.js
│   │   ├── project.api.js
│   │   └── auth.api.js
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectList.jsx
│   │   │   ├── CreateProject.jsx
│   │   │   └── EditProject.jsx
│   │   │
│   │   ├── plots/
│   │   │   ├── PlotList.jsx
│   │   │   ├── CreatePlot.jsx
│   │   │   ├── EditPlot.jsx
│   │   │   ├── PlotGrid.jsx
│   │   │   └── PlotHistoryTimeline.jsx
│   │   │
│   │   ├── associates/
│   │   │   ├── AssociateList.jsx
│   │   │   ├── CreateAssociate.jsx
│   │   │   └── EditAssociate.jsx
│   │   │
│   │   └── profile/
│   │       └── Profile.jsx
│   │
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── layout/
│   │   └── DashboardLayout.jsx
│   │
│   ├── hooks/
│   │   └── useAuth.js
│   │
│   ├── utils/
│   │   └── toast.js
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
└── vite.config.js


##  Architecture

- Modular backend (MVC pattern)
- RESTful API design
- Role-based access control
- Scalable folder structure
- Reusable frontend components