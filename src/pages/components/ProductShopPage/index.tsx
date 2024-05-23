import React from "react";
import './styles.scss';
import { useNavigate, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import products from '../../../assets/data/products.json';
import { addToCart, getCart } from '../../../store/actions/cartActions';

const ProductShopPage = (props: any) => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [pageData, setPageData] = React.useState(Object);
    const [pageId, setPageId] = React.useState(useParams());
    React.useEffect(() => {        
       const filteredData = products.filter(item => item.id == Number(pageId.id));      
       setPageData(filteredData);
      },[]);
      
    const handleAddToCart = (productObj: any) => {
        props.addToCart(productObj); 
        navigate("/cart");
    }
  
   const imgPath = `../${pageData?.[0]?.imageUrl}`;
    return (
    <div className="product-detail-container">
        <div className="product-details">
        <div className="product-details-box-card" >
        <div className="product-details-img-box">
        <img alt={pageData?.[0]?.name} title={pageData?.[0]?.name} 
        className="product-details-img" src={imgPath}/>
      </div>
      <div className="product-details-name">{pageData?.[0]?.name}</div>
      <div className="product-details-price">{pageData?.[0]?.price}</div>      
        </div>
        <div className="add-product-to-cart">
      <button onClick={(e) => handleAddToCart(pageData?.[0])} className="btn btn-success" title="Add To Cart">Add To Cart</button>
    </div>
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
        addToCart: (productObj:any)=>{dispatch(addToCart(productObj))},
        getCart: () =>{dispatch(getCart())},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductShopPage);