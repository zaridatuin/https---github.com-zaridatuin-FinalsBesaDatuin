import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from '../firebase/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ title: '', description: '', price: '', image: '' });
    const [showForm, setShowForm] = useState(false);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'menuItems'));
                const items = querySnapshot.docs.map(doc => doc.data());
                setMenuItems(items);
            } catch (error) {
                console.error("Error fetching menu items: ", error);
            }
        };
        fetchMenuItems();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'menuItems'), newItem);
            setNewItem({ title: '', description: '', price: '', image: '' });
            const querySnapshot = await getDocs(collection(db, 'menuItems'));
            const items = querySnapshot.docs.map(doc => doc.data());
            setMenuItems(items);
            setShowForm(false);
            console.log("Item added successfully");
        } catch (error) {
            console.error("Error adding new item: ", error);
        }
    };

    const handleAddToCart = (item, quantity) => {
        const existingItem = cart.find(cartItem => cartItem.title === item.title);
        if (existingItem) {
            existingItem.quantity += quantity;
            setCart([...cart]);
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
    };

    const handleOrder = async () => {
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const order = {
            items: cart,
            status: 'pending',
            totalPrice
        };
        try {
            await addDoc(collection(db, 'orders'), order);
            setCart([]);
            setShowCart(false);
            console.log("Order placed successfully");
        } catch (error) {
            console.error("Error placing order: ", error);
        }
    };

    const handleRemoveFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const handleClearCart = () => {
        setCart([]);
    };

    const getImage = (imageName) => {
        return `${process.env.PUBLIC_URL}/img/${imageName}`;
    };

    const handleIncrementQuantity = (index) => {
        const newCart = [...cart];
        newCart[index].quantity += 1;
        setCart(newCart);
    };

    const handleDecrementQuantity = (index) => {
        const newCart = [...cart];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
            setCart(newCart);
        }
    };

    return (
        <div className="container">
            <h1>Menu</h1>
            <p>Here you can find our delicious menu items.</p>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : '+'}
            </button>
            {showForm && (
                <form onSubmit={handleAddItem} className="mb-4">
                    <div className="mb-3">
                        <input type="text" name="title" value={newItem.title} onChange={handleInputChange} className="form-control" placeholder="Title" required />
                    </div>
                    <div className="mb-3">
                        <input type="text" name="description" value={newItem.description} onChange={handleInputChange} className="form-control" placeholder="Description" required />
                    </div>
                    <div className="mb-3">
                        <input type="number" name="price" value={newItem.price} onChange={handleInputChange} className="form-control" placeholder="Price" required />
                    </div>
                    <div className="mb-3">
                        <input type="text" name="image" value={newItem.image} onChange={handleInputChange} className="form-control" placeholder="Image URL" required />
                    </div>
                    <button> Add Item</button>
                </form>
            )}
            <button className="cart-button" onClick={() => setShowCart(!showCart)}>
                <img src="../img/cart.png" alt="Cart" />
            </button>
            {showCart && (
                <div className="cart">
                    <button className="close-cart" onClick={() => setShowCart(false)}>X</button>
                    <h2>Cart</h2>
                    {cart.map((item, index) => (
                        <div key={index}>
                            <p>{item.title} x {item.quantity} 
                                <button onClick={() => handleDecrementQuantity(index)}>-</button>
                                <button onClick={() => handleIncrementQuantity(index)}>+</button>
                            </p>
                        </div>
                    ))}
                    <p>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                    <button onClick={handleOrder}>Order</button>
                    <button onClick={handleClearCart}>Clear Cart</button>
                </div>
            )}
            <div className="row">
                {menuItems.map((item, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={getImage(item.image)} className="card-img-top" alt={item.title} />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text"><strong>₱{item.price}</strong></p>
                                <button onClick={() => handleAddToCart(item, 1)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}