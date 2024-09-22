from flask import Flask, request, jsonify
import util
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'neighborhood': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    neighborhood = request.form['neighborhood']
    size_in_sqft = int(request.form['sizeInSqft'])
    no_of_bedrooms = int(request.form['noOfBedrooms'])
    no_of_bathrooms = int(request.form['noOfBathrooms'])
    quality_encoded = float(request.form['quality'])
    maid_room = int(request.form['maidRoom'])
    unfurnished = int(request.form['unfurnished'])
    balcony = int(request.form['balcony'])
    central_ac = int(request.form['centralAC'])
    childrens_play_area = int(request.form['childrensPlayArea'])
    covered_parking = int(request.form['coveredParking'])
    private_pool = int(request.form['privatePool'])
    security = int(request.form['security'])
    shared_gym = int(request.form['sharedGym'])
    shared_pool = int(request.form['sharedPool'])
    view_of_landmark = int(request.form['viewOfLandmark'])
    view_of_water = int(request.form['viewOfWater'])
    
    response = jsonify({
        'estimated_price': util.get_estimated_price(neighborhood,size_in_sqft,no_of_bedrooms,
                        no_of_bathrooms,maid_room,unfurnished,balcony,
                        central_ac,childrens_play_area,covered_parking,
                        private_pool,security,shared_gym,
                        shared_pool,view_of_landmark,view_of_water,quality_encoded)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()