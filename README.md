# GeoJSON App

This project is a GeoJSON application with a backend built using Express.js and TypeScript, and a frontend built using React and TypeScript. The project ensures a clear separation of concerns and maintainability.

## Demo Link
https://maps-4265.vercel.app/

## Backend Setup
The backend is set up with Express.js and TypeScript. It provides API endpoints for fetching GeoJSON data.

### Structure
- /geojson-backend
  - /src
    - index.ts (main entry point)
  - /dist (compiled JavaScript files)
  - package.json
  - tsconfig.json
  - vercel.json

### Scripts
- "build": "tsc" (compiles TypeScript to JavaScript)
- "start": "node dist/index.js" (runs the compiled JavaScript)
- "dev": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts" (development mode with auto-reloading)

## Frontend Setup

The frontend is built with React and TypeScript, using PrimeReact for UI components.

### Structure
- /geojson-frontend
  - /src
    - /api
      - fetchLocations.ts (fetches locations from the backend)
    - /components
      - /DataTableComponent
        - DataTableComponent.tsx (main component)
        - RenderingComponents.tsx (helper components for rendering)
        - useDataService.ts (custom hook for data service)
      - /MapComponent
        - MapComponent.tsx (main component)
      - /LocationDetailsDialog
        - LocationDetailsDialog.tsx (main component)
    - /constants
      - mapboxAccessToken.ts (Mapbox access token)
    - /hooks
      - useAppLogic.ts (custom hook for app logic)
      - useMap.ts (custom hook for map logic)
      - useLocations.ts (custom hook for locations logic)
    - /interfaces
      - Header.ts (interface for header)
      - Location.ts (interface for location)
      - DataTable.ts (interface for DataTable)
      - LocationDetails.ts (interface for location details)
      - Map.ts (interface for map)
    - /utils
      - haversine.ts (Haversine formula utility)
      - mapUtils.ts (Map utilities)
    - App.tsx
    - index.tsx
  - public/
  - package.json
  - tsconfig.json

### Scripts
- "start": "react-scripts start" (starts the development server)
- "build": "react-scripts build" (builds the app for production)
- "serve": "serve -s build" (serves the production build)

## Running the App

### Using Docker
1. Build and run the containers:
`docker-compose -f docker-compose.dev.yml up --build`

`docker-compose -f docker-compose.prod.yml up --build`  //for production

2. Access the frontend at `http://localhost:3000`.
3. Access the backend at `http://localhost:3044`.

### Using Production Script
1. Install dependencies and build the project:
npm install
npm run build

2. Start the frontend and backend:
npm run start

3. Access the frontend at `http://localhost:3000`.
4. Access the backend at `http://localhost:3044`.

### Running Backend and Frontend Separately
1. Start the backend:
cd geojson-backend
npm install
npm start

2. Start the frontend:
cd geojson-frontend
npm install
npm start
1. Access the frontend at `http://localhost:3000`.
2. Access the backend at `http://localhost:3044`.

This project is designed to be easily deployable and maintainable with a clear separation between the backend and frontend.