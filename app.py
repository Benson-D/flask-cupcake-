"""Flask app for Cupcakes"""

from flask import Flask, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///cupcakes"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = "secret"

app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)

db.create_all()

toolbar = DebugToolbarExtension(app)


@app.get('/api/cupcakes')
def get_data_cupcakes():
    """Get data of all cupcakes, 
    Return {cupcakes: [{id, flavor, size, rating, image}, ...]}"""

    cupcakes = Cupcake.query.all() 
    serialized = [c.serialize() for c in cupcakes]

    return jsonify(cupcakes=serialized)

@app.get('/api/cupcakes/<int:cupcake_id>')
def get_data_single_cupcake(cupcake_id):
    """Get data on a single cupcake"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)

@app.post('/api/cupcakes')
def create_cupcake():
    """Adding a new cupcake to our database"""

    # data = {k: v for k, v in json.data.items() if k != "csrf_token"}
    # new_cupcake = Cupcake(**data)

    data = request.json 
    # flavor = request.json['flavor']
    # size = request.json['size']
    # rating = request.json['rating']
    # image = request.json['image']

    new_cupcake = Cupcake(
        flavor = data['flavor'],
        size = data['size'], 
        rating = data['rating'],
        image = data['image']
    )


    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()
    # Return w/status code 201 --- return tuple (json, status)
    return (jsonify(cupcake=serialized), 201)



    





