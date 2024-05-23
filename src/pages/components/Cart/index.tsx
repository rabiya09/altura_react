import React from "react";
import './styles.scss';
import { Link, useNavigate, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { getCart, removeItem } from '../../../store/actions/cartActions';

const Cart = (props: any) => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [pageData, setPageData] = React.useState(Object);
    const [pageId, setPageId] = React.useState(useParams());    
    const proceedToCheckout = () => {
        navigate("/checkout");
    }   
   const removeProduct = (id: number) => {
        props.removeItem(id); 
    }
    return (
        <div className="cart-container">
        <div className="cart-box">
        <div className="page-title">Cart</div>
       {props.items?.map((cart: any, index: number) => {
        return (
            <div className="cart-tile" key={index}>
                <div className="img-container">        
                    <span className="product-image">
                    <img src={cart.imageUrl} alt={cart.name}/>
                    </span>
                </div>
                <div className="details-container">        
                    <div className="product-name">{cart.name}</div>
                    <div className="price-container">Price: <span>{cart.price}</span></div>    
                </div>
                <div className="delete-container"><button onClick={() => removeProduct(cart.id)}>Delete Item </button></div>
            </div>
            );
            })
            }             
    </div>
    <div className="summary-container">
        <div className="total"><span>Total:</span>{props.total}</div>
        <button onClick={(e) => proceedToCheckout()}>Proceed to Checkout</button>
    </div>
    </div>
)
}

const mapStateToProps = (state: any)=>{
    return {
      items: state.items,
      total: state.total
    }
  }
const mapDispatchToProps= (dispatch: any)=>{    
    return{
        removeItem: (id:number)=>{dispatch(removeItem(id))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);