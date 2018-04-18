import os
import random
import json
from pprint import pprint
import threading
from serverutil import *
from flask import Flask, render_template, send_from_directory, request, jsonify
from run_notebook import *

app = Flask(__name__)

@app.route('/')
def hello_world():
    print( os.getcwd() )
    return send_from_directory('build','index.html')

@app.route('/<path:path>')
def send_js(path):
    print( "came here with path ", path )
    return send_from_directory( 'build', path )

@app.route('/ajax_test')
def ajax_test_js():
    print( "came here")
    return ajax_test()

@app.route('/input_test', methods=['POST'])
def input_form_data():
    print("=================================")
    response = request.get_json(force=True)
    pprint (response)
    process_and_write_json_to_file( response )


   
    return "Successfully submitted CNN job request"

@app.route('/update_chart_data')
def update_chart_data():
    new_data = process_CNN_batch_results()
    if new_data is None :
        return jsonify( { } ) 
    return jsonify( { 'data' : new_data } ) 


@app.route('/update_small_chart_data/<chart_type>')
def update_small_chart_data( chart_type ):
    chart_type = chart_type.strip()  #cleanup
    new_data = process_CNN_epoch_results( chart_type )
    if new_data is None :
        return jsonify( { } ) 

    return jsonify( { 'data' : new_data } ) 





def process_and_write_json_to_file( json_dict ) :
    json_dict["train_dir"] = "train"
    json_dict["test_dir"] = "test"
    json_dict["img_width"] = 221
    json_dict["img_height"] = 221
    json_dict["loss"] = "categorical_crossentropy"
    json_dict["train_threshold"] = 0
    json_dict["phase1_optimizer"] = "adam"  #TODO get it from frontend

    json_dict["dropout_list"] = [ float(x) for x in json_dict["dropout_list"].strip().split(",")]
    json_dict["dense_list"] = [ int(x) for x in json_dict["dense_list"].strip().split(",")]

    with open('params_manual.json', 'w') as outfile:
        json.dump( json_dict, outfile)

    pprint("Launching new thread for CNN")
    threading.Thread(name='jupyter_notebook', target=run_notebook).start()




if __name__ == '__main__':
  app.run(debug=True)

