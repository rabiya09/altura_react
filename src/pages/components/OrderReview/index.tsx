import React from "react";
import './styles.scss';
import { useNavigate, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { getCart } from '../../../store/actions/cartActions';

const OrderReview = (props: any) => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [pageData, setPageData] = React.useState(Object);
    const [pageId, setPageId] = React.useState(useParams());    
      const proceedToPayment = () => {
        navigate("/select-payment");
    }   
    return (
    <div className="cart-container">
        <div className="cart-box">
    <div className="page-title">Order Review</div>
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
    <div className="price-container">
        Price: <span>{cart.price}</span> 
    </div>    
</div>
<div className="delete-container"></div>
</div>
            );
            })
            }              
</div>
<div className="summary-container">
    <div className="total"><span>Total:</span>{props.total}</div>
    <button onClick={(e) => proceedToPayment()}>Place Order</button>
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
        getCart: ()=>{dispatch(getCart())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderReview);