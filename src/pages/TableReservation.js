import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase/config';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './TableReservation.css'; // Import the CSS file
import Footer from '../components/Footer.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function TableReservation() {
    const [reservation, setReservation] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        people: '',
        specialRequests: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservation({ ...reservation, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'reservations'), reservation);
            console.log('Reservation submitted:', reservation);
            setReservation({
                name: '',
                email: '',
                date: '',
                time: '',
                people: '',
                specialRequests: ''
            });
        } catch (error) {
            console.error('Error submitting reservation:', error);
        }
    };

    return (
        <>
        <div className="container reservation-container mt-5">
            <h1>Table Reservation</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={reservation.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={reservation.email} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" name="date" value={reservation.date} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="time" className="form-label">Time</label>
                    <input type="time" className="form-control" id="time" name="time" value={reservation.time} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="people" className="form-label">Number of People</label>
                    <input type="number" className="form-control" id="people" name="people" value={reservation.people} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="specialRequests" className="form-label">Special Requests</label>
                    <textarea className="form-control" id="specialRequests" name="specialRequests" value={reservation.specialRequests} onChange={handleInputChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit Reservation</button>
            </form>
        </div>
        <Footer />
        </>
    );
}