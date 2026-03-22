<div align="center">
  <!-- <img src="C:/Users/shash/.gemini/antigravity/brain/fe87098c-485d-41b5-91de-8fd5146bfcd9/perplexity_logo_1774203915494.png" alt="Perplexity Logo" width="120" height="120" /> -->
  <h1>Perplexity</h1>
  <p><strong>A Premium AI-Powered Search Engine</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-19.1-blue?logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind-4.2-38B2AC?logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Express-5.2-lightgrey?logo=express" alt="Express" />
    <img src="https://img.shields.io/badge/MongoDB-9.3-47A248?logo=mongodb" alt="MongoDB" />
    <img src="https://img.shields.io/badge/AI-LangChain-orange" alt="LangChain" />
  </p>
</div>

---

## 🌟 Overview

**Perplexity** is a state-of-the-art, full-stack AI search application designed to provide intelligent, context-aware answers to complex queries. Built with the latest technologies like **React 19**, **Tailwind CSS 4**, and **Express 5**, it offers a seamless and responsive user experience while leveraging powerful LLMs via **LangChain**.

> [!IMPORTANT]
> This project uses **Gemini 2.5 Flash** for high-performance response generation and **Mistral Small** for intelligent chat title creation.

---

## ✨ Key Features

### 🔐 Advanced Authentication
- **Secure JWT Flow**: Bulletproof authentication using JSON Web Tokens and `bcrypt` hashing.
- **Email Verification**: Integrated Gmail OAuth2 flow with `nodemailer` for secure user onboarding.
- **Protected Ecosystem**: Fine-grained access control using custom Auth middleware and Express-validator.

### 🤖 Intelligent AI Engine
- **Powered by LangChain**: Orchestrates multi-model interactions seamlessly.
- **Dual-Model Logic**:
  - **Gemini 2.5 Flash**: Optimized for fast, accurate search results and conversation.
  - **Mistral Small**: Specially tuned for generating concise, relevant chat titles.
- **Persistent History**: Full conversation tracking with MongoDB, allowing users to revisit and continue past searches.

### 🚀 Real-time & Modern UI
- **Socket.io Integration**: Enabling real-time communication and future-ready streaming features.
- **Next-Gen CSS**: Styled with **Tailwind CSS 4**, featuring a modern "Glassmorphism" aesthetic and optimized layouts.
- **Responsive Dashboard**: A premium user interface that adapts perfectly to any device.

---

## 🛠 Tech Stack

### Frontend Architecture
- **Framework**: [React 19](https://react.dev/) (Vite-powered)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **API Communication**: [Axios](https://axios-http.com/)

### Backend Infrastructure
- **Runtime**: Node.js (ES Modules)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (ODM: Mongoose 9.3)
- **Real-time**: [Socket.io](https://socket.io/)
- **AI Integration**: [LangChain](https://js.langchain.com/)
- **Mailing**: [Nodemailer](https://nodemailer.com/)

---

## 📂 Project Structure

```bash
perplexity/
├── perplexity-BE/          # Express 5 Backend
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # AI & Mail integration
│   │   ├── sockets/        # Real-time logic
│   │   └── validators/     # Request validation
├── perplexity-FE/          # React 19 Frontend
│   ├── src/
│   │   ├── app/            # Store & Routing
│   │   ├── features/       # Modular features (Auth, Chat)
│   │   └── components/     # UI Building blocks
```

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local instance
- API Keys for Google Gemini and Mistral AI

### 2. Backend Setup
```bash
cd perplexity-BE
npm install

# Create a .env file with the following variables:
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_key
MISTRAL_API_KEY=your_mistral_key
GOOGLE_USER=your_email
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_REFRESH_TOKEN=your_token

npm run dev
```

### 3. Frontend Setup
```bash
cd perplexity-FE
npm install
npm run dev
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Register new user | No |
| `POST` | `/api/auth/login` | Login user | No |
| `POST` | `/api/chat/message` | Send query to AI | Yes |
| `GET` | `/api/chat/` | Fetch chat history | Yes |
| `DELETE` | `/api/chat/delete/:id` | Delete a chat | Yes |

---

## 🗺 Future Goals
- [ ] Support for local LLMs (Ollama integration).
- [ ] Real-time citations for AI answers.
- [ ] Collaborative shared chat links.
- [ ] Advanced file search & context upload.

---

## 📜 License
This project is licensed under the **ISC License**.
