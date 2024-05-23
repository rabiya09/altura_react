import React from "react";
import './styles.scss';
import { useNavigate, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { getCart, placeOrder } from '../../../store/actions/cartActions';

const SelectPayment = (props: any) => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [pageData, setPageData] = React.useState(Object);
    const [selectedPayment, setselectedPayment] = React.useState('');
    const [mandatoryDetail, setmandatoryDetail] = React.useState('');    
    const [pageId, setPageId] = React.useState(useParams());  
    const [ccnumber, setccnumber] = React.useState('');
    const [upinumber, setupinumber] = React.useState('');

   const onPaymentSubmit = async (e: any) => {  
    e.preventDefault();  
    let valid = true;
    if((selectedPayment === "UPI") && (upinumber === "")){
      setmandatoryDetail('UPI Number Required');
      valid = false;
    } else if ((selectedPayment === "CC") && (ccnumber === "")){
      setmandatoryDetail('Credit Card Number Required');
      valid = false;
    }
    if(valid) {
      navigate("/order-confirmation");
      props.placeOrder();
    }
    }
    const onItemChange = (item: string) => {
        setselectedPayment(item);
    }
    const onPaymentReset = () => {        
    }
    
    return (
        <div className="payment-form-container">
    <div className="payment-form">
        <form onSubmit={onPaymentSubmit}>  
        <div className="form-row"> 
        <div className="form-group">
            <div className="cc-block">
                <label>
                    <input type="radio" value="CC" name="paymentmethod" onClick={()=> onItemChange('CC')}
                   defaultChecked={true}/>
                      <span>Credit Card</span>
                  </label>
                  <input type="text" name="ccno" className="form-control cc-no-selector"                 
         placeholder="Enter Credit Card Number" value={ccnumber}
         onChange={(e) => setccnumber(e.target.value)}/>
            </div>
            <div className="upi-block">
                <label>
                    <input type="radio" value="UPI" name="paymentmethod" onClick={()=> onItemChange('UPI')}/>
                      <span>UPI</span>
                  </label>
                  <input type="text" name="upino" className="form-control upi-no-selector"
                  placeholder="Enter UPI Number" value={upinumber}
                  onChange={(e) => setupinumber(e.target.value)}/>                               
            </div>
            <div>
            </div>
          <div className="mandatory-validation">{mandatoryDetail}</div>
        </div>
        </div>

          <div className="hr-line">
            <hr/>
          </div>
          
          <div className="form-row"> 
            <div className="form-group">
              <button type="submit" className="btn btn-primary" title="Place Order">Review Order</button>
              <button type="button" onClick={()=> onPaymentReset()} className="btn btn-warning float-right" title="Reset">Reset</button>
            </div>
        </div>
    </form>
    </div>
</div>
    )
}

const mapStateToProps = (state: any)=>{
    return {
      items: state.items,
      total: state.total,
    }
  }
const mapDispatchToProps= (dispatch: any)=>{
    
    return{
      placeOrder: ()=>{dispatch(placeOrder())},
      getCart: ()=>{dispatch(getCart())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectPayment);