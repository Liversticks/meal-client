import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom'

//Adjust validation constraints
const signupSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(10, 'Password must be at least 10 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Must confirm password')
});


class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h3 className="pb-2">Signup</h3>
              <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
              }}
              validationSchema={signupSchema}
              onSubmit={(values, bag) => {
                //Send data to the server
                //TEMP
                this.props.onSignup(values.username, values.email, values.password).then(response => {
                  if (response.data.message && response.data.message === 'Signed up successfully!') {
                    this.setState({
                      message: response.data.message
                    })
                    setTimeout(() => { this.props.history.push('/login') }, 2000)
                  }
                }).catch(error => {
                  const resMessage = (error.response && error.response.data && error.response.data.message) ||
                  error.message || error.toString()
                  this.setState({
                    message: resMessage
                  });
                  bag.setSubmitting(false)
                })
              }}
              >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Field name="username" type="text" className='form-control'/>
                    {touched.username && errors.username && <div className="alert alert-danger mt-2">{errors.username}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <Field name="email" type="text" className='form-control'/>
                    {touched.email && errors.email && <div className="alert alert-danger mt-2">{errors.email}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" className='form-control'/>
                    {touched.password && errors.password && <div className="alert alert-danger mt-2">{errors.password}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field name="confirmPassword" type="password" className='form-control'/>
                    {touched.confirmPassword && errors.confirmPassword && <div className="alert alert-danger mt-2">{errors.confirmPassword}</div>}
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary mr-2">Sign Up</button>
                    <button type="reset" className="btn btn-secondary">Reset</button>
                  </div>
                  { this.state.message &&
                    <div className={this.state.message === 'Signed up successfully!' ? "alert alert-success mt-2" : "alert alert-danger mt-2" }>
                      {this.state.message}
                    </div> }
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default withRouter(Signup);
