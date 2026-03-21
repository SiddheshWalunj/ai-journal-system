<<<<<<< HEAD
# 🌿 AI Journal System

AI Journal is a full-stack application that allows users to write journal entries and receive AI-powered emotional analysis and insights.

The system analyzes journal entries using an LLM and returns structured information such as:

* Emotion detection
* Keywords
* Entry summary
* Suggested ambience

The application also stores journal entries and generates insights based on past entries.

---

# 🚀 Features

• Write journal entries
• AI emotion analysis using OpenAI
• Extract keywords and summaries
• Save journal entries to database
• View previous journal entries
• Generate user insights from history
• Caching repeated AI analysis
• Rate limiting and security middleware

---

# 🏗 Tech Stack

## Frontend

* React
* Axios
* CSS

## Backend

* Node.js
* Express
* OpenAI API
* NodeCache (for caching)
* SQLite

---

# 📂 Project Structure

```
ai-journal-system
│
├── backend
│   ├── server.js
│   ├── db.js
│   ├── llm.js
│   ├── cache.js
│   ├── package.json
│   └── .env.example
│
├── frontend
│   ├── src
│   │   ├── App.js
│   │   ├── api.js
│   │   ├── App.css
│   │   └── index.js
│   │
│   └── package.json
│
├── README.md
└── ARCHITECTURE.md
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the repository

```
git clone https://github.com/SiddheshWalunj/ai-journal-system.git
cd ai-journal-system
```

---

# Backend Setup

```
cd backend
npm install
```

Create `.env`

```
OPENAI_API_KEY=your_openai_key
PORT=5000
```

Run backend

```
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

# Frontend Setup

```
cd frontend
npm install
```

Create `.env`

```
REACT_APP_API_URL=http://localhost:5000/api
```

Run frontend

```
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# 🔌 API Endpoints

### Analyze Journal Entry

```
POST /api/journal/analyze
```

Request

```
{
 "text": "Today I walked near the ocean and felt calm."
}
```

Response

```
{
 "emotion": "calm",
 "keywords": ["ocean","walk","relaxed"],
 "summary": "The writer felt relaxed while walking near the ocean.",
 "ambience": "ocean"
}
```

---

### Save Journal Entry

```
POST /api/journal
```

---

### Get User Entries

```
GET /api/journal/:userId
```

---

### Get User Insights

```
GET /api/journal/insights/:userId
```

---

# 🧠 AI Analysis

The system uses the **OpenAI GPT-4o-mini model** to analyze journal entries.

The model returns structured JSON containing:

* Emotion
* Keywords
* Summary
* Ambience suggestion

---

# ⚡ Caching

To reduce repeated LLM calls, analysis results are cached using **NodeCache**.

If the same journal entry text is analyzed again, the cached result is returned instead of calling the LLM.

Cache TTL: **1 hour**

---

# 🔐 Security

The backend includes several security protections:

• Helmet for HTTP security headers
• Express Rate Limiting
• Environment variable protection for API keys

---

# 📊 Insights

The system generates insights such as:

* Total journal entries
* Most frequent emotion
* Most used ambience
* Most common keywords

These insights help users understand emotional patterns.

---

# 📌 Future Improvements

Possible improvements include:

• Redis caching
• Authentication system
• Docker deployment
• Background queue for LLM tasks
• Real-time analytics dashboard

---

# 📄 License

MIT License
=======
# 🌿 AI Journal System

AI Journal is a full-stack application that allows users to write journal entries and receive AI-powered emotional analysis and insights.

The system analyzes journal entries using an LLM and returns structured information such as:

* Emotion detection
* Keywords
* Entry summary
* Suggested ambience

The application also stores journal entries and generates insights based on past entries.

---

# 🚀 Features

• Write journal entries
• AI emotion analysis using OpenAI
• Extract keywords and summaries
• Save journal entries to database
• View previous journal entries
• Generate user insights from history
• Caching repeated AI analysis
• Rate limiting and security middleware

---

# 🏗 Tech Stack

## Frontend

* React
* Axios
* CSS

## Backend

* Node.js
* Express
* OpenAI API
* NodeCache (for caching)
* SQLite

---

# 📂 Project Structure

```
ai-journal-system
│
├── backend
│   ├── server.js
│   ├── db.js
│   ├── llm.js
│   ├── cache.js
│   ├── package.json
│   └── .env.example
│
├── frontend
│   ├── src
│   │   ├── App.js
│   │   ├── api.js
│   │   ├── App.css
│   │   └── index.js
│   │
│   └── package.json
│
├── README.md
└── ARCHITECTURE.md
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the repository

```
git clone https://github.com/SiddheshWalunj/ai-journal-system.git
cd ai-journal-system
```

---

# Backend Setup

```
cd backend
npm install
```

Create `.env`

```
OPENAI_API_KEY=your_openai_key
PORT=5000
```

Run backend

```
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

# Frontend Setup

```
cd frontend
npm install
```

Create `.env`

```
REACT_APP_API_URL=http://localhost:5000/api
```

Run frontend

```
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# 🔌 API Endpoints

### Analyze Journal Entry

```
POST /api/journal/analyze
```

Request

```
{
 "text": "Today I walked near the ocean and felt calm."
}
```

Response

```
{
 "emotion": "calm",
 "keywords": ["ocean","walk","relaxed"],
 "summary": "The writer felt relaxed while walking near the ocean.",
 "ambience": "ocean"
}
```

---

### Save Journal Entry

```
POST /api/journal
```

---

### Get User Entries

```
GET /api/journal/:userId
```

---

### Get User Insights

```
GET /api/journal/insights/:userId
```

---

# 🧠 AI Analysis

The system uses the **OpenAI GPT-4o-mini model** to analyze journal entries.

The model returns structured JSON containing:

* Emotion
* Keywords
* Summary
* Ambience suggestion

---

# ⚡ Caching

To reduce repeated LLM calls, analysis results are cached using **NodeCache**.

If the same journal entry text is analyzed again, the cached result is returned instead of calling the LLM.

Cache TTL: **1 hour**

---

# 🔐 Security

The backend includes several security protections:

• Helmet for HTTP security headers
• Express Rate Limiting
• Environment variable protection for API keys

---

# 📊 Insights

The system generates insights such as:

* Total journal entries
* Most frequent emotion
* Most used ambience
* Most common keywords

These insights help users understand emotional patterns.

---

# 📌 Future Improvements

Possible improvements include:

• Redis caching
• Authentication system
• Docker deployment
• Background queue for LLM tasks
• Real-time analytics dashboard

---

# 📄 License

MIT License
>>>>>>> 82864438c9d7d33b4bac508629d7c9e945d7e060
