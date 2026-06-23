from fastapi import APIRouter, Query
from typing import List
from models import (
    FarmInfo, DashboardAnalysis, DistrictSummary, ModelExplainability, FarmerAdvisory, FeatureImportance,
    SatelliteSchedule, ModelComparison, ActiveLearningQueue, EconomicImpact
)
from mock_data import generate_grid_geojson, get_satellite_schedules, get_model_comparisons, get_active_learning_queue
import datetime

router = APIRouter()

@router.get("/farm/{farm_id}", response_model=FarmInfo)
def get_farm_info(farm_id: str, season: str = "Kharif"):
    return FarmInfo(
        farm_id=farm_id,
        date=datetime.datetime.now().strftime("%d %b %Y"),
        season=season,
        optical_image_status="Sentinel-2 (Cloudy)",
        microwave_image_status="Sentinel-1 (Clear)",
        nisar_image_status="NISAR (Simulated - L & S Band)"
    )

@router.get("/analysis/dashboard/{farm_id}", response_model=DashboardAnalysis)
def get_dashboard_analysis(farm_id: str, date_idx: int = Query(4, ge=0, le=4), season: str = "Kharif"):
    return DashboardAnalysis(
        crop_type_accuracy=94.2 if season == "Kharif" else 92.1,
        stress_index_range=[0, 1],
        irrigation_recommended_action="Irrigate in next 24 hours. Critical phenological stage detected.",
        irrigation_depth_mm="35-45 mm",
        total_irrigation_volume_m3="22,400 m³",
        estimated_duration_hours="8 - 10 hours",
        water_balance=-18 + (date_idx * 2),
        crop_map=generate_grid_geojson("crop", date_idx, season),
        confidence_map=generate_grid_geojson("confidence", date_idx, season),
        stress_map=generate_grid_geojson("stress", date_idx, season),
        growth_map=generate_grid_geojson("growth", date_idx, season),
        irrigation_map=generate_grid_geojson("irrigation", date_idx, season),
        cloudy_optical_map=generate_grid_geojson("cloudy_optical", date_idx, season)
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
def get_advisory(farm_id: str, lang: str = "hindi"):
    if lang == "hindi":
        sms_h = "किसान भाई, आपके खेत में नमी की भारी कमी (Severe Stress) है। कृपया अगले 24 घंटों में 35-45 मिमी सिंचाई करें।"
    elif lang == "marathi":
        sms_h = "शेतकरी मित्रा, तुमच्या शेतात पाण्याची तीव्र कमतरता आहे. कृपया पुढील 24 तासांत 35-45 मिमी सिंचन करा."
    else:
        sms_h = "Dear Farmer, severe moisture stress detected. Please irrigate 35-45mm within 24 hours."

    return FarmerAdvisory(
        sms_hindi=sms_h,
        sms_english="Farmer, field is under Severe Moisture Stress. Please apply 35-45 mm irrigation in the next 24 hours.",
        yield_forecast_deviation_pct=-14.5
    )

@router.get("/pipeline/schedule", response_model=List[SatelliteSchedule])
def get_schedules():
    return get_satellite_schedules()

@router.get("/ml/comparison", response_model=List[ModelComparison])
def get_models():
    return get_model_comparisons()

@router.get("/ml/active-learning", response_model=List[ActiveLearningQueue])
def get_al_queue():
    return get_active_learning_queue()

@router.get("/farmer/economics", response_model=EconomicImpact)
def get_economics():
    return EconomicImpact(
        crop="Cotton",
        estimated_yield_loss_qtl=12.5,
        financial_loss_inr=85000.0,
        irrigation_cost_inr=5000.0,
        net_benefit_inr=80000.0
    )
