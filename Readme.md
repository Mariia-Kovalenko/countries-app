# Country Information Project 🌍

## Description
This project is a full-stack application designed to provide detailed information about countries. Users can view country details, including their flags, population data over time, and neighboring countries. The application leverages a backend API built with NestJS and a frontend developed in React with TailwindCSS.



## Project Structure
The project is divided into two main parts:
1. **Backend**: Built with NestJS, it handles API requests and fetches data from external sources.
2. **Frontend**: Built with React 18 and styled using TailwindCSS, it provides a clean and responsive user interface for exploring country details.



## Backend
The backend is developed using [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. 

### Features:
- Handles API requests to fetch country data.
- Aggregates information from multiple external APIs.

### External APIs Used:
1. **Nager API**: Provides available countries and country-specific information.
2. **CountriesNow API**:
    `/flag/images` for fetching country flags.
    `/population` for fetching population data.

### API Endpoints:
Here is the list of backend endpoints and their purposes:

1. **`GET /countries`**
   - Fetches the list of all available countries.
   - Returns country names, and if possible, appends flags to each country.

2. **`GET /countries/:countryCode`**
    Fetches detailed information about a specific country identified by its `countryCode`.
    
    Returns:
     - Official name.
     - Common name.
     - Flag URL.
     - Population counts over time.
     - Border countries (if any).
3. **`GET /api`**
    - View Backend Swagger file to test endpoints

### Scripts:
 **Development Mode**: `npm run start:dev` (watches for changes).

 **Production Mode**: `npm run start`.

 **Build**: `npm run build`.

The backend runs on **port 8080** by default, and environment variables are stored in the `.env` file located in the backend folder.



## Frontend
The frontend is developed using [React 18](https://reactjs.org/) and styled with [TailwindCSS](https://tailwindcss.com/). It provides a clean and interactive UI for exploring country data.

### Features:
 **Country List**: Displays a list of available countries.

 **Country Details Page**:
  - Country Name and Flag.
  - Border Countries (clickable to view their details).
  - Population Chart (using Chart.js).
  
### Libraries Used:
 **React Chart.js 2**: For rendering interactive population charts.

 **React Router**: For navigation between country details and the country list.

### Scripts:
 **Start Development Server**: `npm start`.

 **Install Dependencies**: `npm install`.

The frontend runs on **port 3000** by default, and environment variables are stored in the `.env` file located in the frontend folder.

---

## Getting Started
### Prerequisites
- Node.js >= 14.x
- npm >= 6.x

### Installation and Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the backend folder:
    ```bash
    cd backend/
    npm install
    ```
3. Start the backend server in development mode:
    ```bash
    npm run start
    ```
    or to watch for changes use
    ```bash
    npm run start:dev
    ```
4. In a new terminal, navigate to the frontend folder:
    ```bash
    cd frontend/
    npm install
    ```
5. Start the frontend development server:
    ```bash
    npm start
    ```

## Ports

- **Backend**: The backend server runs on [http://localhost:8080](http://localhost:8080).
- **Frontend**: The frontend development server runs on [http://localhost:3000](http://localhost:3000).