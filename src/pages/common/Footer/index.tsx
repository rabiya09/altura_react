import React from "react";
import './styles.scss';
import { Link } from "react-router-dom";
import logo from '../../../assets/images/LogoFooter.svg';

const Footer = () => {

    return (
        <div className="footer-box">
    <div className="footer-logo-box">
        <div className="footer-logo">
          <img src={logo} alt="Footer Logo"/>
          <span className="footer-logo-text">ALTURA</span>
        </div>        
    </div>
        <div className="footer-link-first footer-links">
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/'>Fill Form</Link></li>
            <li><Link to='/'>See Other Details</Link></li>
            <li>Our Products</li>
            <li>Help</li>
        </ul>
        </div> 
        <div className="footer-link-second">
            <ul>
                <li><Link to='/'>New In</Link></li>
                <li><Link to='/sofas'>Sofas</Link></li>
                <li><Link to='/tables'>Tables</Link></li>
                <li><Link to='/chairs'>Chairs</Link></li>
                <li><Link to='/lighting'>Lighting</Link></li>
            </ul>
        </div> 
        <div className="footer-link-third">
            <ul>
                <li>Visit Our Stores</li>
                <li>UB City</li>
                <li>Sun City</li>
                <li>White Town</li>
                <li>Cape City</li>
            </ul>
        </div> 
</div>
    );
}

export default Footer;