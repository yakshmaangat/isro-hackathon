# ISRO Hackathon Project: Precision Agriculture Dashboard

This project provides an AI-driven dashboard for crop type classification, moisture stress detection, and irrigation recommendations based on multi-source satellite data fusion.

## Directory Structure
- `backend/`: FastAPI application simulating AI model endpoints and serving mock geo-data.
- `frontend/`: React (Vite) application rendering the premium dark-themed interactive dashboard.

## Setup Instructions

### 1. Backend Setup
The backend requires Python 3.9+.
```bash
cd backend
pip install -r requirements.txt
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
- **Backend**: Uses FastAPI for high-performance async endpoints. `mock_data.py` generates dynamic simulated outputs for the AI models, represented as GeoJSON grids.
- **Frontend**: Built with React and pure CSS for a high-performance, tailored, dark-glassmorphism UI that visually maps the data onto interactive 3D-effect grids.
