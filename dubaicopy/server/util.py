import pickle
import json
import numpy as np

__locations = None
__data_columns = None
__model = None


def format_and_round_number(num):
    
    rounded_num = round(num / 100) * 100
    formatted_num = f"{rounded_num:,}"
    return formatted_num


def get_estimated_price(neighborhood,size_in_sqft,no_of_bedrooms,
                        no_of_bathrooms,maid_room,unfurnished,balcony,
                        central_ac,childrens_play_area,covered_parking,
                        private_pool,security,shared_gym,
                        shared_pool,view_of_landmark,view_of_water,quality_encoded):
    try:
        loc_index = __data_columns.index(neighborhood.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = size_in_sqft
    x[1] = no_of_bedrooms
    x[2] = no_of_bathrooms
    x[3] = maid_room
    x[4] = unfurnished
    x[5] = balcony
    x[6] = central_ac
    x[7] = childrens_play_area
    x[8] = covered_parking
    x[9] = private_pool
    x[10] = security
    x[11] = shared_gym
    x[12] = shared_pool
    x[13] = view_of_landmark
    x[14] = view_of_water
    x[15] = quality_encoded
    if loc_index>=0:
        x[loc_index] = 1

    return format_and_round_number(abs(__model.predict([x])[0]))


def load_saved_artifacts():
    print("loading saved artifacts...start")
    global  __data_columns
    global __locations

    with open("C:\\Users\\khale\\Desktop\\dubaicopy\\server\\artifacts\\columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[16:]  

    global __model
    if __model is None:
        with open('C:\\Users\\khale\\\Desktop\\dubaicopy\\server\\artifacts\\dubai_re_model.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_location_names():
    return __locations

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('Palm Jumeirah',1079,1,1,0,0,1,0,1,1,0,0,0,0,1,1,2))
    