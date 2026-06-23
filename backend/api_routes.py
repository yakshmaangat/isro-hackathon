from fastapi import APIRouter, Query
from models import FarmInfo, DashboardAnalysis, DistrictSummary, ModelExplainability, FarmerAdvisory, FeatureImportance
from mock_data import generate_grid_geojson
import datetime

router = APIRouter()

@router.get("/farm/{farm_id}", response_model=FarmInfo)
def get_farm_info(farm_id: str):
    return FarmInfo(
        farm_id=farm_id,
        date=datetime.datetime.now().strftime("%d %b %Y"),
        optical_image_status="Sentinel-2 (Cloudy)",
        microwave_image_status="Sentinel-1 (Clear)",
        nisar_image_status="NISAR (Simulated - L & S Band)"
    )

@router.get("/analysis/dashboard/{farm_id}", response_model=DashboardAnalysis)
def get_dashboard_analysis(farm_id: str, date_idx: int = Query(4, ge=0, le=4)):
    """
    date_idx: 0 to 4, where 0 is 4 weeks ago, 4 is current. Used for timeline scrubber.
    """
    return DashboardAnalysis(
        crop_type_accuracy=94.2,
        stress_index_range=[0, 1],
        irrigation_recommended_action="Irrigate in next 24 hours. Critical phenological stage (Cotton - Reproductive) detected.",
        irrigation_depth_mm="35-45 mm",
        total_irrigation_volume_m3="22,400 m³",
        estimated_duration_hours="8 - 10 hours",
        water_balance=-18 + (date_idx * 2), # Dynamic based on date
        crop_map=generate_grid_geojson("crop", date_idx),
        confidence_map=generate_grid_geojson("confidence", date_idx),
        stress_map=generate_grid_geojson("stress", date_idx),
        growth_map=generate_grid_geojson("growth", date_idx),
        irrigation_map=generate_grid_geojson("irrigation", date_idx),
        cloudy_optical_map=generate_grid_geojson("cloudy_optical", date_idx)
    )

@router.get("/analysis/district", response_model=DistrictSummary)
def get_district_summary():
    return DistrictSummary(
        district_name="Ahmedabad District",
        total_area_ha=145000,
        severe_stress_ha=12400,
        water_deficit_m3=8500000,
        prioritized_interventions=["Sanand Block (High Priority)", "Dholka Block", "Bavla Block"]
    )

@router.get("/analysis/explainability", response_model=ModelExplainability)
def get_explainability():
    return ModelExplainability(
        features=[
            FeatureImportance(feature="SAR VH Backscatter", importance=0.35),
            FeatureImportance(feature="NDVI (Optical)", importance=0.25),
            FeatureImportance(feature="NDWI (Moisture)", importance=0.20),
            FeatureImportance(feature="SAR VV/VH Ratio", importance=0.15),
            FeatureImportance(feature="Thermal (LST)", importance=0.05),
        ]
    )

@router.get("/advisory/{farm_id}", response_model=FarmerAdvisory)
def get_advisory(farm_id: str):
    return FarmerAdvisory(
        sms_hindi="किसान भाई, आपके कपास के खेत में नमी की भारी कमी (Severe Stress) है। फसल अभी फूल आने (Reproductive) की अवस्था में है। कृपया अगले 24 घंटों में 35-45 मिमी सिंचाई करें।",
        sms_english="Farmer, your Cotton field is under Severe Moisture Stress during the critical Reproductive stage. Please apply 35-45 mm irrigation in the next 24 hours.",
        yield_forecast_deviation_pct=-14.5
    )
