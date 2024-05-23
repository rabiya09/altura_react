
import { useNavigate } from "react-router-dom";
import './styles.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Checkout = (props: any) => {
const navigate = useNavigate(); 
const initialValues = {
   name: '',
   email: '',
   contactno: '',
   billingaddressline1: '',
   billingaddressline2: '',
   billingcity: '',
   billingstate: '',
   billingpincode: '',
   shippingaddressline1: '',
   shippingaddressline2: '',
   shippingcity: '',
   shippingstate: '',
   shippingpincode: ''
}
const validationSchema = Yup.object({
    name: Yup.string()
             .required('Name Required')
             .max(50),
    email: Yup.string()
              .required('Email Required'),
    contactno: Yup.string()
              .required('Contact Number Required'),
    billingaddressline1: Yup.string()
              .required('Addresss Line 1 Required')
              .max(600),
    billingaddressline2: Yup.string()
                .required('Addresss Line 2 Required')
                .max(600),
    billingcity: Yup.string()
                .required('City Required'),    
    billingstate: Yup.string()
                .required('State Required'),
    billingpincode: Yup.string()
                .required('PinCode Required'),
    shippingaddressline1: Yup.string()
                .required('Addresss Line 1 Required')
                .max(600),
    shippingaddressline2: Yup.string()
                  .required('Addresss Line 2 Required')
                  .max(600),
    shippingcity: Yup.string()
                  .required('City Required'),    
    shippingstate: Yup.string()
                  .required('State Required'),
    shippingpincode: Yup.string()
                  .required('PinCode Required'),
});
const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      navigate("/order-review");
    },
});

  return (
    <div className="checkout-form">
    <div className="checkout-form-box">  
     <form id="checkout-form" onSubmit={formik.handleSubmit}>
     <div className="form-row">   
         <div className="form-group">
       <label htmlFor="name">Name</label>
       <input
         id="name"
         name="name"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.name}
       />
      {formik.errors.name ? 
      <div className="invalid-feedback">{formik.errors.name}</div> : null}
      </div>
      <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? 
      <div className="invalid-feedback">{formik.errors.email}</div> : null}
      </div>
      <div className="form-group">
      <label htmlFor="contactno">Contact Number</label>
      <input
         id="contactno"
         name="contactno" type="text"
         onChange={formik.handleChange}
         value={formik.values.contactno}
      />
      {formik.errors.contactno ? 
      <div className="invalid-feedback">{formik.errors.contactno}</div> : null}
      </div>
      </div>
      <div className="form-row"> 
      <div className="form-group address-title">
        Billing Address
      </div>
      </div>
      <div className="form-row">   
      <div className="form-group">
      <label htmlFor="billingaddressline1">Address Line 1</label>
       <input
         id="billingaddressline1"
         name="billingaddressline1"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.billingaddressline1}
       />
      {formik.errors.billingaddressline1 ? 
      <div className="invalid-feedback">{formik.errors.billingaddressline1}</div> : null}
      </div>
      <div className="form-group">
      <label htmlFor="billingaddressline2">Address Line 2</label>
       <input
         id="billingaddressline2"
         name="billingaddressline2"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.billingaddressline2}
       />
      {formik.errors.billingaddressline2 ? 
      <div className="invalid-feedback">{formik.errors.billingaddressline2}</div> : null}
      </div>
      <div className="form-group">
      <label htmlFor="billingcity">City</label>
       <input
         id="billingcity"
         name="billingcity"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.billingcity}
       />
      {formik.errors.billingcity ? 
      <div className="invalid-feedback">{formik.errors.billingcity}</div> : null}
      </div>
      </div>

      <div className="form-row">   
      <div className="form-group">
      <label htmlFor="billingstate">State</label>
       <input
         id="billingstate"
         name="billingstate"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.billingstate}
       />
      {formik.errors.billingstate ? 
      <div className="invalid-feedback">{formik.errors.billingstate}</div> : null}
      </div>
      <div className="form-group">
      <label htmlFor="billingpincode">Pincode</label>
       <input
         id="billingpincode"
         name="billingpincode"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.billingpincode}
       />
      {formik.errors.billingpincode ? 
      <div className="invalid-feedback">{formik.errors.billingpincode}</div> : null}
      </div>
      </div>

      <div className="form-row"> 
      <div className="form-group address-title">
        Shipping Address
      </div>
      </div>

      <div className="form-row">   
      <div className="form-group">
      <label htmlFor="shippingaddressline1">Address Line 1</label>
       <input
         id="shippingaddressline1"
         name="shippingaddressline1"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.shippingaddressline1}
       />
      {formik.errors.shippingaddressline1 ? 
      <div className="invalid-feedback">{formik.errors.shippingaddressline1}</div> : null}
      </div>
      <div className="form-group">
      <label htmlFor="shippingaddressline2">Address Line 2</label>
       <input
         id="shippingaddressline2"
         name="shippingaddressline2"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.shippingaddressline2}
       />
      {formik.errors.shippingaddressline2 ? 
      <div className="invalid-feedback">{formik.errors.shippingaddressline2}</div> : null}
      </div>
      <div className="form-group">
      <label htmlFor="shippingcity">City</label>
       <input
         id="shippingcity"
         name="shippingcity"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.shippingcity}
       />
      {formik.errors.shippingcity ? 
      <div className="invalid-feedback">{formik.errors.shippingcity}</div> : null}
      </div>
      </div>

      <div className="form-row">   
      <div className="form-group">
      <label htmlFor="shippingstate">State</label>
       <input
         id="shippingstate"
         name="shippingstate"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.shippingstate}
       />
      {formik.errors.shippingstate ? 
      <div className="invalid-feedback">{formik.errors.shippingstate}</div> : null}
      </div>
      <div className="form-group">
      <label htmlFor="shippingpincode">Pincode</label>
       <input
         id="shippingpincode"
         name="shippingpincode"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.shippingpincode}
       />
      {formik.errors.shippingpincode ? 
      <div className="invalid-feedback">{formik.errors.shippingpincode}</div> : null}
      </div>
      </div>

      <div className="form-row">   
      <div className="form-group">
      <button type="submit">Submit</button>     
      </div>
      </div>
   </form>
   </div>
   </div>
  );
}

export default Checkout;