import os

ROOT = os.path.dirname(os.path.dirname(__file__))
assert os.path.exists(os.path.join(ROOT, 'python')), 'Expected python client directory'
assert os.path.exists(os.path.join(ROOT, 'typescript')), 'Expected typescript client directory'
assert os.path.exists(os.path.join(ROOT, 'dotnet')), 'Expected dotnet client directory'
print('an5Client smoke test passed')
