import random

def generate_grid_geojson(type_data: str):
    """
    Generates a 5x5 grid of polygons as a FeatureCollection.
    type_data specifies what kind of properties to inject (crop, stress, growth, irrigation).
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

    for i in range(5):
        for j in range(5):
            lon1 = base_lon + i * step
            lat1 = base_lat + j * step
            lon2 = lon1 + step * 0.9 # 0.9 to leave a gap between fields
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
            
            if type_data == "crop":
                crop = random.choice(crop_types)
                properties["value"] = crop
                properties["color"] = crop_colors[crop]
            elif type_data == "stress":
                idx = random.randint(0, 4)
                properties["value"] = stress_levels[idx]
                properties["color"] = stress_colors[idx]
            elif type_data == "growth":
                idx = random.randint(0, 4)
                properties["value"] = growth_stages[idx]
                properties["color"] = growth_colors[idx]
            elif type_data == "irrigation":
                depth = random.randint(0, 50)
                properties["value"] = f"{depth} mm"
                if depth < 10: color = "#eff3ff"
                elif depth < 20: color = "#bdd7e7"
                elif depth < 30: color = "#6baed6"
                elif depth < 40: color = "#3182bd"
                else: color = "#08519c"
                properties["color"] = color

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
