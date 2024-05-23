import './styles.scss';
import { Link } from "react-router-dom";
import products from '../../../assets/data/products.json';
import ProductShopPage from "../ProductShopPage";
import React from 'react';

const NewIn = () => {
const imgPath = '../../';
const loadDetailPage = (id: any) => {
    return <ProductShopPage props={id}/>
}

return (
<>        
<div className="new-in-container">
    <div className="new-in">New In</div>
    <div className="product-box-card-container">
    {products?.map(function(product: any, index: number) {    
         return (
          <React.Fragment key={index}>           
          { index < 4 && <div className="product-box-card" key={index}>
            <div className="productcard-img-box">
              <Link to={`/product-details/${product.id}`}>
                <img alt={product?.name} className="productcard-img" src={`../../${product?.imageUrl}`}/>
              </Link>
              </div>
              <div className="product-name"><Link to={`/product-details/${product.id}`}>{product?.name}</Link></div>
              <div className="product-price">{product?.price}</div>
            </div>}
          </React.Fragment>
    )
    })}
    </div>
    </div>
    <div className="hr-line">
      <hr/>
    </div>
 </>
)
}

export default NewIn;