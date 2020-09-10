import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { withRouter } from 'react-router-dom'

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Please enter your username.'),
  password: Yup.string().required('Please enter your password.')
})


class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      message: ""
    }
  }

  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
            <h3 className="pb-2">Meals App</h3>
          <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={loginSchema}
          onSubmit={(values, bag) => {
            //If this function is called, validation has occurred successfully
            this.props.onLogin(values.username, values.password).then(response => {
              if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data))
                localStorage.setItem("username", values.username)
              }
              this.props.onLoginSuccess()
              this.props.history.push('/meals')
              //window.location.reload()
              //return response.data
            }).catch(error => {
              const resMessage = (error.response && error.response.data && error.response.data.message) ||
              error.message || error.toString()
              this.setState({
                message: resMessage
              });
              bag.setSubmitting(false)
            })
            //console.log(values.username)

          }}>
          {({ errors, touched, isSubmitting, isValidating }) => (
            <Form>
              <div className="form-group">
                <label className="align-middle" htmlFor="username">Username</label>
                <Field name="username" type="text" className="form-control"/>
                { touched.username && errors.username &&
                  <div className="alert alert-danger mt-2">{errors.username}</div>
                }
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className="form-control"/>
                { touched.password && errors.password &&
                  <div className="alert alert-danger mt-2">{errors.password}</div>
                }
              </div>
              <div className="form-group">
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                  {(isSubmitting || isValidating) && (
                    <span className="spinner-border spinner-border-sm"/>
                  )}
                  <span>Login</span>

                </button>
              </div>
              { this.state.message &&
                <div className="alert alert-danger mt-2">
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

export default withRouter(Login);
