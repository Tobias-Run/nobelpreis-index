#!/usr/bin/env python3
"""Offline-Build samt prüfbarem Manifest; Zeitstempel verändern den Inhalt nicht."""
import hashlib
import json
import os
import subprocess
import sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
for script in ['import-bundesbank-vpi.py','build-zeitreihe.py','build-site.py']:
    subprocess.run([sys.executable,str(ROOT/'scripts'/script)],check=True,cwd=ROOT)
config=json.loads((ROOT/'data/release.json').read_text())
commit=os.environ.get('GITHUB_SHA') or subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip()
inputs={p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in ['data/release.json']+[v for v in config.values() if isinstance(v,str) and v.startswith('data/')]}
files={str(p.relative_to(ROOT/'dist')):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted((ROOT/'dist').rglob('*')) if p.is_file() and p.name!='release.json'}
dirty=bool(subprocess.check_output(['git','status','--porcelain','--untracked-files=normal'],cwd=ROOT,text=True).strip())
manifest={'arbeitskopie':dirty,'version':config['version'],'datenstand':config['ansicht_stand'],'commit':commit,'status':config['status'],'eingaben':inputs,'dateien':files}
(ROOT/'dist/release.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(f'Release {config["version"]}: {len(files)} Dateien, Commit {commit[:7]}')
