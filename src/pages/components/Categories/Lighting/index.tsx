import React from "react";
import './styles.scss';
import { Link, useNavigate, useParams } from "react-router-dom";
import products from '../../../../assets/data/products.json';

const Lighting = (props: any) => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [pageData, setPageData] = React.useState(Array); 
   React.useEffect(() => {        
    const filteredData = products.filter((item: { category: string; }) => item.category === 'Lighting');
    setPageData(filteredData);
   },[]);
  
    return (
    <div className="new-in-container">
    <div className="new-in">Lighting</div>
        <div className="product-box-card-container">
        <div className="product-box">
          {pageData.length===0 && <div className="product-details-empty">No Products Available in Lighting</div>}          
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

export default Lighting;