# Quorum Coding Challenge - UI

This project is the frontend UI for the Quorum Coding Challenge.
Tech Stack: React, React Query, Vite, TypeScript, MantineUI.

It allows users to view information about US bills and legislators, including vote summaries and legislator voting activity.

## Prerequisites

*   Node.js v22.14
*   npm 
*   The backend API project (`quorum-coding-challenge-api`) must be running.

## Backend API Setup

This frontend requires the companion backend API (`quorum-coding-challenge-api`) to be running locally (typically on `http://127.0.0.1:5000`).

Please refer to the `README.md` file within the `quorum-coding-challenge-api` directory for instructions on how to set up and run the backend server.

## Frontend Setup

1.  **Navigate to the project directory**:
    ```bash
    cd quorum-coding-challenge-ui
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Running the Project

1.  **Ensure the backend API is running** (see Backend API Setup folder).
2.  **Start the frontend development server**:
    ```bash
    npm run dev
    ```
3.  Open your web browser and navigate to the local URL provided by Vite (usually `http://localhost:5173` or similar).

## Project Structure Highlights

*   `src/`
    *   `components/`: Reusable UI components.
        *   `common/`: General-purpose shared components.
        *   `Bills/`, `LandingPage/`, `Header/`: Feature-specific components.
    *   `hooks/`: Custom React Query hooks for data fetching logic.
    *   `pages/`: Top-level components corresponding to application routes.
    *   `services/`: API interaction logic (fetch functions).
    *   `types/`: TypeScript type definitions (especially for API data).
    *   `main.tsx`: Application entry point, providers setup (React Router, Mantine, React Query).
    *   `App.tsx`: Main application shell and routing setup.

