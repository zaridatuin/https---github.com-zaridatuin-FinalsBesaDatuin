import { Link, useNavigate, NavLink } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import DeleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'

import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer.js';

import { UserContext } from "../context/UserContext";


import './Home.css'
import {deleteArticle, getArticles} from "../services/articleService";

export default function Home() {

  const [articles, setArticles] = useState(null);
  const [search, setSearch] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
      const unsubscribe = getArticles(setArticles)
      return ()=> unsubscribe();
   },[])
  
  const handleDelete = async (id) => {
    await deleteArticle(id);
  }

  const handleEdit = async (id) => {
    navigate(`/edit/${id}`)
  }

  const { user } = useContext(UserContext);
  return (
    <>
    <div className="home">
      <Carousel className="carousel-class">

        <Carousel.Item>
          <div className="img-container">
            <img src="../img/B1.jpg" alt='B1' />
          </div>
          <Carousel.Caption>
            <h3>Classic Burger</h3>
            <p>Beef Patty w/ Cheese, Tomato, Lettuce, Onions, Sauce #2, Brioche Bun</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img-container">
            <img src="../img/B8.jpg" alt='B8' />
          </div>
          <Carousel.Caption>
            <h3>PB Bacon Burger</h3>
            <p>Beef Patty w/ Cheese, Peanut Butter, Maple Syrup, Bacon, Brioche Bun</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img-container">
            <img src="../img/B5.jpg" alt='B5' />
          </div>
          <Carousel.Caption>
            <h3>Surf & Turf</h3>
            <p>Beef Patty w/ Cheese, Garlic Buttered Shrimps w/ Crabfat Sauce, Lettuce</p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>

      <div className="about-part">
        <div className="about-tab left-about-tab">
          <h1>About Us</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <iframe title="twosmap" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=twos&zoom=13&maptype=roadmap"></iframe>
        </div>

        <div className="about-tab right-about-tab">
          <NavLink to={user ? "/menu" : "/login"}>
            <div className="view-menu right-tabs">
              <h1>View Menu</h1>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </div>
          </NavLink>

          <NavLink to={user ? "/reservation" : "/login"}>
            <div className="view-reservation right-tabs">
              <h1>Reserve Tables</h1>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </div>
          </NavLink>

          <NavLink to={user ? "/feedback" : "/login"}>
            <div className="view-feedback right-tabs">
              <h1>Customer Reviews</h1>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </div>
          </NavLink>
        </div>
      </div>

    </div>

    <Footer />

    </>
  )
}
