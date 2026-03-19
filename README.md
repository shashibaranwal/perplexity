# Perplexity - AI-Powered Search Engine

A full-stack, AI-powered search application that provides intelligent answers to user queries. Built with a modern tech stack featuring React, Express, MongoDB, and LangChain for seamless AI integration.

---

## 🚀 Project Overview

Perplexity is designed to provide users with a clean, intuitive interface for searching and interacting with AI. The application handles user authentication, maintains search history, and leverages Google's Generative AI via LangChain to provide comprehensive answers.

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Secure Registration & Login**: JWT-based authentication with password hashing using `bcrypt`.
- **Email Verification**: Integrated email verification flow using Nodemailer and Gmail OAuth2.
- **Protected Routes**: Middleware-enforced access to private user data and search features.
- **Session Management**: Secure cookie-based session handling.

### 🤖 AI-Powered Chat/Search
- **Intelligent Responses**: Leverages `@langchain/google-genai` for advanced natural language processing.
- **Context-Aware Interactions**: Support for multi-turn conversations (future-ready models).
- **Persistent Search History**: All chats and messages are stored in MongoDB for future reference.

### 💻 Modern User Interface
- **Responsive Design**: Built with Tailwind CSS for a premium, mobile-friendly experience.
- **Real-time Feedback**: Loading states, error handling, and smooth transitions.
- **Interactive Dashboard**: A dedicated space for users to manage their searches and profile.

---

## 🛠 Tech Stack

### Frontend
| Feature | Technology |
| --- | --- |
| **Framework** | React 19 (Vite) |
| **State Management** | Redux Toolkit |
| **Routing** | React Router 7 |
| **Styling** | Tailwind CSS 4 |
| **API Client** | Axios |

### Backend
| Feature | Technology |
| --- | --- |
| **Runtime** | Node.js (ES Modules) |
| **Framework** | Express 5 |
| **Database** | MongoDB & Mongoose |
| **AI Integration** | LangChain & Google GenAI |
| **Authentication** | JSON Web Tokens (JWT) |
| **Validation** | Express Validator |
| **Logging** | Morgan |

---

## 📂 Project Architecture

### Frontend Structure (`perplexity-FE`)
- **`src/app`**: Core application setup, including Redux store and routing configurations.
- **`src/features/auth`**: Authentication-specific components, hooks, and Redux slices.
- **`src/features/chat`**: Search and chat-related pages and logic.
- **`src/service`**: Centralized API service layer for backend communication.

### Backend Structure (`perplexity-BE`)
- **`src/controllers`**: Request handling logic for Auth and Search.
- **`src/models`**: Mongoose schemas for Users, Chats, and Messages.
- **`src/routes`**: API endpoint definitions.
- **`src/middlewares`**: Logic for authentication guards and error handling.
- **`src/services`**: External integrations (Email, AI).
- **`src/validators`**: Request payload validation rules.

---

## 📊 Data Models

### User
Stores account details, including verified status and hashed credentials.

### Chat
Represents a search session or conversation thread belonging to a specific user.

### Message
Contains individual interaction components (User query vs. AI response) within a specific chat.

---

## 🗺 Future Roadmap
- [ ] Integration with more LLM providers.
- [ ] Enhanced search citations and source linking.
- [ ] Dark/Light mode toggle enhancements.
- [ ] Real-time typing effects for AI responses.

---

## 📜 License
This project is licensed under the ISC License.
