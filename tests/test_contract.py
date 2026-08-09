import ast,pathlib
P=pathlib.Path(__file__).parents[1]/'contracts'/'contract.py'
def test_contract_parses():ast.parse(P.read_text(encoding='utf-8'))
def test_public_surface():
    s=P.read_text(encoding='utf-8')
    for n in ('create_charter','register_milestone','add_evidence','witness_milestone','get_witness'):assert f'def {n}' in s
def test_no_auto_payment():assert 'transfer(' not in P.read_text(encoding='utf-8')
