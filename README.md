# THE DAILY SCROLL (TDS) Website

This is a full-stack blog website built with React for the frontend and Node.js for the backend. It allows users to view, add, edit, and delete blog posts. The backend API handles user authentication and CRUD operations, while the frontend provides a modern, responsive user interface.

## Features

- User authentication (Login, Registration)
- View blog posts
- Add new blog posts
- Edit existing blog posts
- Delete blog posts
- Responsive design
- Clean and user-friendly interface

## Technologies Used

### Frontend:
- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs.
- **React Router**: For handling navigation between pages.
- **Axios**: For making HTTP requests to the backend API.

### Backend:
- **Node.js**: A JavaScript runtime for building the backend API.
- **Express.js**: A minimal web framework for Node.js to build APIs.
- **MongoDB**: A NoSQL database for storing blog posts and user data.
- **JWT (JSON Web Tokens)**: For user authentication and authorization.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.

### Deployment:
- **Frontend**: Hosted on Vercel.
- **Backend**: Deployed on Vercel.

## Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/githubRahuld/The-Dailly-Scroll.git
   cd blog-website
   ```
### Backend Configuration
- Create a .env file in the backend directory with the following environment variables:

   - MONGODB_URI=mongodb://localhost:27017/blogdb
   - PORT=8000
   - CORS_ORIGIN=*
   - ACCESS_TOKEN_SECRET=
   - ACCESS_TOKEN_EXPIRY=
   - REFRESH_TOKEN_SECRET=
   - REFRESH_TOKEN_EXPIRY=
   - CLOUDINARY_CLOUD_NAME=
   - CLOUDINARY_API_KEY=
   - CLOUDINARY_API_SECRET=
  
### Frontend Configuration
- Create a .env file in the backend directory with the following environment variables:

  - VITE_API_BASE_URI=http://localhost:8000

### Snapshots of TDS
1. Home Page
![Screenshot 2024-12-20 165153](https://github.com/user-attachments/assets/c8c3c3a8-444a-4523-8bc2-f638bd094b3b)
   
2. Post page
![Screenshot 2024-12-20 165304](https://github.com/user-attachments/assets/ae2bcbf3-06e5-4274-a080-293f140935fc)

3. Create post page
![Screenshot 2024-12-20 165334](https://github.com/user-attachments/assets/bf0bccc9-8047-40c7-a3b2-cfed75c5032a)

4. Dashboard
![Screenshot 2024-12-20 165318](https://github.com/user-attachments/assets/a489300d-66af-48cb-9059-49771f876b7f)
