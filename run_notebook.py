from pathlib import Path
import splitter
import json
from pprint import pprint
import grid_search

def run_notebook() :
    splitter.split_input()
    
    pprint("***** Starting execution of notebook")
    
    grid_search.run()
    
    pprint("***** Ending execution of notebook")

def process_CNN_batch_results():
    FILE_PATH = "history/xception/dense_512_dropout_0.1"
    FILE_NAME = "batch.json"
    my_file = Path( FILE_PATH + "/" + FILE_NAME )
    if my_file.is_file():
        data = json.load( open( str(my_file) ) )
        # pprint( data['loss'] )
        return data['loss']
    
    return None        


def process_CNN_epoch_results( chart_type ):
    FILE_PATH = "history/xception/dense_512_dropout_0.1"
    FILE_NAME = "epoch.json"

    my_file = Path( FILE_PATH + "/" + FILE_NAME )
    
    if my_file.is_file():
        data = json.load( open( str(my_file) ) )
        if None in data[chart_type] :  #  null is parsed as None in Python, smart boy/girl
            return None
        return data[chart_type]
    
    return None        





if __name__ == '__main__' :
    #run_notebook()
    process_results()