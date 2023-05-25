# Arithmetic Calculator Frontend

This is a Vue.js application that provides a calculator functionality and user authentication features. It allows users to perform various mathematical operations and manage their transactions.

## Live version
- [LIVE VERSION](http://ec2-18-219-245-237.us-east-2.compute.amazonaws.com:5173/login)

## Features

- Calculator: Perform basic mathematical operations such as addition, subtraction, multiplication, and division.
- User Authentication: Register and login to access the application.
- Secure Transactions: Users can perform mathematical calculations securely by authenticating their requests.
- Error Handling: Display appropriate error messages when inputs are invalid or operations fail.
- Hosting: Amazon EC2

## Technologies Used

- Vue.js: A JavaScript framework for building user interfaces.
- Vuex: A state management library for Vue.js applications.
- Vue Router: A routing library for Vue.js applications.
- Axios: A promise-based HTTP client for making API requests.
- Bootstrap: A popular CSS framework for styling the application.

## Setup and Usage

1. Clone the repository: `git clone https://github.com/luis-reyes/arithmetic-calculator-fe.git`
2. Navigate to the project directory: `cd vue-application`
3. Install dependencies: `npm install`
4. Start the development server: `npm run serve`


## Configuration

The application requires the following configuration:

- API Base URL: Update the `.env` file or `.env.local` file with the API base URL. Set `VITE_APP_API_BASE_URL` to the appropriate value.

## Folder Structure

- `src`: Contains the source code of the Vue application.
  - `components`: Contains Vue component files.
  - `store`: Contains Vuex store modules.
  - `router`: Contains Vue Router configuration.
  - `assets`: Contains static assets such as images and CSS files.

## Improvements

- Implement user profiles to allow users to update their information.
- Enhance the UI with more visually appealing styles and animations.
- Implement error logging and monitoring to track application errors and performance.
- Add unit tests and integration tests to ensure the reliability of the application.
- Optimize API requests by implementing caching mechanisms.
