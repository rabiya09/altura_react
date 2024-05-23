import './styles.scss';
import { useNavigate } from "react-router-dom";
import chair from '../../../assets/images/Chair.svg';
import sofa from '../../../assets/images/Sofa.svg';
import tables from '../../../assets/images/icon-Tables.svg';
import lighting from '../../../assets/images/Lighthing.svg';

const Nav = () => {
    const navigate = useNavigate();
    const loadCategory = (categoryName: string) => {  
       navigate("/"+categoryName);
    }
    return (
        <div className='nav-bar-container'>
    <div className='nav-bar'>
        <ul>
            <li className='new-in-li'>                
                <span className="new-in-li-image" onClick={() => loadCategory('new-in')}><a title='New In'>New In</a></span>
            </li>
            <li className='chair-li'>
                <span className='chair-li-image' onClick={() => loadCategory('chairs')}>                    
                    <img alt='Chairs' src={chair}/>                   
                </span>
            </li>
            <li className='sofa-li'>           
                <span className='sofa-li-image' onClick={() => loadCategory('sofas')}>                    
                    <img alt='Sofas' src={sofa}/>                   
                </span>    
            </li>
            <li className='table-li'>
                <span className='table-li-image' onClick={() => loadCategory('tables')}>                    
                    <img alt='Tables' src={tables}/>                  
                </span>
                <span className='table-li-text' onClick={() => loadCategory('tables')}>
                    Tables
                </span>
            </li>
            <li className='lighting-li'>
                <span className='lighting-li-image' onClick={() => loadCategory('lighting')}>                    
                    <img alt='Lighting' src={lighting}/>                  
                </span>
            </li>            
        </ul>
    </div>
</div>
    )
}

export default Nav;