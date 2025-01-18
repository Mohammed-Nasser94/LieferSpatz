from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from flask_cors import CORS


app = Flask(__name__)

# Enable CORS
CORS(app)


# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lieferspatz.db'  # Database configuration
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking for performance
app.config['JWT_SECRET_KEY'] = 'f0c19b2d5a823wdw433bce3ad8958e'  # Secret key for signing JWT tokens
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)  # Token expiration time

db = SQLAlchemy(app)  # Initialize SQLAlchemy for ORM
jwt = JWTManager(app)  # Initialize JWT Manager

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unique ID for each user
    username = db.Column(db.String(80), unique=True, nullable=False)  # Username, must be unique
    password = db.Column(db.String(120), nullable=False)  # Hashed password
    email = db.Column(db.String(120), unique=True, nullable=False)  # Email, must be unique

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unique ID for each restaurant
    name = db.Column(db.String(120), nullable=False)  # Name of the restaurant
    address = db.Column(db.String(200), nullable=False)  # Address of the restaurant
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Owner of the restaurant

class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unique ID for each menu item
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)  # Related restaurant
    name = db.Column(db.String(120), nullable=False)  # Name of the menu item
    price = db.Column(db.Float, nullable=False)  # Price of the item
    description = db.Column(db.String(200))  # Description of the item
    photo_url = db.Column(db.String(200))  # URL for item photo

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Unique ID for each order
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # User who placed the order
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)  # Related restaurant
    total_price = db.Column(db.Float, nullable=False)  # Total price of the order
    order_date = db.Column(db.DateTime, default=datetime.utcnow)  # Date of the order
    status = db.Column(db.String(50), default='Pending')  # Status of the order (e.g., Pending, Delivered)

# Initialize the database
with app.app_context():
    db.create_all()  # Create all tables if not exist

# Routes
@app.route('/register', methods=['POST'])
def register():
    """Handles user registration by creating a new user and returning a JWT token."""
    data = request.get_json()
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Username already exists'}), 400

    hashed_password = generate_password_hash(data['password'], method='sha256')
    user = User(username=data['username'], password=hashed_password, email=data['email'])
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.id)
    return jsonify({'message': 'User registered successfully!', 'access_token': access_token}), 201

@app.route('/login', methods=['POST'])
def login():
    """Handles user login by validating credentials and returning a JWT token."""
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'message': 'Login successful!', 'access_token': access_token}), 200
    return jsonify({'message': 'Invalid username or password!'}), 401

@app.route('/restaurants', methods=['POST'])
@jwt_required()
def add_restaurant():
    """Allows an authenticated user to create a new restaurant and associates it with the user."""
    current_user = get_jwt_identity()
    data = request.get_json()
    restaurant = Restaurant(name=data['name'], address=data['address'], owner_id=current_user)
    db.session.add(restaurant)
    db.session.commit()
    return jsonify({'message': 'Restaurant added successfully!'}), 201

@app.route('/restaurants', methods=['GET'])
@jwt_required()
def get_restaurants():
    """Retrieves all restaurants. Accessible to authenticated users."""
    current_user = get_jwt_identity()
    restaurants = Restaurant.query.all()
    result = [{'id': r.id, 'name': r.name, 'address': r.address} for r in restaurants]
    return jsonify(result)

@app.route('/restaurants/<int:restaurant_id>/menu', methods=['POST'])
@jwt_required()
def add_menu_item(restaurant_id):
    """Allows an authenticated user to add a menu item to a specific restaurant."""
    current_user = get_jwt_identity()
    data = request.form
    photo = request.files['photo']
    photo_url = f"/path/to/save/photo/{photo.filename}"  # Save the photo and get the URL
    menu_item = MenuItem(
        restaurant_id=restaurant_id,
        name=data['name'],
        price=data['price'],
        description=data.get('description', ''),
        photo_url=photo_url
    )
    db.session.add(menu_item)
    db.session.commit()
    return jsonify({'message': 'Menu item added successfully!'}), 201

@app.route('/restaurants/<int:restaurant_id>/menu', methods=['GET'])
@jwt_required()
def get_menu(restaurant_id):
    """Retrieves all menu items for a specific restaurant."""
    current_user = get_jwt_identity()
    menu_items = MenuItem.query.filter_by(restaurant_id=restaurant_id).all()
    result = [{'id': item.id, 'name': item.name, 'price': item.price} for item in menu_items]
    return jsonify(result)

@app.route('/orders', methods=['POST'])
@jwt_required()
def create_order():
    """Allows an authenticated user to create a new order."""
    current_user = get_jwt_identity()
    data = request.get_json()
    order = Order(user_id=current_user, restaurant_id=data['restaurant_id'], total_price=data['total_price'])
    db.session.add(order)
    db.session.commit()
    return jsonify({'message': 'Order created successfully!'}), 201

@app.route('/orders/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    """Retrieves details of a specific order. Accessible only to the user who placed the order."""
    current_user = get_jwt_identity()
    order = Order.query.get(order_id)
    if not order or order.user_id != current_user:
        return jsonify({'message': 'Order not found!'}), 404
    return jsonify({
        'id': order.id,
        'user_id': order.user_id,
        'restaurant_id': order.restaurant_id,
        'total_price': order.total_price,
        'order_date': order.order_date,
        'status': order.status
    })

@app.route('/orders/<int:order_id>/status', methods=['PUT'])
@jwt_required()
def update_order_status(order_id):
    """Allows the restaurant owner to update the status of an order. 
    Includes a permission check to ensure only authorized users can perform this action."""
    current_user = get_jwt_identity()
    data = request.get_json()

    # Get the order and restaurant details
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'message': 'Order not found!'}), 404

    restaurant = Restaurant.query.get(order.restaurant_id)
    if not restaurant or restaurant.owner_id != current_user:
        return jsonify({'message': 'You do not have permission to update this order!'}), 403

    # Update the order status
    order.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Order status updated successfully!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
