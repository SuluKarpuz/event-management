# Event Management Api
The Event Management System is a web application that provides API endpoints for managing events, user registration, login, and user profiles.

## Features

- User Registration: Users can register with their email and password.
- User Login: Users can login with their registered email and password to receive an authentication token.
- User Logout: Users can logout and clear the authentication token.
- Get Profile: Users can get information about their profile. 
- Update Profile: Users can update their profile.
- Create Event: Users can create new events by providing necessary information.
- Update Event: Users can update the details of existing events.
- Delete Event: Users can delete existing events.
- Get Event: Users can retrieve details of existing events by their ID.
- List Events: Users can retrieve a list of all existing events, with optional filtering by event date.
- Rsvp Event: Users can choose whether they are attending to an event or not.


## Api Documentation
- [Click here](https://documenter.getpostman.com/view/26568026/2s93sW9vT9) for documentation of the api in postman (also a collection).

## Additional Information
I used Node.js and Express to build REST APIs, MongoDB for the database, Joi for data validation, JWT for user authentication, bcrypt for password security, Mongoose for database connection, and implemented rate limiting to prevent abuse of the APIs. Additionally, I added an RSVP (Responding to Event) feature, allowing users to indicate their attendance or interest in events. This feature enhances the usability and functionality of the event management system. Postman was used for API testing throughout the development process. 



## Installation and Configuration

1. Clone the repository
2. Install the dependencies: 
```sh
  npm install
```
3.Create a `.env` file in the project root directory and add the following environment variables to the `.env` file:
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
