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
            <div className="row">
                {menuItems.map((item, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={item.image} className="card-img-top" alt={item.title} />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text"><strong>${item.price}</strong></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}