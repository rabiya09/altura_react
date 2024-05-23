import './styles.scss';
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/images/logo.svg';
import account from '../../../assets/images/account_circle.svg';
import call from '../../../assets/images/call.svg';

const Header = () => {
const navigate = useNavigate();   
const loadRegister = ()=> {
    navigate("/register");
}
const loadProductDetails = ()=> {
    navigate("/product-list");
}
const loadDashboard = ()=> {    
    navigate("/dashboard");
}
const loadCart = ()=> {
    navigate("/cart");    
}
const logout = ()=> {
    localStorage.setItem('authenticated', 'false');
    navigate("/login");    
}
const loadHomePage = ()=> {
    navigate("/");    
}
return (
    <div className='header-bar-container'>
    <div className='header-bar'>
    <div className='header-logo-container'>
    <span className='header-logo-image'><a title='Altura' onClick={() => loadHomePage()}><img alt='Altura' src={logo}/></a></span>
    <span className='header-logo-text'><a title='Altura' data-testid="app-name" onClick={() => loadHomePage()}>ALTURA</a></span>
    </div>
    <div className='header-menu-container'>
        <div className='dropdown mobiledropdown'>
            <button className='dropbtn mobile-view'>
                <div className='hamburger-menu'>
                    <div className='hamburger'></div>
                    <div className='hamburger'></div>
                    <div className='hamburger'></div> 
                    </div>
            </button>
            <div className='dropdown-content'>
                <a onClick={() => loadRegister()}>Register</a>
                <a onClick={() => loadProductDetails()}>Products</a>
                <a onClick={() => loadDashboard()}>Dashboard</a>
                <a onClick={() => loadCart()}>Cart</a>
                <a onClick={() => logout()}>Logout</a>
            </div>
        </div>
    <ul className='header-menu-ul'>
        <li className='register-li'><a title='Register' onClick={() => loadRegister()}>Register</a></li>
        <li className='product-details-li'><a onClick={() => loadProductDetails()} title='Product Details'>Product Details</a></li>
    </ul>
    <div className='search-container'><input type='text' placeholder='search' title='Search'/></div>
    <div className='icon-container'>
        <ul>
            <li className='user-icon'>
                <div className='dropdown'>
                    <button className='dropbtn'>                    
                        <img alt='User Details' title='User Details' src={account}/>                  
                    </button>
                    <div className='dropdown-content'>
                    <a onClick={() => loadDashboard()}>Dashboard</a>
                    <a onClick={() => loadCart()}>Cart</a>
                    <a onClick={() => logout()}>Logout</a>
                    </div>
                </div>
            </li>
            <li><a><img alt='Call' title='Call' src={call}/></a></li>
        </ul>
    </div>
    </div>
    </div>
    </div>
)
}

export default Header;