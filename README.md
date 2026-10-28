# SocialMediaAppFrontend

A modern frontend for a social media application, built with **React and TypeScript**. The application communicates with an ASP.NET Core REST API for authentication, posts, and other social media functionality.

## Features

- User registration and login
- Authentication state management
- Automatic access-token handling
- Automatic token refresh
- Create and view posts
- Like and unlike posts
- Comment on posts
- User profiles and follow/unfollow
- User search with debounced requests
- Client-side routing
- REST API integration
- Responsive user interface

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Zustand** – state management
- **Axios** – HTTP client
- **React Router** – client-side routing

## Authentication

Authentication is handled through the backend's JWT-based authentication system.

The frontend manages authentication state using **Zustand** and persists tokens in `localStorage`. Tokens are attached to API requests via Axios interceptors, and expired access tokens are refreshed automatically using the refresh-token mechanism.

**Security note:** Storing tokens in `localStorage` is convenient for a learning project but is vulnerable to XSS attacks. In production, HTTP-only Secure SameSite cookies would be a safer alternative.

## Running the Application

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd <repository-directory>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the URL provided by Vite.

## Configuration

The frontend requires the URL of the backend API to be configured for local development.

Create the appropriate environment configuration before starting the application.

## Related Project

This frontend communicates with the corresponding ASP.NET Core backend:

**Social Media Backend:** `https://github.com/nitr80/SocialMediaAppBackend`

## Purpose

This project was developed as a personal project to gain practical experience with **React, TypeScript, state management, REST API integration, and authentication in a full-stack application**.