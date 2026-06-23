from fastapi import APIRouter
from models import FarmInfo, DashboardAnalysis
from mock_data import generate_grid_geojson
import datetime

router = APIRouter()

@router.get("/farm/{farm_id}", response_model=FarmInfo)
def get_farm_info(farm_id: str):
    return FarmInfo(
        farm_id=farm_id,
        date=datetime.datetime.now().strftime("%d %b %Y"),
        optical_image_status="Sentinel-2",
        microwave_image_status="Sentinel-1"
    )

@router.get("/analysis/dashboard/{farm_id}", response_model=DashboardAnalysis)
def get_dashboard_analysis(farm_id: str):
    # Simulate processing and return mock AI outputs
    return DashboardAnalysis(
        crop_type_accuracy=92.4,
        stress_index_range=[0, 1],
        irrigation_recommended_action="Irrigate in next 24-48 hours for Moderate to Severe Stress areas.",
        irrigation_depth_mm="25-35 mm",
        total_irrigation_volume_m3="18,650 m³",
        estimated_duration_hours="6 - 8 hours",
        water_balance=-12,
        crop_map=generate_grid_geojson("crop"),
        stress_map=generate_grid_geojson("stress"),
        growth_map=generate_grid_geojson("growth"),
        irrigation_map=generate_grid_geojson("irrigation")
    )
