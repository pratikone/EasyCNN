from pathlib import Path
import splitter
import json
from pprint import pprint
import grid_search

ROOT_FOLDER_PATH = "history"
BATCH_FILE_NAME = "batch.json"
EPOCH_FILE_NAME = "epoch.json"
MODEL_FILE = "model.txt"

def run_notebook() :
    splitter.split_input()
    
    pprint("***** Starting execution of notebook")
    
    grid_search.run()
    
    pprint("***** Ending execution of notebook")

def process_CNN_results( mode, chart_type = None ):
    FOLDER_PATH = ROOT_FOLDER_PATH + "/" + mode
    results = {}
    result_folder = Path( FOLDER_PATH )

    sub_folder_list = [str(f) for f in result_folder.glob('**/*') if f.is_dir()]
    for folder in sub_folder_list :

        if chart_type is None :
            my_file = Path( folder + "/" + BATCH_FILE_NAME )
        else :
            my_file = Path( folder + "/" + EPOCH_FILE_NAME )
        if my_file.is_file():
            data = json.load( open( str(my_file) ) )

            # pprint( data )
            if chart_type is None : # in case of batch.json
                results[ folder.split("/")[-1] ] = data['loss']
            else :
                if None in data[chart_type] :  #  null is parsed as None in Python, smart boy/girl
                    pass   #TODO check for multiple entries
                else :
                    results[ folder.split("/")[-1] ] = data[chart_type]   #add entry for chart type
    if results:
        return results
    
    return None        


def process_model_info( mode ):
    FOLDER_PATH = ROOT_FOLDER_PATH + "/" + mode
    results = None


    my_file = Path( FOLDER_PATH + "/" + MODEL_FILE )
    if my_file.is_file():
        data = json.load( open( str(my_file) ) )

        # pprint( data )
        if "model" in data : 
            results = data['model']
    if results:
        return results
    
    return None        




if __name__ == '__main__' :
    #run_notebook()
    process_CNN_results()