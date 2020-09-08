import React from 'react'
import { Modal, Button, Row } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import MealService from '../../requests/meals'
import moment from 'moment'

const formSchema = Yup.object().shape({
  description: Yup.string().required('Please describe your meal.'),
  date: Yup.string().required(),
  type: Yup.string().required()
})

function BlankInnerModal(props) {
  const formattedDate = moment(props.blob.date, "MM-DD-YYYY").format("MMMM Do")
  const formattedType = props.blob.type.charAt(0).toUpperCase() + props.blob.type.slice(1)
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {formattedType} for {formattedDate}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
        initialValues={{
          date: props.blob.date,
          type: props.blob.type,
          description: ''
        }}
        validationSchema={formSchema}
        onSubmit={ (values, bag) => {
          console.log(values)
          bag.setSubmitting(false)
        }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="description">Meal description</label>
                <Field name="description" component="textarea" className="form-control" rows="6"/>
                <small className="form-text text-muted">
                  Describe the meal you will prepare.
                </small>
                { touched.description && errors.description &&
                  <div className="alert alert-danger mt-2">{errors.description}</div>
                }
              </div>
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

function BlankForm(props) {
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Sign Up
      </Button>
      <BlankInnerModal show={modalShow} onHide={() => setModalShow(false)} blob={props.blob}/>
    </div>
  )
}



export default BlankForm
