import React from "react";
import products from '../../../assets/data/products.json';
import { Link } from "react-router-dom";

const ProductList = () => {
    const [pageData, setPageData] = React.useState(Array); 
    React.useEffect(() => {        
     setPageData(products);
    },[]);

    return (
            <div className="new-in-container">
            <div className="new-in">Chairs</div>
                <div className="product-box-card-container">
                <div className="product-box">
                  {pageData.length===0 && <div className="product-details-empty">No Products Available</div>}          
                  {pageData?.map((cart: any, index: number) => {
                 return(
                 <>                 
                 <div className="product-box-card">
                    <div className="product-box-img-box">
                    <Link to={`/product-details/${cart.id}`}>
                        <img className="product-box-img" src={cart?.imageUrl} alt={cart?.name}/>
                    </Link>
                  </div>
                    <div className="product-name"><Link to={`/product-details/${cart.id}`}>{cart?.name}</Link></div>
                    <div className="product-price">{cart?.price}</div>
                  </div>
                  </>
                  )})
                 }       
                </div>
                </div>
                </div> 
          )      
}

export default ProductList;