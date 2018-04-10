import os
import random
from pprint import pprint
from serverutil import *
from flask import Flask, render_template, send_from_directory, request, jsonify
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
    pprint (response['layers'] )
    if "model_selected" in response :
        pprint (response['model_selected'] )
    # pprint(request.args)
    return ""#process_input( request )

@app.route('/update_chart_data')
def update_chart_data():
    # print("came to update chart data")
    new_data = []
    for i in range(27) :
        new_data.append( random.randint ( 80, 200) );
    return jsonify( { 'data' : new_data } ) 





if __name__ == '__main__':
  app.run(debug=True)

