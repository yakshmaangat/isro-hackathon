from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class GeoFeature(BaseModel):
    type: str = "Feature"
    geometry: Dict[str, Any]
    properties: Dict[str, Any]

class GeoFeatureCollection(BaseModel):
    type: str = "FeatureCollection"
    features: List[GeoFeature]

class FarmInfo(BaseModel):
    farm_id: str
    date: str
    season: str
    optical_image_status: str
    microwave_image_status: str
    nisar_image_status: str

class DashboardAnalysis(BaseModel):
    crop_type_accuracy: float
    stress_index_range: List[float]
    irrigation_recommended_action: str
    irrigation_depth_mm: str
    total_irrigation_volume_m3: str
    estimated_duration_hours: str
    water_balance: int
    crop_map: GeoFeatureCollection
    confidence_map: GeoFeatureCollection
    stress_map: GeoFeatureCollection
    growth_map: GeoFeatureCollection
    irrigation_map: GeoFeatureCollection
    cloudy_optical_map: GeoFeatureCollection

class SatelliteSchedule(BaseModel):
    satellite: str
    next_pass: str
    countdown: str
    cloud_cover_forecast: float

class AtmosphericCorrection(BaseModel):
    band_name: str
    toa_reflectance: float
    sr_reflectance: float

class ModelComparison(BaseModel):
    model_name: str
    accuracy: float
    f1_score: float
    inference_time_ms: float

class ActiveLearningQueue(BaseModel):
    field_id: str
    confidence_score: float
    reason: str
    coordinates: List[float]

class Evapotranspiration(BaseModel):
    field_id: str
    actual_et_mm: float
    potential_et_mm: float
    ratio: float

class SoilMoisture(BaseModel):
    depth_cm: str
    volumetric_water_content: float

class DroughtIndex(BaseModel):
    year: int
    spi_value: float

class EconomicImpact(BaseModel):
    crop: str
    estimated_yield_loss_qtl: float
    financial_loss_inr: float
    irrigation_cost_inr: float
    net_benefit_inr: float

class DistrictSummary(BaseModel):
    district_name: str
    total_area_ha: int
    severe_stress_ha: int
    water_deficit_m3: int
    prioritized_interventions: List[str]

class PMFasalClaim(BaseModel):
    claim_id: str
    farmer_id: str
    stress_severity: str
    auto_approved: bool

class FeatureImportance(BaseModel):
    feature: str
    importance: float

class ModelExplainability(BaseModel):
    features: List[FeatureImportance]

class FarmerAdvisory(BaseModel):
    sms_hindi: str
    sms_english: str
    yield_forecast_deviation_pct: float
