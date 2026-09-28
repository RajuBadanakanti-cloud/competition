# Feedants Competition Module

## Overview

A full-stack competition management module built for the
Feedants Full Stack Development Internship technical assignment.

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

- Dynamic competition listing
- Competition details
- Competition lifecycle
- User registration
- Participant tracking
- Atomic registration handling
- Submission functionality
- Dynamic user participation state
- Validation and error handling

## Project Structure

frontend/
backend/

## Environment Variables

### Backend

MONGO_URI=your_mongodb_connection_string
PORT=5000

### Frontend

VITE_API_URL=your_backend_url

## Running Locally

### Backend

npm install
npm run dev

### Frontend

npm install
npm run dev

## Assumptions

- Competition creation is handled through the backend API.
- A demo user is used for the current assignment demonstration.
- Competition data is stored dynamically in MongoDB.

## Technical Decisions

- MongoDB was used for competition and participation data.
- Participation uses a unique user + competition relationship.
- Atomic database updates are used while registering participants
  to prevent exceeding the participant limit.

## Trade-offs

- Authentication is simplified for the assignment demonstration.
- Competition creation/admin functionality is not included in the
  competition details module.

## Future Improvements

- Production authentication and authorization
- Admin dashboard
- Competition creation UI
- Cloud file storage for submissions
- Improved monitoring and logging