# run_test.py
import traceback
try:
    import app
    print("Imported app module OK")
    if hasattr(app, 'create_app'):
        print("create_app() available")
    if hasattr(app, '__name__'):
        print("app module name:", app.__name__)
except Exception:
    traceback.print_exc()
