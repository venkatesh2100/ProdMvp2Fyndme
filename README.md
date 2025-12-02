

# **Fydme – Your All-in-One Portfolio Manager**

Fydme is a full-stack portfolio management platform.

- I update the recent code  with **MongoDB** as the database.
- It store  the  portfolio details,  daily/weekly metrics, and dynamically render data in graphs, numeric metrics, and more.
---

## **Features**

*  **Dynamic Graphs & Charts** for daily/weekly portfolio metrics.
*  **Real-Time Numeric Metrics** updating from the backend.
*  **MongoDB Database** integration for storing portfolio data.
*  **Full-Stack Next.js Approach** (API routes + frontend in one codebase).


---

## **Tech Stack**

* **Frontend & Backend:** [Next.js](https://nextjs.org/)
* **Database:** [MongoDB](https://www.mongodb.com/)
* **Styling:** Tailwind CSS
* **State Management:** React hooks/context
* **API:** Next.js API Routes

---

## **Getting Started**

### **1. Clone or Fork the Repository**

```bash
git clone https://github.com/venkatesh2100/findme.git
cd findme
git branch -a
git checkout develop
```

---

### **2. Install Dependencies**

```bash
npm install
```

---

### **3. Create Environment Variables**

Create a `.env` file in the root directory with the following:

```env
MONGO_URI=mongodb+srv://<username>:<password>@fydme.dkyjuay.mongodb.net/
MONGO_DB_NAME=fydme
```

**Note:** Replace `<username>` and `<password>` with your actual MongoDB credentials.

---

### **4. Run the Development Server**

```bash
npm run dev
```


---

### **5. Build for Production**

```bash
npm run build
npm start
```

---
Make sure to set the same environment variables (`MONGO_URI`, `MONGO_DB_NAME`) in your hosting provider.

---
