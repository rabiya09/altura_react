import './styles.scss';
import banner1 from '../../../assets/images/banner-image 2.svg';
import banner2 from '../../../assets/images/banner-image 1.svg';

const ProductBanner = () => {
    return (
        <div className="banner-container">
    <div className="banner">
    <div className="office-chair-rate">
        Office Chair 
        from
        <span>$50</span>
    </div>
    <div className="office-chair-image"><img alt="Banner - Chair" src={banner1}/></div>
    <div className="middle-banner">2 great furniture on sale!
    <span>Deal will close in 2 days</span></div>
    <div className="sectionals-rate">Sectionals 
        <span> from</span>
        <span>$100</span>
    </div>
    <div className="sectionals-image"><img alt="Banner - Sofa" src={banner2}/></div>
    </div>
</div>
    );
}

export default ProductBanner;