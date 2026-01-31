import os
import base64
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

TOKEN = os.environ.get("GITHUB_TOKEN")
ORG = "HyperStorageDB"
HEADERS = {
    "Authorization": f"token {TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "status": "HyperStorageDB Online", 
        "info": "Infinite Storage Engine Active",
        "target_org": ORG
    })

@app.route('/hyper-save', methods=['POST'])
def save():
    data = request.json
    repo = data.get('repo')
    path = data.get('path')
    content = data.get('content')
    
    encoded_content = base64.b64encode(content.encode()).decode()
    url = f"https://api.github.com/repos/{ORG}/{repo}/contents/{path}"
    
    get_res = requests.get(url, headers=HEADERS)
    sha = get_res.json().get('sha') if get_res.status_code == 200 else None
    
    payload = {
        "message": "HyperStorageDB Update",
        "content": encoded_content
    }
    if sha:
        payload["sha"] = sha
        
    put_res = requests.put(url, json=payload, headers=HEADERS)
    return jsonify(put_res.json()), put_res.status_code

@app.route('/hyper-create', methods=['POST'])
def create_repo():
    repo_name = request.json.get('name')
    url = f"https://api.github.com/orgs/{ORG}/repos"
    
    data = {
        "name": repo_name,
        "private": True,
        "auto_init": True
    }
    
    res = requests.post(url, json=data, headers=HEADERS)
    return jsonify(res.json()), res.status_code

@app.route('/hyper-get', methods=['POST'])
def get_file():
    repo = request.json.get('repo')
    path = request.json.get('path')
    
    url = f"https://api.github.com/repos/{ORG}/{repo}/contents/{path}"
    res = requests.get(url, headers=HEADERS)
    
    if res.status_code == 200:
        file_data = res.json()
        decoded = base64.b64decode(file_data['content']).decode('utf-8')
        return jsonify({"data": decoded})
    return jsonify({"error": "Not found"}), 404