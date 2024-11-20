import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from '../firebase/config'; 


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ title: '', description: '', price: '', image: '' });
    const [showForm, setShowForm] = useState(false);
    const [imageFile, setImageFile] = useState(null);

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

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
        console.log("Selected image file:", e.target.files[0]);
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = '';
            if (imageFile) {
                console.log("Uploading image...");
                const imageRef = ref(storage, `images/${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
                console.log("Image uploaded successfully:", imageUrl);
            }
            await addDoc(collection(db, 'menuItems'), { ...newItem, image: imageUrl });
            setNewItem({ title: '', description: '', price: '', image: '' });
            setImageFile(null);
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
        <div>
            <h1>Menu</h1>
            <p>Here you can find our delicious menu items.</p>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add New Item'}
            </button>
            {showForm && (
                <form onSubmit={handleAddItem}>
                    <input type="text" name="title" value={newItem.title} onChange={handleInputChange} placeholder="Title" required />
                    <input type="text" name="description" value={newItem.description} onChange={handleInputChange} placeholder="Description" required />
                    <input type="number" name="price" value={newItem.price} onChange={handleInputChange} placeholder="Price" required />
                    <input type="file" onChange={handleImageChange} required />
                    <button type="submit">Add Item</button>
                </form>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {menuItems.map((item, index) => (
                    <div key={index} style={{ flex: '1 0 30%', margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
                        <img src={item.image} alt={item.title} style={{ width: '100%' }} />
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p><strong>${item.price}</strong></p>
                    </div>
                ))}
            </div>
        </div>
    );
}