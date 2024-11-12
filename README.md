# **Teralink Generator**

### **Description**
**Teralink Generator** is a web application that allows users to generate direct download links from Terabox URLs. The application uses a backend API to convert Terabox sharing links into downloadable links and provides an easy-to-use frontend for users.

---

## **Table of Contents**
- [Description](#description)
- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)

---

## **Demo**
You can try out the live version of the application here:

[**https://rizkyngrh23.my.id/teralink-generator**](https://www.rizkyngrh23.my.id/)

---

## **Features**
- Generate direct download links from Terabox sharing URLs.
- Simple and responsive frontend interface.
- Clipboard support for copying the generated link.

---

## **Technologies Used**
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **API Fetching**: `node-fetch`
- **Hosting**: Vercel
- **DNS & SSL**: Cloudflare

---

## **Project Structure**
```
.
├── api
│   └── generate-link.js
├── LICENSE
├── package.json
├── package-lock.json
├── public
│   ├── index.html
│   ├── script.js
│   └── style.css
└── vercel.json
```

---

## **Installation**

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/rizkyngrh23/teralink-generator.git
cd teralink-generator
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Set Up Environment Variables**
Create a ``.env`` file in the root directory with the following content:
```bash
RAPIDAPI_KEY=your_rapidapi_key
PORT=3000
```

### **Step 4: Run the Application**
**Option 1: Using Node.js**
<br>
<br>
To run the backend server locally:

```bash
node api/generate-link.js
```
To serve the frontend:
```bash
npx http-server public
```

**Option 2: Using Docker Compose**
<br>
<br>
If you have Docker installed, you can run the entire application using Docker Compose:
```bash
docker-compose up -d
```

