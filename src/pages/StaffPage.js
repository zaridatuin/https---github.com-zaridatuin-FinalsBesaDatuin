
import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase/config';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function StaffPage() {
    const [newItem, setNewItem] = useState({ title: '', description: '', price: '', image: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'menuItems'), newItem);
            setNewItem({ title: '', description: '', price: '', image: '' });
            console.log("Item added successfully");
        } catch (error) {
            console.error("Error adding new item: ", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Staff Page</h1>
            <p>Welcome to the staff page. Here you can manage the restaurant's operations.</p>
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
                <button type="submit" className="btn btn-success">Add Item</button>
            </form>
        </div>
    );
}