# ISRO Hackathon Project: Precision Agriculture Dashboard

This project provides an AI-driven dashboard for crop type classification, moisture stress detection, and irrigation recommendations based on multi-source satellite data fusion.

## Directory Structure
- `backend/`: FastAPI application integrating with Google Earth Engine (GEE) to run Machine Learning models (Random Forest) on real Sentinel-2 satellite data. Fallback mock data included.
- `frontend/`: React (Vite) application rendering the premium dark-themed interactive dashboard.

## Setup Instructions

### 1. Backend Setup
The backend requires Python 3.9+.
```bash
cd backend
pip install -r requirements.txt
earthengine authenticate
uvicorn main:app --reload --port 8000
```
The API will run at `http://localhost:8000`.

### 2. Frontend Setup
The frontend requires Node.js.
```bash
cd frontend
npm install
npm run dev
```
The frontend will start a local dev server (usually `http://localhost:5173`).

## Architecture
- **Backend**: Uses FastAPI for high-performance async endpoints. `gee_services.py` connects to the Google Earth Engine API, runs a Random Forest classifier on Harmonized Sentinel-2 imagery, and outputs the predictions as GeoJSON FeatureCollections for the map.
- **Frontend**: Built with React and pure CSS for a high-performance, tailored, dark-glassmorphism UI that visually maps the data onto interactive 3D-effect grids.
