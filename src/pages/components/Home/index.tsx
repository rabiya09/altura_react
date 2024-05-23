import './styles.scss';
import BedRoom from "../BedRoom";
import HomeOffice from "../HomeOffice";
import NewIn from "../NewIn";
import ProductBanner from "../ProductBanner";
import Header from '../../common/Header';
import { getProps } from '../BedRoom/tests/__fakes__';
import { getHomeOfficeProps } from '../HomeOffice/tests/__fakes__';

const Home = () => {
    const fields = getProps();
    const homeoffice = getHomeOfficeProps();
    return <div>
       <ProductBanner/>
       <NewIn/>
       <HomeOffice title={homeoffice.title} description={homeoffice.description} readmore={homeoffice.readmore}/>
       <BedRoom title={fields.title} description={fields.description} readmore={fields.readmore}/>       
    </div>
}

export default Home;