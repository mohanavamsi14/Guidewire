# 🛡️ GigShield AI 

> **"Protecting Every Hour You Work"**
> 
> *A Guidewire DEVTrails 2026 Hackathon Submission solving the critical problem of Income Protection for India's Gig Economy (Zomato, Swiggy, Zepto).*

---

## 🚀 The Problem & Our Solution
Platform-based delivery partners are the backbone of our digital economy but bear the total financial loss during **external disruptions** such as extreme weather, curfews, or severe pollution. 

**GigShield AI** is an intelligent, zero-friction parametric insurance platform explicitly designed for gig workers. We offer a weekly subscription model that covers "Loss of Income," using real-time API telemetry to automatically detect local disruptions and immediately credit the worker's unified payment interface (UPI), eliminating complex claims forms altogether.

---

## 🏆 Key Hackathon Features (Why this wins)

### 1. Zero-Touch Parametric Claims (Multi-Trigger Engine)
There are **zero manual claim forms**. GigShield actively pings `Open-Meteo` and environmental APIs using the worker's exact GPS geofence. If Rainfall exceeds `50mm/h` *or* the AQI breaches `300`, the AI automatically generates, verifies, and pays out the claim. 
* **Feature:** Real-time Algorithm Transparency box explaining *exactly* why the AI triggered the payout to build ultimate user trust.

### 2. Deep Client Integration for Delivery Riders (PWA)
* **🗣️ Voice Synthesis Alerts:** Utilizes the HTML5 `Web Speech API`. When an active disruption is solved and paid out, the browser literally *speaks* the confirmation to the rider so they don't have to look at their phone while driving.
* **🛜 Offline "Lite" Mode:** Built-in network listeners drop a prominent red banner if the rider loses cell-service, gracefully pausing telemetry until they reconnect.
* **🇮🇳 Instant Localization:** Context-level translations swapping the entire Dashboard framework securely between English, Hindi (HI), and Telugu (TE) at the tap of a button.

### 3. Adaptive Policy Recommendation Engine
Static insurance doesn't work for gig scales. GigShield features a dynamic sliding scale (Hours Worked / Day) and a **"Night Shift" toggler** that calculates live premiums.
* **AI Explainability:** A dedicated UI box that justifies the AI's "Standard Plan" recommendation by querying how many times it actually rained in their localized GPS zone the previous week.

### 4. Advanced Frontend Architecture & Fraud Guard
* **Mobile-First UX**: Responsive DOM shifts the Desktop Sidebar into a thumb-friendly sticky Bottom Navigation Bar on Mobile devices (replicating the UX of Paytm/PhonePe).
* **Live Fraud Indicators**: Explicit badges verifying "GPS Spoofing Passed" and calculating a 98% "Claim Confidence Score" based on device telemetry.

---

## 🛠️ Technology Stack
* **Core:** React 18, Vite (Fast HMR)
* **Routing & State:** `react-router-dom` v6, Custom React Context Providers
* **Data Visualization:** `recharts` for scalable SVG Weekly Earnings Protection trend graphs.
* **Styling:** Dynamic CSS Variables supporting Light/Dark Mode toggles and Glassmorphism aesthetics.
* **Icons & Notifications:** `lucide-react`, `sonner` (Toast Notifications)
* **External APIs:** Standard HTML5 Geolocation, BigDataCloud Reverse Geocoding, Open-Meteo Real-Time Weather

---

## 💻 Getting Started (Local Development)

### 1. Clone & Install
```bash
# Navigate to project directory
cd gig-insurance-web

# Install all NodeJS dependencies
npm install
```

### 2. Run the Development Server
```bash
# Start Vite development engine
npm run dev
```

### 3. Build for Production
```bash
# Compiles optimized HTML/CSS/JS minified chunks 
npm run build
```

---

## 📱 Testing Guide (For Judges)
1. **Onboarding Authentication (Mock):** Enter any Name & 10-digit number. Click "Get OTP". Enter ANY 4-digit numeric code to bypass.
2. **True Location API:** In Step 3, click *Auto-Detect Zone*. If you grant browser location permissions, it will reverse-geocode your real-world city and apply the Hackathon risk assessment block!
3. **Trigger the Voice Alerts:** Navigate to the **Claims** menu (shield icon). Click the `Run API Verification` or `Mock Trigger` button. **Ensure your volume is on!** Watch the radar spin and listen to the AI alert you of your claim status!
4. **Offline Tester:** Click the "Lost Connection?" link in the header. The application will freeze and notify the rider that network tracking is blind until resolved.
5. **Responsive Check:** Hit `F12` and swap to Mobile View layout. Observe the Navigation bar morph into a familiar thumb-nav at the bottom of the screen.

---
> 🌟 *Built for the Guidewire DEVTrails 2026 Hackathon.*  
