import os
from flask import Flask, render_template, send_from_directory
app = Flask(__name__)

@app.route('/')
def hello_world():
    print( os.getcwd() )
    return send_from_directory('build','index.html')

@app.route('/<path:path>')
def send_js(path):
    print( "came here with path ", path )
    return send_from_directory( 'build', path )




if __name__ == '__main__':
  app.run(debug=True)

