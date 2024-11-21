import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from '../firebase/config';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Menu.css'; // Import custom CSS

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);

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

    return (
        <div className="container">
            <h1>Menu</h1>
            <p>Here you can find our delicious menu items.</p>
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