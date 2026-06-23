import random
import math

def generate_grid_geojson(type_data: str, date_index: int = 4):
    """
    Generates a 5x5 grid of polygons as a FeatureCollection.
    date_index (0 to 4) simulates temporal changes. 4 is current day.
    """
    features = []
    base_lon = 78.0
    base_lat = 21.0
    step = 0.01

    crop_types = ["Rice", "Wheat", "Maize", "Cotton", "Sugarcane"]
    stress_levels = ["No Stress", "Low Stress", "Moderate Stress", "High Stress", "Severe Stress"]
    stress_colors = ["#1a9850", "#91cf60", "#d9ef8b", "#fc8d59", "#d73027"]
    growth_stages = ["Germination", "Vegetative", "Reproductive", "Maturation", "Harvest Ready"]
    growth_colors = ["#c7e9c0", "#74c476", "#41ab5d", "#238b45", "#005a32"]
    crop_colors = {"Rice": "#e6f598", "Wheat": "#fee08b", "Maize": "#fdae61", "Cotton": "#f46d43", "Sugarcane": "#d53e4f"}

    # Seed based on coordinates so the "farm" is somewhat stable but stress changes over time
    random.seed(42)

    for i in range(5):
        for j in range(5):
            lon1 = base_lon + i * step
            lat1 = base_lat + j * step
            lon2 = lon1 + step * 0.9
            lat2 = lat1 + step * 0.9

            polygon = {
                "type": "Polygon",
                "coordinates": [[
                    [lon1, lat1],
                    [lon2, lat1],
                    [lon2, lat2],
                    [lon1, lat2],
                    [lon1, lat1]
                ]]
            }

            properties = {"id": f"field_{i}_{j}"}
            
            # Stable properties
            crop = crop_types[(i * 5 + j) % len(crop_types)]
            
            if type_data == "crop":
                properties["value"] = crop
                properties["color"] = crop_colors[crop]
            
            elif type_data == "confidence":
                # Confidence Map (Tier 3.1)
                conf = random.uniform(0.6, 0.99)
                properties["value"] = f"{conf*100:.1f}%"
                if conf > 0.85:
                    properties["color"] = "#1a9850" # Green - High Conf
                elif conf > 0.7:
                    properties["color"] = "#f59e0b" # Amber - Medium Conf
                else:
                    properties["color"] = "#ef4444" # Red - Low Conf

            elif type_data == "stress":
                # Stress gets worse over time if date_index increases, to show temporal change (Tier 1.1)
                base_stress = (i + j) % 3  # 0, 1, 2
                dynamic_stress = min(4, base_stress + (date_index // 2))
                # Add some randomness but bounded
                final_stress = min(4, dynamic_stress + random.randint(0, 1))
                
                properties["value"] = stress_levels[final_stress]
                properties["color"] = stress_colors[final_stress]
                properties["raw_score"] = round((final_stress / 4.0) + random.uniform(0, 0.2), 2)

            elif type_data == "growth":
                # Growth progresses over time
                base_stage = 1
                dynamic_stage = min(4, base_stage + date_index)
                properties["value"] = growth_stages[dynamic_stage]
                properties["color"] = growth_colors[dynamic_stage]

            elif type_data == "irrigation":
                # More stress = more irrigation needed
                base_stress = min(4, ((i + j) % 3) + (date_index // 2))
                depth = base_stress * 10 + random.randint(0, 10)
                properties["value"] = f"{depth} mm"
                if depth < 10: color = "#eff3ff"
                elif depth < 20: color = "#bdd7e7"
                elif depth < 30: color = "#6baed6"
                elif depth < 40: color = "#3182bd"
                else: color = "#08519c"
                properties["color"] = color

            elif type_data == "cloudy_optical":
                # Cloud Removal via SAR Fusion (Tier 1.4)
                # Randomly obscure some fields with "clouds" (white/gray)
                is_cloudy = random.random() < 0.4
                if is_cloudy:
                    properties["value"] = "Cloud Cover"
                    properties["color"] = "#e2e8f0" # Light gray cloud
                else:
                    properties["value"] = "Clear"
                    properties["color"] = crop_colors[crop]

            feature = {
                "type": "Feature",
                "geometry": polygon,
                "properties": properties
            }
            features.append(feature)

    return {
        "type": "FeatureCollection",
        "features": features
    }
