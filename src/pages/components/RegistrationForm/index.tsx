import React from 'react';
import './styles.scss';
// import Input from '../../common/Input';
// import Form from '../../common/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegistrationForm = () => {
  const [success, setSuccess] = React.useState(false);
const initialValues = {
  firstname: '',
  lastname: '',
  ssn: '',
  dob: '',
  contactno: '',
  altcontactno: '',
  email: '',
  password: '',
  confirmPassword: '',
  address: '',
  gender: '',
  city: '',
  state: '',
  zip: '',
  fileupload: ''
}
const validationSchema = Yup.object({
  firstname: Yup.string()
            .required('First Name Required'),
  lastname: Yup.string()
            .required('Last Name Required'),
  ssn: Yup.string()
            .required('SSN Required'),
  dob: Yup.date()
           .required('DOB Required'),
  contactno: Yup.string()
            .required('Contact Number Required'),
  altcontactno: Yup.string()
            .required('Alternate Contact Required'),
  email: Yup.string()
            .required('Email Required'),
  password: Yup.string()
            .required('Password Required'),
  confirmPassword: Yup.string()
            .required('Confirm Password Required'),  
  address: Yup.string()
               .required('Address Required')
               .max(600),
  gender: Yup.string()
            .required('Gender Required'),
  city: Yup.string()
            .required('City Required'),
  state: Yup.string()
            .required('State Required'),
  zip: Yup.string()
            .required('Zip Required'),
  fileupload: Yup.string()
            .required('File Required'),
   
});
const formik = useFormik({
   initialValues: initialValues,
   validationSchema: validationSchema,
   onSubmit: values => {
    setSuccess(true);
   },
});

return (
    <div className="registration-form">
      <div className="registration-form-box">      
        <h2>Registration form</h2>
        {success && <div className="success-message">Successfully registered!!</div>}
        {!success && 
         <form onSubmit={formik.handleSubmit}>
         <div className="form-row">   
         <div className="form-group">
       <label htmlFor="firstname">First Name</label>
       <input
         id="firstname"
         name="firstname"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.firstname}
       />
      {formik.errors.firstname ? 
      <div className="invalid-feedback">{formik.errors.firstname}</div> : null}
      </div>
      <div className="form-group">
       <label htmlFor="lastname">Last Name</label>
       <input
         id="lastname"
         name="lastname"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.lastname}
       />
      {formik.errors.lastname ? 
      <div className="invalid-feedback">{formik.errors.lastname}</div> : null}
      </div>
      <div className="form-group">
       <label htmlFor="ssn">SSN</label>
       <input
         id="ssn"
         name="ssn"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.ssn}
       />
      {formik.errors.ssn ? 
      <div className="invalid-feedback">{formik.errors.ssn}</div> : null}
      </div>
      </div>
      <div className="form-row"> 
      <div className="form-group">
      <label htmlFor="dob">Date of Birth</label>
      <input
         id="dob"
         name="dob"
         type="date"
         onChange={formik.handleChange}
         value={formik.values.dob}
      />
      {formik.errors.dob ? 
      <div className="invalid-feedback">{formik.errors.dob}</div> : null}
      </div>
      <div className="form-group">
       <label htmlFor="contactno">Contact Number</label>
       <input
         id="contactno"
         name="contactno"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.contactno}
       />
      {formik.errors.contactno ? 
      <div className="invalid-feedback">{formik.errors.contactno}</div> : null}
      </div>
      <div className="form-group">
       <label htmlFor="altcontactno">Alternate Contact Number</label>
       <input
         id="altcontactno"
         name="altcontactno"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.altcontactno}
       />
      {formik.errors.altcontactno ? 
      <div className="invalid-feedback">{formik.errors.altcontactno}</div> : null}
      </div>
      </div>
      <div className="form-row"> 
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
       <label htmlFor="password">Password</label>
       <input
         id="password"
         name="password"
         type="password"
         onChange={formik.handleChange}
         value={formik.values.password}
       />
      {formik.errors.password ? 
      <div className="invalid-feedback">{formik.errors.password}</div> : null}
      </div>
      <div className="form-group">
       <label htmlFor="confirmPassword">Confirm Password</label>
       <input
         id="confirmPassword"
         name="confirmPassword"
         type="password"
         onChange={formik.handleChange}
         value={formik.values.confirmPassword}
       />
      {formik.errors.confirmPassword ? 
      <div className="invalid-feedback">{formik.errors.confirmPassword}</div> : null}
      </div>        
      <div className="form-group">
      <label htmlFor="address">Address</label>
      <input
         id="address" name="address" type="text"
         onChange={formik.handleChange}
         value={formik.values.address} />
      {formik.errors.address ? 
      <div className="invalid-feedback">{formik.errors.address}</div> : null}
      </div> 
      <div className="form-group">
       <label htmlFor="gender">Gender</label>
       <input
         id="gender"
         name="gender"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.gender}
       />
      {formik.errors.gender ? 
      <div className="invalid-feedback">{formik.errors.gender}</div> : null}
      </div>     
      </div>
      <div className="form-row"> 
      <div className="form-group">
       <label htmlFor="city">City</label>
       <input
         id="city"
         name="city"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.city}
       />
      {formik.errors.city ? 
      <div className="invalid-feedback">{formik.errors.city}</div> : null}
      </div>
      <div className="form-group">
       <label htmlFor="state">State</label>
       <input
         id="state"
         name="state"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.state}
       />
      {formik.errors.state ? 
      <div className="invalid-feedback">{formik.errors.state}</div> : null}
      </div>
      <div className="form-group">
       <label htmlFor="zip">Zip</label>
       <input
         id="zip"
         name="zip"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.zip}
       />
      {formik.errors.zip ? 
      <div className="invalid-feedback">{formik.errors.zip}</div> : null}
      </div>
      </div>
      <div className="form-row">   
         <div className="form-group">
         <label htmlFor="fileupload">File Upload</label>
       <input
         id="fileupload"
         name="fileupload"
         type="file"
         onChange={formik.handleChange}
         value={formik.values.fileupload} 
       />
      {formik.errors.fileupload ? 
      <div className="invalid-feedback">{formik.errors.fileupload}</div> : null}
         </div>
      </div>
      <div className="form-row">   
         <div className="form-group">
      <button type="submit">Submit</button>
      </div>
      </div>
   </form> 
}
  </div>
    </div>
  );
};

export default RegistrationForm;