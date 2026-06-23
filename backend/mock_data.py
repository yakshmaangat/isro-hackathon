import random
import math

def generate_grid_geojson(type_data: str, date_index: int = 4, season: str = "Kharif"):
    features = []
    base_lon, base_lat, step = 78.0, 21.0, 0.01
    
    if season == "Kharif":
        crop_types = ["Rice", "Cotton", "Maize", "Groundnut", "Soybean"]
    elif season == "Rabi":
        crop_types = ["Wheat", "Mustard", "Gram", "Barley", "Peas"]
    else: # Zaid
        crop_types = ["Watermelon", "Muskmelon", "Cucumber", "Bitter Gourd", "Moong"]

    stress_levels = ["No Stress", "Low Stress", "Moderate Stress", "High Stress", "Severe Stress"]
    stress_colors = ["#1a9850", "#91cf60", "#d9ef8b", "#fc8d59", "#d73027"]
    growth_stages = ["Germination", "Vegetative", "Reproductive", "Maturation", "Harvest Ready"]
    growth_colors = ["#c7e9c0", "#74c476", "#41ab5d", "#238b45", "#005a32"]
    
    crop_colors = {
        "Rice": "#e6f598", "Cotton": "#f46d43", "Maize": "#fdae61", "Groundnut": "#d53e4f", "Soybean": "#abdda4",
        "Wheat": "#fee08b", "Mustard": "#ffffbf", "Gram": "#d53e4f", "Barley": "#e6f598", "Peas": "#abdda4",
        "Watermelon": "#f46d43", "Muskmelon": "#fdae61", "Cucumber": "#abdda4", "Bitter Gourd": "#c7e9c0", "Moong": "#d53e4f"
    }

    random.seed(42 + (1 if season == "Rabi" else 0))

    for i in range(5):
        for j in range(5):
            lon1, lat1 = base_lon + i * step, base_lat + j * step
            lon2, lat2 = lon1 + step * 0.9, lat1 + step * 0.9

            polygon = {"type": "Polygon", "coordinates": [[[lon1, lat1], [lon2, lat1], [lon2, lat2], [lon1, lat2], [lon1, lat1]]]}
            properties = {"id": f"field_{i}_{j}"}
            
            crop = crop_types[(i * 5 + j) % len(crop_types)]
            
            if type_data == "crop":
                properties["value"] = crop
                properties["color"] = crop_colors[crop]
            elif type_data == "confidence":
                conf = random.uniform(0.6, 0.99)
                properties["value"] = f"{conf*100:.1f}%"
                properties["color"] = "#1a9850" if conf > 0.85 else "#f59e0b" if conf > 0.7 else "#ef4444"
            elif type_data == "stress":
                base_stress = (i + j) % 3
                dynamic_stress = min(4, base_stress + (date_index // 2))
                final_stress = min(4, dynamic_stress + random.randint(0, 1))
                properties["value"] = stress_levels[final_stress]
                properties["color"] = stress_colors[final_stress]
                properties["raw_score"] = round((final_stress / 4.0) + random.uniform(0, 0.2), 2)
            elif type_data == "growth":
                base_stage = 1
                dynamic_stage = min(4, base_stage + date_index)
                properties["value"] = growth_stages[dynamic_stage]
                properties["color"] = growth_colors[dynamic_stage]
            elif type_data == "irrigation":
                base_stress = min(4, ((i + j) % 3) + (date_index // 2))
                depth = base_stress * 10 + random.randint(0, 10)
                properties["value"] = f"{depth} mm"
                properties["color"] = "#eff3ff" if depth < 10 else "#bdd7e7" if depth < 20 else "#6baed6" if depth < 30 else "#3182bd" if depth < 40 else "#08519c"
            elif type_data == "predictive_stress":
                is_amber = random.random() < 0.2
                properties["value"] = "Warning (7-Day)" if is_amber else "Clear"
                properties["color"] = "#f59e0b" if is_amber else "#1a9850"
            elif type_data == "sar_coherence":
                lodged = random.random() < 0.1
                properties["value"] = "Lodging Detected" if lodged else "Stable"
                properties["color"] = "#ef4444" if lodged else "#10b981"
            elif type_data == "cloudy_optical":
                is_cloudy = random.random() < (0.8 if date_index == 1 else 0.2) # High clouds on date index 1
                if is_cloudy:
                    properties["value"] = "Cloud Cover"
                    properties["color"] = "#e2e8f0"
                else:
                    properties["value"] = "Clear"
                    properties["color"] = crop_colors[crop]

            features.append({"type": "Feature", "geometry": polygon, "properties": properties})

    return {"type": "FeatureCollection", "features": features}

def get_satellite_schedules():
    return [
        {"satellite": "Sentinel-1A (SAR)", "next_pass": "2026-06-25 05:30 UTC", "countdown": "1d 4h 15m", "cloud_cover_forecast": 85.0},
        {"satellite": "Sentinel-2B (Optical)", "next_pass": "2026-06-26 10:45 UTC", "countdown": "2d 9h 30m", "cloud_cover_forecast": 25.5},
        {"satellite": "NISAR (Simulated)", "next_pass": "2026-06-28 12:00 UTC", "countdown": "4d 11h 45m", "cloud_cover_forecast": 10.0}
    ]

def get_model_comparisons():
    return [
        {"model_name": "Random Forest", "accuracy": 82.5, "f1_score": 0.81, "inference_time_ms": 15},
        {"model_name": "CNN (U-Net)", "accuracy": 91.2, "f1_score": 0.89, "inference_time_ms": 120},
        {"model_name": "Vision Transformer (Swin)", "accuracy": 94.8, "f1_score": 0.93, "inference_time_ms": 250}
    ]

def get_active_learning_queue():
    return [
        {"field_id": "field_2_3", "confidence_score": 0.62, "reason": "Borderline Spectral Signature (Rice vs Weed)", "coordinates": [78.02, 21.03]},
        {"field_id": "field_4_1", "confidence_score": 0.58, "reason": "High SAR noise, anomalous NDVI drop", "coordinates": [78.04, 21.01]},
    ]

def get_carbon_seq():
    return [
        {"field_id": "field_0_1", "estimated_biomass_tons": 14.5, "co2_equivalent_tons": 26.6},
        {"field_id": "field_1_2", "estimated_biomass_tons": 22.1, "co2_equivalent_tons": 40.5}
    ]

def get_illegal_crops():
    return [
        {"field_id": "field_3_3", "declared_crop": "Wheat", "detected_crop": "Sugarcane", "confidence": 0.94, "flag_status": "High Risk - Insurance Fraud"}
    ]

def get_water_stress():
    return {
        "canal_availability_pct": 34.5,
        "groundwater_depletion_trend": "Severe Drop (-12cm/yr)",
        "pump_electricity_zone": "Red Zone (Unreliable)",
        "recommendation": "Switch to micro-irrigation immediately. Groundwater critically depleted."
    }

def get_fpo_summary():
    return {
        "fpo_name": "Vidarbha Farmers Cooperative",
        "total_farmers": 142,
        "collective_water_demand_m3": 450000,
        "optimal_staggered_schedule": ["Block A: Mon/Wed (Canal 1)", "Block B: Tue/Thu (Canal 1)", "Block C: Fri/Sun (Groundwater)"]
    }

def get_phenology_fingerprint():
    return {
        "crop_type": "Wheat",
        "predicted_variety": "HD-2967 (High Yielding)",
        "confidence": 0.89,
        "lai_curve": [0.2, 0.5, 1.2, 2.8, 3.4, 3.6, 2.1, 0.8, 0.1]
    }

def get_counterfactual():
    return {
        "event_name": "Vidarbha Drought 2023",
        "stress_flagged_days_early": 11,
        "yield_saved_pct": 18.5,
        "hectares_protected": 4500
    }

def get_microwave_acoustics():
    return {
        "cavitation_events": [12, 45, 89, 130, 210, 450, 890], # Rising trend
        "stress_prediction_days": 14,
        "signal_confidence": 0.92,
        "recommendation": "Xylem cavitation detected via C-band SAR micro-oscillations. Pre-symptomatic severe drought stress likely in 14 days."
    }

def get_quantum_unmixing():
    return {
        "original_resolution": "10m",
        "effective_resolution": "2m",
        "crops_unmixed": ["Cotton", "Weeds", "Shadow", "Soil"],
        "cotton_purity": 0.88,
        "optimization_energy": -452.1
    }

def get_epigenetic_memory():
    return [
        {"field_id": "field_2_2", "historical_stress_events": 4, "epigenetic_adaptation_score": 0.85, "status": "Drought Adapted"},
        {"field_id": "field_1_4", "historical_stress_events": 1, "epigenetic_adaptation_score": 0.21, "status": "Vulnerable"}
    ]

def get_atmospheric_river():
    return {
        "river_name": "Bay of Bengal Plume",
        "arrival_days": 4.5,
        "intensity_ivt": "850 kg/m/s",
        "expected_precipitation_mm": 120,
        "recommendation": "Halt scheduled irrigation. Atmospheric river intercept in 4 days."
    }

def get_disease_propagation():
    return {
        "origin_field": "field_0_0",
        "disease_type": "Wheat Rust",
        "wind_vector": "North-East 15km/h",
        "fields_at_risk": ["field_0_1", "field_1_1", "field_1_2"],
        "time_to_infection_hours": 36
    }

def get_groundwater_runway():
    return {
        "district": "Anantapur",
        "grace_anomaly": "-14.2 mm",
        "extraction_rate_m3_day": 45000,
        "runway_crop_seasons": 4.2,
        "status": "Critical Depletion Horizon"
    }

def get_lue_collapse():
    return {
        "field_id": "field_4_4",
        "ndvi": 0.82,
        "lue_index": 0.31,
        "status": "Biochemical Collapse",
        "warning": "NDVI is high, but Light Use Efficiency has collapsed. Photosynthesis impaired."
    }

def get_resilience_fingerprint():
    return {
        "field_id": "field_3_1",
        "recovery_time_days": 12,
        "resilience_score": 88,
        "classification": "Highly Resilient",
        "soil_microbiome_proxy": "Excellent"
    }

def get_mycorrhizal_network():
    return {
        "network_richness_score": 0.78,
        "biological_buffer_factor": "+15% Stress Tolerance",
        "carbon_proxy": "High SWIR Organic Carbon"
    }

def get_dark_fields():
    return [
        {"coordinates": [78.055, 21.042], "estimated_area_ha": 1.2, "crop_type": "Maize", "status": "Unregistered / Shadow Farm"},
        {"coordinates": [78.012, 21.089], "estimated_area_ha": 0.8, "crop_type": "Cotton", "status": "Unregistered / Shadow Farm"}
    ]

def get_humanitarian_triage():
    return {
        "farmer_id": "FARM_9921",
        "vulnerability_score": 0.94, # Extremely vulnerable
        "insurance_claim_verified": True,
        "groundwater_runway": 0.5, # Half a season left
        "triage_action": "IMMEDIATE HUMANITARIAN INTERVENTION",
        "details": "Satellite verifies 100% crop loss. Aquifer depleted. Farmer has no safety net. Route to emergency state relief fund."
    }

