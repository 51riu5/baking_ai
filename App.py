from flask import Flask, request, jsonify
import pandas as pd

# Load Ingredient Density Database
ingredient_data = pd.read_csv('ingredient_densities.csv')  # CSV file with ingredient densities (e.g., flour, sugar)

app = Flask(__name__)

# Conversion Function
def convert_to_grams(ingredient, measurement, quantity):
    try:
        density = ingredient_data.loc[ingredient_data['ingredient'] == ingredient, 'density'].values[0]
        if measurement == "cup":
            grams = quantity * density * 240  # 1 cup = 240ml
        elif measurement == "tablespoon":
            grams = quantity * density * 15  # 1 tbsp = 15ml
        elif measurement == "teaspoon":
            grams = quantity * density * 5  # 1 tsp = 5ml
        else:
            return {"error": "Unsupported measurement"}
        return {"ingredient": ingredient, "grams": round(grams, 2)}
    except Exception as e:
        return {"error": str(e)}

# API Endpoint
@app.route('/convert', methods=['POST'])
def convert():
    data = request.json
    ingredient = data.get('ingredient')
    measurement = data.get('measurement')
    quantity = data.get('quantity')
    result = convert_to_grams(ingredient, measurement, quantity)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
