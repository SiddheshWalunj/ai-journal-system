# ARCHITECTURE.md

## System Overview

The AI Journal System is a full-stack application that analyzes user journal entries using a Large Language Model (LLM) and stores structured insights.

The system consists of three layers:

    1. React Frontend
    2. Express Backend API
    3. SQLite Database

The backend integrates with the OpenAI API to perform emotional analysis of journal entries.

---

# System Architecture

```
User Browser
     │
     ▼
React Frontend
     │
     ▼
Express Backend API
     │
 ┌───┴───────────────┐
 │                   │
SQLite Database      NodeCache
 │                   │
 └──────► OpenAI LLM API
```

---

# Backend Architecture

The backend is built with **Node.js and Express**.

Responsibilities:

• Journal entry storage
• LLM analysis requests
• Insights generation
• Security middleware

Key middleware used:

* Helmet
* Express Rate Limit
* CORS
* JSON parser

---

# Database Design

SQLite is used for storing journal entries.

Table structure:

| Field     | Type     |
| --------- | -------- |
| id        | INTEGER  |
| userId    | TEXT     |
| text      | TEXT     |
| emotion   | TEXT     |
| ambience  | TEXT     |
| keywords  | TEXT     |
| summary   | TEXT     |
| createdAt | DATETIME |

Keywords are stored as JSON strings.

---

# API Design

Main endpoints:

```
POST /api/journal/analyze
POST /api/journal
GET  /api/journal/:userId
GET  /api/journal/insights/:userId
```

The API follows a REST-based architecture.

---

# LLM Integration

The system uses the **OpenAI GPT-4o-mini model** to analyze journal entries.

The prompt instructs the model to return structured JSON:

```
{
 "emotion": "",
 "keywords": [],
 "summary": "",
 "ambience": ""
}
```

This structured output allows easy parsing and storage.

---

# Caching Strategy

Repeated journal analysis is cached using **NodeCache**.

Flow:

```
Journal Entry
      │
Check Cache
   │      │
Hit      Miss
 │        │
Return   Call LLM
cache     │
           ▼
       Store result
```

Cache TTL is set to **3600 seconds (1 hour)**.

---

# 1️⃣ How would you scale this to 100k users?

Several architectural changes would allow scaling:

### Replace SQLite

Use scalable databases such as:

* PostgreSQL
* MongoDB
* Cloud managed databases

### Horizontal API scaling

Deploy multiple backend instances behind a load balancer.

```
Load Balancer
   │
 ┌─┼─┐
API API API
```

### Introduce Redis cache

Replace in-memory cache with Redis for distributed caching.

### Queue LLM tasks

Use background queues:

* BullMQ
* RabbitMQ
* Kafka

This prevents blocking API responses.

---

# 2️⃣ How would you reduce LLM cost?

Several strategies can reduce cost:

• Cache repeated analysis results
• Use smaller models when possible
• Reduce prompt size
• Limit response tokens
• Batch or async processing

Caching provides the biggest cost reduction.

---

# 3️⃣ How would you cache repeated analysis?

The current system uses **NodeCache**.

Example logic:

```
if(cache.has(text)){
   return cachedResult
}
```

Otherwise the system calls the LLM and stores the result in cache.

In production, Redis would replace NodeCache.

---

# 4️⃣ How would you protect sensitive journal data?

Journal entries contain private data, so security measures include:

### HTTPS

All communication should use TLS.

### Authentication

Users must authenticate before accessing journal entries.

### Authorization

Users should only access their own entries.

### Encryption

Sensitive data should be encrypted at rest.

### Secure environment variables

API keys are stored in `.env` files.

---

# Bonus Features Implemented

The project includes:

✔ LLM integration
✔ Caching using NodeCache
✔ Rate limiting
✔ Security middleware (Helmet)
✔ Structured API design

---

# Summary

This architecture supports:

• AI-powered journaling
• scalable backend design
• structured LLM integration
• insights generation

The system can evolve into a production-ready platform by replacing local services with distributed infrastructure.
