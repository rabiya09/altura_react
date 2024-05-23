import './styles.scss';
import { Link } from "react-router-dom";
import homeoffice from '../../../assets/images/homeoffice.svg';
import { HomeOfficeProps } from './models';

const HomeOffice = (props: HomeOfficeProps) => {
    return (
        <div className="home-office-container">
    <div className="home-office">        
        <div className="home-office-text">
            <span className="home-office-title" data-testid="page-title">{props.title}</span>
            {props.description}
            <span className="read-more"><Link to='/shop-all-home-office'>{props.readmore}</Link></span>
        </div>
        <div className="home-office-image">
            <img src={homeoffice} alt="Home Office"/>
        </div>
    </div>
</div>
    );
}

export default HomeOffice;