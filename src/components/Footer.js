import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { FaFacebook, FaGoogle, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <>
        
        <footer class="text-white text-center text-lg-start" style={{backgroundColor: '#0b0b0b'}}>
            <div class="container p-4 remove-margin">
                <div class="row mt-4">
                    <div class="col-lg-4 col-md-12 mb-4 mb-md-0">
                        <h5 class="text-uppercase mb-4">About Two's</h5>

                        <p>Sa Marikina to. Masarap dito man promise. Sarado nga lang pag Wednesday. BUY TWOS.</p>

                        <div class="mt-4">
                            <a type="button" href="https://www.facebook.com/buytwos" target="_blank" rel="noreferrer" className="social-icons"><FaFacebook size={40} color="#3b5998" /></a>
                            <a type="button" href="https://www.instagram.com/buytwos" target="_blank" rel="noreferrer" className="social-icons"><FaInstagram size={44} color="#E1306C" /></a>
                            <a type="button" href="https://g.co/kgs/LiC9DpB" target="_blank" rel="noreferrer" className="social-icons"><FaGoogle size={35} color="#4285F4" /></a>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                        <ul class="fa-ul" style={{marginLeft: "1.65em"}}>
                            <li class="mb-3">
                            <span class="fa-li"><i class="fas fa-home"></i></span><span class="ms-2">18 Col Divino, Marikina, 1800 Metro Manila</span>
                            </li>
                            <li class="mb-3">
                            <span class="fa-li"><i class="fas fa-envelope"></i></span><span class="ms-2">twosmarikina@example.com</span>
                            </li>
                            <li class="mb-3">
                            <span class="fa-li"><i class="fas fa-phone"></i></span><span class="ms-2">0920 864 8980</span>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase mb-4">Opening hours</h5>
                        <p>Monday - Tuesday: 4PM - 10PM</p>
                        <p>Wednesday: CLOSED</p>
                        <p>Thursday - Sunday: 4PM - 10PM</p>
                    </div>
                </div>
            </div>
            <div class="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
            © 2024 Copyright:
            <a class="text-white" href="https://www.facebook.com/buytwos" target="_blank" rel="noreferrer" style={{textDecoration: "none"}}> Two's Marikina</a>
            </div>
            </footer>
        
        
        
        
        </>
    );
}