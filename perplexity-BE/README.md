# Perplexity Backend

A RESTful backend API for **Perplexity** — an AI-powered chat application. Built with **Express.js**, **MongoDB**, and **JWT** authentication, featuring email verification via Gmail OAuth2.

---

## Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Runtime        | Node.js (ES Modules)              |
| Framework      | Express 5                         |
| Database       | MongoDB via Mongoose              |
| Authentication | JSON Web Tokens (jsonwebtoken)    |
| Validation     | express-validator                 |
| Email          | Nodemailer (Gmail OAuth2)         |
| Password Hash  | bcrypt                            |

---

## Project Structure

```
perplexity-BE/
├── server.js                    # Entry point — starts the server & connects to DB
├── package.json
├── .env                         # Environment variables (not committed)
└── src/
    ├── app.js                   # Express app setup & middleware
    ├── config/
    │   └── database.js          # MongoDB connection via Mongoose
    ├── controllers/
    │   └── auth.controller.js   # Registration logic & email verification
    ├── models/
    │   ├── user.model.js        # User schema (username, email, password, verified)
    │   ├── chat.model.js        # Chat schema (user ref, title)
    │   └── message.model.js     # Message schema (chat ref, content, role)
    ├── routes/
    │   └── auth.routes.js       # Auth route definitions
    ├── services/
    │   └── mail.service.js      # Email transport via Nodemailer
    └── validators/
        └── auth.validator.js    # Request body validation for registration
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Gmail account** with OAuth2 credentials for email service

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd perplexity-BE

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
PORT=3000

MONGO_URI=<your-mongodb-connection-string>

GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<your-google-oauth-client-secret>
GOOGLE_REFRESH_TOKEN=<your-google-oauth-refresh-token>
GOOGLE_USER=<your-gmail-address>

JWT_SECRET=<your-jwt-secret>
```

### Run the Server

```bash
# Development (with auto-reload via nodemon)
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

---

## API Endpoints

### Health Check

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| GET    | `/`      | Returns a health check response |

### Authentication

| Method | Endpoint              | Description            | Request Body                          |
| ------ | --------------------- | ---------------------- | ------------------------------------- |
| POST   | `/api/auth/register`  | Register a new user    | `{ username, email, password }`       |

#### Register — `POST /api/auth/register`

**Validation Rules:**
- `username` — required, 3–20 characters, alphanumeric and underscores only
- `email` — required, valid email format
- `password` — required, minimum 6 characters

**Success Response (201):**
```json
{
  "message": "user registered successfully",
  "success": true,
  "user": {
    "id": "...",
    "username": "...",
    "email": "..."
  }
}
```

**Error Response (400) — User already exists:**
```json
{
  "message": "Username or email is already taken",
  "success": false,
  "err": "User already exists."
}
```

On successful registration, a **verification email** is sent to the user's email address.

---

## Data Models

### User
| Field      | Type    | Details                                  |
| ---------- | ------- | ---------------------------------------- |
| username   | String  | Unique, required, trimmed                |
| email      | String  | Unique, required, stored lowercase       |
| password   | String  | Required, min 6 chars, hashed with bcrypt|
| verified   | Boolean | Default `false`                          |

### Chat
| Field | Type     | Details                     |
| ----- | -------- | --------------------------- |
| user  | ObjectId | Reference to `User`         |
| title | String   | Required, trimmed           |

### Message
| Field   | Type     | Details                          |
| ------- | -------- | -------------------------------- |
| chat    | ObjectId | Reference to `Chat`              |
| content | String   | Required                         |
| role    | String   | Enum: `user`, `AI`               |

All models include automatic `createdAt` and `updatedAt` timestamps.

---

## License

ISC
