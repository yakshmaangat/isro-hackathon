import random
import math

def generate_grid_geojson(type_data: str, date_index: int = 4, season: str = "Kharif"):
    features = []
    base_lon, base_lat, step = 78.0, 21.0, 0.01
    
    crop_types = ["Rice", "Cotton", "Maize", "Groundnut", "Soybean"] if season == "Kharif" else ["Wheat", "Mustard", "Gram", "Barley", "Peas"]
    stress_levels = ["No Stress", "Low Stress", "Moderate Stress", "High Stress", "Severe Stress"]
    stress_colors = ["#1a9850", "#91cf60", "#d9ef8b", "#fc8d59", "#d73027"]
    growth_stages = ["Germination", "Vegetative", "Reproductive", "Maturation", "Harvest Ready"]
    growth_colors = ["#c7e9c0", "#74c476", "#41ab5d", "#238b45", "#005a32"]
    
    crop_colors = {
        "Rice": "#e6f598", "Cotton": "#f46d43", "Maize": "#fdae61", "Groundnut": "#d53e4f", "Soybean": "#abdda4",
        "Wheat": "#fee08b", "Mustard": "#ffffbf", "Gram": "#d53e4f", "Barley": "#e6f598", "Peas": "#abdda4"
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
