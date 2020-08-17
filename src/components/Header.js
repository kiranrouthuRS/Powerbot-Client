import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Header = () => {
    return (
        <nav>
            <div className= "nav-wrapper" style={{backgroundColor: '#ffffff'}}>
                <Link to={'/'} className="brand-logo left-align"><img src={logo} alt="" style={{width: '180px', height: '50px', marginLeft: 10, marginTop: 5}} className="" /></Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to={'/clinic'} className="black-text">Home</Link></li>
                    <li><Link to={'/about'}  className="black-text">About</Link></li>
                    <li><Link to={'/clinic'} className="black-text">Customers</Link></li>
                    <li><Link to={'/about'}  className="black-text">Suppliers</Link></li>
                    <li><Link to={'/clinic'} className="black-text">Product</Link></li>
                    <li><Link to={'/about'}  className="black-text">Career</Link></li>
                    <li><Link to={'/clinic'} className="black-text">Contact</Link></li>
                    <li><Link to={'/about'}  className="black-text">English</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;