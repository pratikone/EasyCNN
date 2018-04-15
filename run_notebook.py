import nbformat
from nbconvert.preprocessors import ExecutePreprocessor, CellExecutionError


def run_notebook() :
    with open("grid_search.ipynb") as f:
        nb = nbformat.read(f, as_version=4)
    ep = ExecutePreprocessor(timeout=60*60, kernel_name='python3')

    try :
        ep.preprocess(nb, {'metadata': {}})
    except CellExecutionError:
        out = None
        msg = 'Error executing the notebook "%s".\n\n' % notebook_filename
        msg += 'See notebook "%s" for the traceback.' % notebook_filename_out
        print(msg)
    except Exception as e:
        print(e)



if __name__ == '__main__' :
    run_notebook()