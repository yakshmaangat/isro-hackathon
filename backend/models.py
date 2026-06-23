from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class FarmInfo(BaseModel):
    farm_id: str
    date: str
    optical_image_status: str
    microwave_image_status: str
    nisar_image_status: str  # Added NISAR

class GeoFeature(BaseModel):
    type: str = "Feature"
    geometry: Dict[str, Any]
    properties: Dict[str, Any]

class GeoFeatureCollection(BaseModel):
    type: str = "FeatureCollection"
    features: List[GeoFeature]

class DashboardAnalysis(BaseModel):
    crop_type_accuracy: float
    stress_index_range: List[float]
    irrigation_recommended_action: str
    irrigation_depth_mm: str
    total_irrigation_volume_m3: str
    estimated_duration_hours: str
    water_balance: int
    crop_map: GeoFeatureCollection
    confidence_map: GeoFeatureCollection # Tier 3.1
    stress_map: GeoFeatureCollection
    growth_map: GeoFeatureCollection
    irrigation_map: GeoFeatureCollection
    cloudy_optical_map: GeoFeatureCollection # Tier 1.4

class DistrictSummary(BaseModel):
    district_name: str
    total_area_ha: int
    severe_stress_ha: int
    water_deficit_m3: int
    prioritized_interventions: List[str]

class FeatureImportance(BaseModel):
    feature: str
    importance: float

class ModelExplainability(BaseModel):
    features: List[FeatureImportance]

class FarmerAdvisory(BaseModel):
    sms_hindi: str
    sms_english: str
    yield_forecast_deviation_pct: float
