# Recipe Finder App

A Next.js application to search and explore recipes using the Spoonacular API.

## Overview

This is a test assessment project built with Next.js, TypeScript, and Tailwind CSS. It allows users to search for recipes by query, cuisine, and maximum preparation time, view a list of recipes, and explore detailed information for each recipe.

## Features
- **Search Page**: Home page with a form to input recipe query, cuisine (Italian, Mexican, Chinese), and max preparation time. The "Next" button is enabled only when at least one field is filled.
- **Recipes Page**: Displays a list of recipes fetched via server-side rendering (SSR) with titles and images. Hovering over a recipe card zooms the image.
- **Recipe Details Page**: Shows recipe title, ingredients, and preparation time with a loading state handled by React `Suspense`.
- **Styling**: Minimalistic, modern design with Tailwind CSS, using light pastel colors.
- **Configuration**: Uses ESLint, Prettier, and environment variables for API key management.

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd recipe-finder-app

2. **Install dependencies**:
   npm install

3. **Add your Spoonacular API key to .env.local**:
    NEXT_PUBLIC_SPOONACULAR_API_KEY=your_api_key_here

4. **Run the development server**:
    npm run dev

5. **Open http://localhost:3000 in your browser.**

**Architecture**

Framework: Next.js 15 (App Router).
Data: Spoonacular API for recipe search and details.
Rendering: Server-side rendering (SSR) with 1-minute caching.
Styling: Tailwind CSS for responsive, modern UI.
Loading States: React Suspense for handling asynchronous data fetching.

**Running and Building**

Development: npm run dev
Build: npm run build
Production: npm run start
Linting: npm run lint
Formatting: npm run format

**Screenshots**
![Search Page](https://github.com/user-attachments/assets/6790e70b-24e8-4cfe-b839-2a65311c0a69)
![Recipes Page](https://github.com/user-attachments/assets/adee8c46-34ca-4cd2-97c3-ef7912ed6a4f)
![Recipe Details Page](https://github.com/user-attachments/assets/37f8f303-0770-4e55-8090-c14bfaee8146)

**Notes**
The project uses a simulated delay (500ms) in the Recipe Details Page to demonstrate Suspense.
