# Event Management Api
The Event Management System is a web application that provides API endpoints for managing events, user registration, login, and user profiles.

## Features

- User Registration: Users can register with their email and password.
- User Login: Users can login with their registered email and password to receive an authentication token.
- Create Event: Users can create new events by providing necessary information.
- Update Event: Users can update the details of existing events.
- Delete Event: Users can delete existing events.
- Get Event: Users can retrieve details of existing events by their ID.
- List Events: Users can retrieve a list of all existing events, with optional filtering by event date.
- Rsvp Event: Users can choose whether they are attending to an event or not.


## Installation and Configuration

1. Clone the repository
2. Install the dependencies: 
```sh
  npm install
```
3.Create a `.env` file in the project root directory.
4. Add the following environment variables to the `.env` file:
```sh
  NODE_ENV=development
  PORT=5000
  MONGO_URI=<your-mongodb-uri>
  JWT_SECRET=<your-jwt-secret>
```

## Usage

1. To run the application: 
```sh
  npm run server
```
2. To do the tests: 
```sh
  npm test
```

## Api Documentation
- [Click here](https://documenter.getpostman.com/view/26568026/2s93sW9vT9) for documentation of the api in postman (also a collection).

