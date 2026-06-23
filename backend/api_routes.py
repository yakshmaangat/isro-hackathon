from fastapi import APIRouter, Query
from typing import List
from models import (
    FarmInfo, DashboardAnalysis, DistrictSummary, ModelExplainability, FarmerAdvisory, FeatureImportance,
    SatelliteSchedule, ModelComparison, ActiveLearningQueue, EconomicImpact,
    CarbonSequestration, IllegalCropDetection, WaterSourceStress, FPOSummary, PhenologyFingerprint, HistoricalCounterfactual
)
from mock_data import (
    generate_grid_geojson, get_satellite_schedules, get_model_comparisons, get_active_learning_queue,
    get_carbon_seq, get_illegal_crops, get_water_stress, get_fpo_summary, get_phenology_fingerprint, get_counterfactual,
    get_microwave_acoustics, get_quantum_unmixing, get_epigenetic_memory, get_atmospheric_river,
    get_disease_propagation, get_groundwater_runway, get_lue_collapse, get_resilience_fingerprint,
    get_mycorrhizal_network, get_dark_fields, get_humanitarian_triage
)
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
        cloudy_optical_map=generate_grid_geojson("cloudy_optical", date_idx, season),
        predictive_stress_map=generate_grid_geojson("predictive_stress", date_idx, season),
        sar_coherence_map=generate_grid_geojson("sar_coherence", date_idx, season)
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
        yield_forecast_deviation_pct=-14.5,
        audio_url="/mock_audio_ivr.mp3"
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

@router.get("/analysis/carbon", response_model=List[CarbonSequestration])
def get_carbon():
    return get_carbon_seq()

@router.get("/analysis/illegal-crops", response_model=List[IllegalCropDetection])
def get_illegal():
    return get_illegal_crops()

@router.get("/analysis/water-stress", response_model=WaterSourceStress)
def get_water():
    return get_water_stress()

@router.get("/analysis/fpo-summary", response_model=FPOSummary)
def get_fpo():
    return get_fpo_summary()

@router.get("/ml/phenology", response_model=PhenologyFingerprint)
def get_phenology():
    return get_phenology_fingerprint()

@router.get("/analysis/counterfactual", response_model=HistoricalCounterfactual)
def get_historical():
    return get_counterfactual()

@router.get("/analysis/microwave-acoustics")
def route_microwave_acoustics():
    return get_microwave_acoustics()

@router.get("/analysis/quantum-unmixing")
def route_quantum_unmixing():
    return get_quantum_unmixing()

@router.get("/analysis/epigenetic-memory")
def route_epigenetic_memory():
    return get_epigenetic_memory()

@router.get("/analysis/atmospheric-river")
def route_atmospheric_river():
    return get_atmospheric_river()

@router.get("/analysis/disease-propagation")
def route_disease_propagation():
    return get_disease_propagation()

@router.get("/analysis/groundwater-runway")
def route_groundwater_runway():
    return get_groundwater_runway()

@router.get("/analysis/lue-collapse")
def route_lue_collapse():
    return get_lue_collapse()

@router.get("/analysis/resilience-fingerprint")
def route_resilience_fingerprint():
    return get_resilience_fingerprint()

@router.get("/analysis/mycorrhizal-network")
def route_mycorrhizal_network():
    return get_mycorrhizal_network()

@router.get("/analysis/dark-fields")
def route_dark_fields():
    return get_dark_fields()

@router.get("/analysis/humanitarian-triage")
def route_humanitarian_triage():
    return get_humanitarian_triage()
