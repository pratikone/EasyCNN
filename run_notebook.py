from pathlib import Path
import splitter
import nbformat
import json
from pprint import pprint
from nbconvert.preprocessors import ExecutePreprocessor, CellExecutionError


def run_notebook() :
    splitter.split_input()

    with open("grid_search.ipynb") as f:
        nb = nbformat.read(f, as_version=4)
    ep = ExecutePreprocessor(timeout=60*60, kernel_name='python3')
    

    try :
        pprint("***** Starting execution of notebook")
        ep.preprocess(nb, {'metadata': {}})
    except CellExecutionError:
        out = None
        msg = 'Error executing the notebook "%s".\n\n' % notebook_filename
        msg += 'See notebook "%s" for the traceback.' % notebook_filename_out
        pprint(msg)
    except Exception as e:
        pprint(e)
    finally :
        pprint("***** Ending execution of notebook")

def process_CNN_results():
    FILE_PATH = "history/xception/dense_512_dropout_0.1"
    FILE_NAME = "batch.json"
    my_file = Path( FILE_PATH + "/" + FILE_NAME )
    if my_file.is_file():
        data = json.load( open( my_file ) )
        # pprint( data['loss'] )
        return data['loss']
    
    return None        






if __name__ == '__main__' :
    #run_notebook()
    process_results()