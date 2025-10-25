Project Overview

This project demonstrates how to integrate Facebook OAuth 2.0 authentication in a full-stack application.
Users can connect their Facebook pages securely, and the system stores their access tokens and profile details in a PostgreSQL database for later use (like page analytics or post automation).

The project includes:

A React frontend for user interaction.

A Node.js + Express backend that handles Facebook OAuth flow.

A PostgreSQL database for storing user and token information.

Key Features

Secure Facebook OAuth 2.0 flow
Token storage in PostgreSQL with automatic table setup
Modular backend using Express routes and controllers
Simple, user-friendly frontend with React + Axios
Scalable codebase with environment-based configuration

Tech Stack

Frontend: React, Axios, TailwindCSS
Backend: Node.js, Express.js
Database: PostgreSQL (via pg library)
Environment Management: dotenv
UUID Generation: uuid
HTTP Requests: axios

Folder Structure
project-root/
│
├── backend/
│   ├── controllers/
│   │   └── facebookController.js
│   ├── db/
│   │   └── connect.js
│   ├── routes/
│   │   └── facebookRoutes.js
│   ├── server.js
│   ├── .env
│
├── frontend/
│   ├── src/
│   │   └── FacebookConnect.jsx
│   ├── package.json
│
└── README.md

OAuth 2.0 Flow Explained
Step	Action	Description
1	User clicks “Connect”	React frontend sends a POST request to /api/facebook/connect.
2	Redirect to Facebook	Backend returns Facebook’s OAuth URL.
3	User authorizes app	Facebook prompts the user to log in and approve permissions.
4	Callback with code	Facebook redirects to backend with a temporary code.
5	Exchange code for token	Backend exchanges the code for an access token via Graph API.
6	Store in DB	Token and user details are securely stored in PostgreSQL.

Environment Setup

Create a .env file inside the backend folder with the following content:

FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
FACEBOOK_REDIRECT_URI=http://localhost:5000/api/facebook/callback

PG_USER=postgres
PG_PASSWORD=yourpassword
PG_HOST=localhost
PG_DATABASE=facebook_integration
PG_PORT=5432/5433

How to Run the Project 

1️ Backend Setup
cd facebook-integration-backend
node server.js

Your backend will run on: http://localhost:5000

2️ Frontend Setup
cd facebook-integration-frontend
npm install
npm run dev

🗄️ Database Schema

Table: integrations

Column Name	Type	Description
id	SERIAL	Auto-incremented primary key
integration_id	UUID	Unique identifier for each integration record
page_url	TEXT	Facebook Page URL
user_id	TEXT	Facebook user ID
first_name	TEXT	User’s first name
last_name	TEXT	User’s last name
email	TEXT	User’s email (may be unavailable in dev mode)
access_token	TEXT	Facebook OAuth access token
refresh_token	TEXT	Reserved for future use
token_expires_at	TIMESTAMP	Access token expiration time
created_at	TIMESTAMP	Record creation timestamp (default current time)
