# EmployWise User Management App

## Overview
This is a React application for user management using the Reqres API. The app provides authentication, user listing, editing, and deletion functionality.

## Features
- User Authentication
- Paginated User List
- User Edit Functionality
- User Deletion
- Responsive Design

## Prerequisites
- Node.js (v14 or later)
- npm or yarn

## Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies
```bash
npm install
```

## Running the Application
```bash
npm start
```

## Login Credentials
- Email: eve.holt@reqres.in
- Password: cityslicka

## Project Structure
- `src/components/`: React components
- `src/services/`: API service functions
- `src/context/`: Authentication context
- `src/App.js`: Main application component

## Technologies Used
- React
- React Router
- Axios
- Local Storage for Token Management

## API Endpoints Used
- POST /api/login
- GET /api/users
- PUT /api/users/{id}
- DELETE /api/users/{id}

## Bonus Features
- Responsive Design
- Client-side Pagination
- Protected Routes
- Error Handling

## Notes
- Token is stored in Local Storage
- Unauthorized users are redirected to the login page

## Website
https://employwiseassignmentlovish.netlify.app/
```
