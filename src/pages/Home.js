import { Link, useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react';
import DeleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'

import Carousel from 'react-bootstrap/Carousel';

// styles
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

  return (
    <>
    <div className="home">
      <Carousel className="carousel-class">

        <Carousel.Item>
          <div className="img-container">
            <img src="../img/B1.jpg" alt='B1' />
          </div>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img-container">
            <img src="../img/B8.jpg" alt='B8' />
          </div>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img-container">
            <img src="../img/B5.jpg" alt='B5' />
          </div>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
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
          <div className="view-menu right-tabs">
            <h1>View Menu</h1>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </div>
          <div className="view-reservation right-tabs">
            <h1>Reserve Tables</h1>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </div>
          <div className="view-feedback right-tabs">
            <h1>Customer Reviews</h1>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </div>
        </div>
      </div>

    </div>
    <div className="contact-part">
    </div>
    </>
  )
}
