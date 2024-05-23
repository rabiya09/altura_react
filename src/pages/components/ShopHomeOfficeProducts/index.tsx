import React from "react";
import './styles.scss';
import { Link } from "react-router-dom";
import products from '../../../assets/data/products.json';
import ProductShopPage from "../ProductShopPage";

const NewIn = () => {
  const [pageData, setPageData] = React.useState(Array); 
  React.useEffect(() => {        
   const filteredData = products.filter((item: { category: string; }) => (item.category === 'Table' || item.category === 'Chair'));
   setPageData(filteredData);
  },[]);
  const loadDetailPage = (id: any) => {
      return <ProductShopPage props={id}/>
  }
    return (
        <>        
<div className="new-in-container">
  <div className="new-in">Shop - All Home/Office Products</div>
    <div className="product-box-card-container">
    {pageData.map(function(product: any, index: number) {
          return (
            <>           
      {<div className="product-box-card" key={index}>
        <div className="productcard-img-box">
        <Link to={`/product-details/${product.id}`}>
            <img alt={product?.name} className="productcard-img" src={`../../${product?.imageUrl}`}/>
          </Link>
        </div>
        <div className="product-name"><Link to={`/product-details/${product.id}`}>{product?.name}</Link></div>
        <div className="product-price">{product?.price}</div>
      </div>}
      </>
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