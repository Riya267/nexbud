# AI Web3 Assistant

Welcome to the AI Web3 Assistant project! This application is an intelligent assistant tailored to meet the needs of Web3 enthusiasts, developers, and users. It offers features such as wallet management, blockchain exploration, personalized support, and seamless integration with various blockchain services.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

The AI Web3 Assistant is built to help users navigate and interact with the Web3 ecosystem efficiently. It provides functionalities like managing wallets, exploring blockchain networks, and accessing personalized AI support for various tasks and queries related to Web3.

## Features

- **Authentication**: Secure user login with Google and email/password options.
- **Wallet Management**: Manage Ethereum and Solana wallets directly within the app.
- **Blockchain Exploration**: Explore different blockchains, check transactions, and more.
- **AI Assistant**: Provides personalized support and answers related to Web3 and blockchain.
- **User Profile**: Manage user profiles, including viewing and updating personal information.
- **Responsive UI**: User-friendly interface designed for both desktop and mobile devices.

## Technologies Used

- **React & Next.js**: Frontend framework for building the user interface.
- **TypeScript**: Enhances JavaScript by adding types for better code quality and maintainability.
- **Tailwind CSS**: A utility-first CSS framework for fast and responsive design.
- **NextAuth.js**: Authentication library for handling user login and sessions.
- **Prisma**: ORM for managing database schema and queries in a PostgreSQL database.
- **PostgreSQL**: Relational database to store user and application data.
- **bcrypt**: For secure password hashing and verification.
- **React Hook Form**: A library for managing form state and validation.
- **Third-Party APIs**: Integrated with various blockchain services to provide real-time data.

## Setup Instructions

### Prerequisites

- **Node.js** (version 14.x or higher)
- **npm** (Node Package Manager)
- **PostgreSQL** database
- **Google API Credentials** for Google OAuth
- **.env** file for environment variables

### Environment Variables

Create a `.env` file in the root of your project with the following variables:

```plaintext
DATABASE_URL=your_postgresql_database_url
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret

Replace the placeholder values with your actual credentials and secrets.

Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/ai-web3-assistant.git
cd ai-web3-assistant
Install Dependencies:

bash
Copy code
npm install
Set Up Prisma:

Initialize Prisma and apply migrations:

bash
Copy code
npx prisma migrate dev --name init
npx prisma generate
Run the Development Server:

bash
Copy code
npm run dev
The application will be available at http://localhost:3000.

Running the Project
Development:

To run the project in development mode, use:

bash
Copy code
npm run dev
Build for Production:

To build the project for production, use:

bash
Copy code
npm run build
Start Production Server:

To start the production server, use:

bash
Copy code
npm start
Project Structure
plaintext
Copy code
.
├── components          # React components for the UI
├── pages               # Next.js pages
│   ├── api             # API routes for authentication and other server-side logic
│   ├── login.tsx       # Login page
│   ├── register.tsx    # Registration page
│   ├── dashboard.tsx   # Protected dashboard page
├── prisma              # Prisma schema and migrations
├── public              # Static assets
├── styles              # Global and component-specific styles
├── utils               # Utility functions
├── .env                # Environment variables
├── next.config.js      # Next.js configuration
└── README.md           # Project documentation
Contributing
We welcome contributions to the AI Web3 Assistant project! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
Please ensure all pull requests follow the project's coding standards and include appropriate tests.

License
This project is licensed under the MIT License. See the LICENSE file for more information.