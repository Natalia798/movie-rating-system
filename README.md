# Movie Rating System

## Overview

This project is a **Movie Rating System** that allows users to browse movies and TV shows, add favorites, rate content, and leave reviews. The project retrieves data from an external API (**TMDB**) and provides personalized recommendations based on user preferences and viewing history.

The system is built using **React.js**, styled with **CSS**, and manages user interactions through **localStorage** for authentication, favorites, watchlist, and reviews.

## Features Implemented

- **Responsive design** for both **mobile** and **desktop**
- **Cross-browser compatibility** (Chrome, Firefox, Safari, Edge)
- **Movie and TV show grid** populated with data from **TMDB API**
- **Pagination** for movies list
- **Genre filtering**
- **Search functionality**
- **Sort functionality**
- **Favorite movies/TV shows** feature
- **Watchlist** feature for planned movies/TV shows
- **Star rating system** to rate each movie/TV show
- **User reviews** (comments for movies/TV shows)
- **Trending now** section
- **Top rated** section
- **Recommended for You** section based on user's preferences
- **Recently Viewed** section based on viewing history
- **Social media sharing** (Facebook, Twitter, WhatsApp)
- **Basic authentication** (username & password stored in localStorage)

## Installation and Setup

### Prerequisites

Ensure you have **Node.js** and **npm** installed.

### Steps to Run Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/Natalia798/movie-rating-system.git
   cd movie-rating-system
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Open `http://localhost:3000` in a browser.

## API Key Configuration

This project uses the **TMDB API** to fetch movie and TV show data.  
To run the project, you need to configure your **API key**:

1. Sign up at [The Movie Database (TMDB)](https://www.themoviedb.org/) and get your API key.
2. Create a **`.env`** file in the root directory of the project.
3. Add the following line to your `.env` file:
   ```sh
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```
4. Restart the development server to apply the changes:
   ```sh
   npm start
   ```

---

## Deployment

The project is **deployed on Netlify**.

Live Demo: [https://movie-rating-system.netlify.app/](https://movie-rating-system.netlify.app/)

---

## Future Improvements

- 🔹 Implement **email-based authentication** with validation and secure password storage (instead of localStorage)
- 🔹 Use **a real database** instead of localStorage for user data
- 🔹 Improve mobile responsive design for a better user experience

---

### Author

👤 **Natalia Popa**  
📧 natalia98popa@gmail.com  
GitHub: [Natalia798](https://github.com/Natalia798)
