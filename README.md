<h1 align="center">Welcome to @NexBud 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

Welcome to the NexBud! This application is an intelligent assistant tailored to meet the needs of Web3 enthusiasts, developers, and users. It offers features such as wallet management, blockchain exploration, personalized support, and seamless integration with various blockchain services. (currently solana)

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

    ```
    DATABASE_URL=your_postgresql_database_url
    CLIENT_ID=your_google_client_id
    CLIENT_SECRET=your_google_client_secret
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=""
    NEXT_PUBLIC_RESEND_API_KEY=""
    ```

Replace the placeholder values with your actual credentials and secrets.

Installation
Clone the Repository:

    ```
    git clone https://github.com/yourusername/ai-web3-assistant.git
    cd ai-web3-assistant
    ```

Install Dependencies:

    ```
    npm install
    ```

Run the Development Server:

    ```
    npm run dev
    ```

The application will be available at http://localhost:3000.

### Contributing
We welcome contributions to the @NexBud! To contribute:

## Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
Please ensure all pull requests follow the project's coding standards and include appropriate tests.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.