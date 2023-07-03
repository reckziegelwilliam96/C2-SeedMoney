# SeedMoney App Git Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Repository Structure](#repository-structure)
3. [Frontend](#frontend)
   - [Installation](#frontend-installation)
   - [Development](#frontend-development)
   - [Production Build](#frontend-production-build)
4. [Backend](#backend)
   - [Installation](#backend-installation)
   - [Development](#backend-development)
   - [API Documentation](#backend-api-documentation)
5. [Features](#features)
   - [Grant Directory](#feature-grant-directory)
   - [Grant Details](#feature-grant-details)
   - [Grant Application](#feature-grant-application)
   - [My Applications](#feature-my-applications)
   - [User Profile](#feature-user-profile)

## 1. Introduction <a name="introduction"></a>
SeedMoney is a web application designed to provide information about grants available for farmers and allow them to apply for grants online. The app consists of a frontend developed using React and a backend built with Node.js and Express.

The purpose of this documentation is to provide instructions on setting up the development environment, running the application, and understanding its features.

## 2. Repository Structure <a name="repository-structure"></a>
The SeedMoney app repository follows a typical structure for a full-stack web application. The main folders and files include:
- `frontend/`: Contains the frontend codebase.
- `backend/`: Contains the backend codebase.
- `docs/`: Documentation folder (including this Git documentation).
- `README.md`: Overview and getting started instructions.

## 3. Frontend <a name="frontend"></a>
The frontend of the SeedMoney app is developed using React, JavaScript, and various frontend libraries. It provides the user interface for interacting with the application.

### 3.1 Installation <a name="frontend-installation"></a>
To set up the frontend development environment, follow these steps:
1. Clone the repository: `git clone <repository-url>`.
2. Navigate to the `frontend/` directory: `cd frontend`.
3. Install the dependencies: `npm install`.

### 3.2 Development <a name="frontend-development"></a>
To run the frontend in development mode, follow these steps:
1. Navigate to the `frontend/` directory: `cd frontend`.
2. Start the development server: `npm start`.
3. Access the application in a web browser at `http://localhost:3000`.

### 3.3 Production Build <a name="frontend-production-build"></a>
To create a production build of the frontend, follow these steps:
1. Navigate to the `frontend/` directory: `cd frontend`.
2. Build the application: `npm run build`.
3. The production-ready files will be generated in the `frontend/build/` directory.

## 4. Backend <a name="backend"></a>
The backend of the SeedMoney app is built using Node.js, Express, and MongoDB. It provides the API endpoints for data retrieval and manipulation.

### 4.1 Installation <a name="backend-installation"></a>
To set up the backend development environment, follow these steps:
1. Clone the repository: `git clone <repository-url>`.
2. Navigate to the `backend/` directory: `cd backend`.
3. Install the dependencies: `npm install`.

### 4.2 Development <a name="backend-development"></a>
To run the backend server in development mode, follow these steps:
1. Navigate

 to the `backend/` directory: `cd backend`.
2. Start the development server: `npm start`.
3. The backend server will be running on `http://localhost:8000`.

### 4.3 API Documentation <a name="backend-api-documentation"></a>
The backend API of the SeedMoney app follows RESTful principles and provides the following endpoints:

- `GET /api/grants`: Retrieves a list of grants.
- `GET /api/grants/:id`: Retrieves detailed information about a specific grant.
- `GET /api/users/:id`: Retrieves user details.
- `GET /api/users/:id/farms`: Retrieves a list of farms associated with a user.
- `GET /api/users/:id/businesses`: Retrieves a list of businesses associated with a user.
- `GET /api/users/:id/applications`: Retrieves a list of applications submitted by a user.
- `POST /api/applications`: Creates a new application.
- `PUT /api/applications/:id`: Updates an existing application.
- `DELETE /api/applications/:id`: Deletes an application.

## 5. Features <a name="features"></a>
The SeedMoney app includes the following key features:

### 5.1 Grant Directory <a name="feature-grant-directory"></a>
The Grant Directory provides a list of available grants. Users can browse through the grants and view their details.

### 5.2 Grant Details <a name="feature-grant-details"></a>
The Grant Details page displays detailed information about a specific grant, including its name, description, eligibility criteria, use of funds, and contact information. Users can also navigate to the grant application form from this page.

### 5.3 Grant Application <a name="feature-grant-application"></a>
The Grant Application feature allows users to apply for a grant by filling out a form. The form collects information such as farm details, crops grown, animals raised, and a brief description of the application proposal. Upon submission, the application is saved and associated with the user.

### 5.4 My Applications <a name="feature-my-applications"></a>
The My Applications page displays a list of applications submitted by the user. Each application is represented with summary information, such as the grant name, application status, and submission date. Users can click on an application to view its detailed information.

### 5.5 User Profile <a name="feature-user-profile"></a>
The User Profile feature provides information about the user, including their name and email address. It also displays additional details such as user-associated farms and businesses.

This concludes the Git documentation for the SeedMoney app. The provided instructions should guide you in setting up the development environment, running the application, and understanding its features.

## API: 
### web scraper class in backend *directory scraper*, titled scraper for programs and grants