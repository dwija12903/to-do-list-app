# 📝 To-Do List App

## 🎯 Overview
The **To-Do List App** is a full-stack application designed to help users manage their tasks effectively. With a user-friendly interface, users can create, update, delete, and filter tasks while keeping track of their priorities and due dates.

---

## 🚀 Features
- **User Authentication**: Secure login and registration using JWT tokens. 🔒
- **Task Management**: Add, edit, delete, and toggle the completion status of tasks. ✅
- **Priority Levels**: Assign tasks a priority (low, medium, high) to manage workload effectively. 📊
- **Due Dates**: Set and track due dates for your tasks. 📅
- **Search and Filter**: Quickly find tasks with a search bar and filter by completion status. 🔍

---

## 📦 Tech Stack
- **Frontend**: 
  - **React**: A JavaScript library for building user interfaces.
  - **Tailwind CSS**: A utility-first CSS framework for styling components.
  - **Axios**: A promise-based HTTP client for making requests to the backend.
  
- **Backend**: 
  - **Node.js**: JavaScript runtime for server-side programming.
  - **Express.js**: A web application framework for Node.js.
  - **MongoDB**: NoSQL database for storing user and task data.
  - **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
  - **JWT (JSON Web Tokens)**: For secure user authentication.
  
- **Development Tools**: 
  - **Visual Studio Code**: Code editor for development.
  - **Postman**: API testing tool for checking endpoints.
  - **dotenv**: For managing environment variables.

---

## 🛠 Installation

### Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Clone the repository
1. Open your terminal and run:
    ```bash
    git clone https://github.com/dwija12903/to-do-list-app.git
    cd todo-list-app
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the React app:
    ```bash
    npm start
    ```

### Backend Setup
1. Navigate to the backend directory:
    ```bash
    cd server
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the server directory with the following variables:
    ```
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT = 5000
    ```
4. Start the Express server:
    ```bash
    npm start
    ```

---

## 🌟 Usage
1. Register a new account or log in if you already have one.
2. Manage your tasks by adding, editing, or deleting them.
3. Use the search bar to quickly find tasks.

---

## 🛠 Challenges and Decisions Made During Development

- **Authentication**: Implementing JWT for user authentication required careful handling of token storage and management. I opted to use local storage to keep it simple, but this decision brought up considerations around token expiration and security.
  
- **State Management**: Initially, I considered using Redux for state management but decided to keep the implementation simple with React’s built-in state. This helped reduce complexity and made the app easier to maintain.

- **Responsive Design**: Ensuring that the app was responsive across different devices posed a challenge. I used Tailwind CSS to implement a fluid design, which streamlined the styling process and improved responsiveness.

- **Error Handling**: Implementing comprehensive error handling for both frontend and backend required thorough testing to ensure users received clear feedback during login, task creation, and other operations.

---

## 🐛 Contributing
Contributions are welcome! Please create a pull request or open an issue to discuss changes.

---

## 📝 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📫 Contact
Feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/dwijapanchal) or via email at [dwija1209@gmail.com].

---

Thank you for checking out my project! 😊
