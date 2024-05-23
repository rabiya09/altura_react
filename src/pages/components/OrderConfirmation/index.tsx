import React from "react";
import './styles.scss';
import { Link, useNavigate, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { getOrder } from '../../../store/actions/cartActions';

const OrderConfirmation = (props: any) => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [pageData, setPageData] = React.useState(Object);
    const [pageId, setPageId] = React.useState(useParams()); 
    React.useEffect(() => {        
       props.getOrder();
    },[]);
    return (
    <div className="cart-container">
        <div className="cart-box">
    <div className="page-title">Order Confirmation</div>
    <div>Thank you for your order!!</div>
    <div>Your Oder Number : {props.invoiceNumber}</div>
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
</div>
</div>
)
}

const mapStateToProps = (state: any)=>{
    return {
      items: state.items,
      total: state.total,
      invoiceDate: state.invoiceDate,
      invoiceNumber: state.invoiceNumber
    }
  }
const mapDispatchToProps= (dispatch: any)=>{    
    return{
        getOrder: ()=>{dispatch(getOrder())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);