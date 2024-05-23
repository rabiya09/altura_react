import './styles.scss';
import { Link } from "react-router-dom";
import bedRoom from '../../../assets/images/bedroom.svg';
import { BedRoomProps } from './models';

const BedRoom = (props: BedRoomProps) => {
    return (
        <div className="bed-room-container">
    <div className="bed-room">  
        <div className="bed-room-image">
            <img alt="Bed Room" src={bedRoom}/>
        </div>      
        <div className="bed-room-text">
            <span className="bed-room-title" data-testid="page-title">{props.title}</span>
            {props.description}
            <span className="read-more">
                <Link to='/shop-all-bed-room'>{props.readmore}</Link>
            </span>
        </div>        
    </div>
    </div>
    );

}

export default BedRoom;