import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Feedback.css';
import Footer from '../components/Footer'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Feedback() {
    const [feedback, setFeedback] = useState({ name: '', review: '', rating: 0 });
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'reviews'));
                const reviewsData = querySnapshot.docs.map(doc => doc.data());
                setReviews(reviewsData);
            } catch (error) {
                console.error("Error fetching reviews: ", error);
            }
        };
        fetchReviews();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value });
    };

    const handleRatingChange = (e) => {
        setFeedback({ ...feedback, rating: parseInt(e.target.value) });
    };

    const handleStarClick = (rating) => {
        setFeedback({ ...feedback, rating });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'reviews'), feedback);
            setFeedback({ name: '', review: '', rating: 0 });
            const querySnapshot = await getDocs(collection(db, 'reviews'));
            const reviewsData = querySnapshot.docs.map(doc => doc.data());
            setReviews(reviewsData);
            console.log("Feedback submitted successfully");
        } catch (error) {
            console.error("Error submitting feedback: ", error);
        }
    };

    return (
        <>
        <div className="container feedback-container mt-5">
            <h1>Customer Reviews</h1>
            <button className="btn btn-secondary mt-4" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Hide Feedback Form' : 'Leave Feedback'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={feedback.name} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} onClick={() => handleStarClick(star)}>
                                    {star <= feedback.rating ? '★' : '☆'}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="review" className="form-label">Review</label>
                        <textarea className="form-control" id="review" name="review" value={feedback.review} onChange={handleInputChange} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-secondary">Submit Feedback</button>
                </form>
            )}
            <div className="reviews mt-5">
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <h5>{review.name}</h5>
                        <p>Rating: {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                        <p>{review.review}</p>
                    </div>
                ))}
            </div>
        </div>
        
        <Footer />
        </>
    );
}