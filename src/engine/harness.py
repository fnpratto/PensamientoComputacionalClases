import sys, io, json, ast, builtins as _pcc_builtins

def _pcc_check_practices(code, required_names_json):
    required_names = json.loads(required_names_json) if required_names_json else []
    result = {"parse_ok": True, "error": None, "defined_functions": [], "missing_required": []}
    try:
        tree = ast.parse(code)
        names = [n.name for n in ast.walk(tree) if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef))]
        result["defined_functions"] = names
        result["missing_required"] = [n for n in required_names if n not in names]
    except SyntaxError as e:
        result["parse_ok"] = False
        result["error"] = str(e)
    return json.dumps(result)

def _pcc_run(code, func_name, args_json, stdin_json):
    args_list = json.loads(args_json) if args_json else []
    stdin_list = json.loads(stdin_json) if stdin_json else []
    namespace = {}
    output = io.StringIO()
    old_stdout = sys.stdout
    old_input = _pcc_builtins.input
    inputs_iter = iter(stdin_list)
    def _mock_input(prompt=""):
        try:
            return next(inputs_iter)
        except StopIteration:
            return "0"
    _pcc_builtins.input = _mock_input
    sys.stdout = output
    result = {"ok": False, "error": None, "return_value": None, "stdout": ""}
    try:
        exec(code, namespace)
        if func_name:
            fn = namespace.get(func_name)
            if not callable(fn):
                raise NameError("No se encontro una funcion llamada '" + func_name + "'")
            result["return_value"] = fn(*args_list)
        result["ok"] = True
    except Exception as e:
        result["error"] = type(e).__name__ + ": " + str(e)
    finally:
        sys.stdout = old_stdout
        _pcc_builtins.input = old_input
        result["stdout"] = output.getvalue()
    try:
        return json.dumps(result)
    except TypeError:
        result["return_value"] = str(result["return_value"])
        return json.dumps(result)
