import {Navigate, Outlet} from 'react-router-dom';	

const useAuth = () => {
	const user = localStorage.getItem('authenticated');
	if ( user ) {
		return true;
	} else {
		return false;
	}
}	

const  ProtectedRoutes=(props:any) =>{
	localStorage.setItem('lvp', props.lvps);
	const auth = useAuth();
	return auth?<Outlet/>: <Navigate to="/login"/>
}	

export default ProtectedRoutes; 