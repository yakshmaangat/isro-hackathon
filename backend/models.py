from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class FarmInfo(BaseModel):
    farm_id: str
    date: str
    optical_image_status: str
    microwave_image_status: str

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
    stress_map: GeoFeatureCollection
    growth_map: GeoFeatureCollection
    irrigation_map: GeoFeatureCollection
