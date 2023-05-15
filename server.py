from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload():
    if 'file_name' not in request.form:
        return 'Error: file_name parameter is missing.', 400
    
    file_name = request.form['file_name']
    
    return jsonify({'response':"File uploaded {} successfully.".format(file_name)})

if __name__ == '__main__':
    app.run()

