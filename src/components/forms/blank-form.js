import React from 'react'
import { Modal, Button, Alert, Container } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faThumbsUp  } from '@fortawesome/free-solid-svg-icons'


import MealService from '../../requests/meals'


const formSchema = Yup.object().shape({
  description: Yup.string().required('Please describe your meal.'),
  date: Yup.string().required(),
  type: Yup.string().required()
})

function BlankInnerModal(props) {
  const [isSubmit, setSubmit] = React.useState('')
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
        { isSubmit.length > 0 ?
          <Alert variant={isSubmit === 'Meal scheduled successfully!' ? "success" : "danger"}>
            { isSubmit }
          </Alert>
        : <Formik
        initialValues={{
          date: props.blob.date,
          type: props.blob.type,
          description: ''
        }}
        validationSchema={formSchema}
        onSubmit={ (values, bag) => {
          MealService.newMeal(values.date, values.type, values.description).then(response => {
            setSubmit(response.data.message)
          }).catch(error => {
            if (error.response) {
              setSubmit(error.response.data.message)
            } else if (error.request) {
              setSubmit(error.request)
            } else {
              setSubmit(error.message)
            }
          })
          //bag.setSubmitting(false)
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
              <Button className="float-right" type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
        }
      </Modal.Body>
      { isSubmit.length > 0 &&
        <Modal.Footer>
          <Button className="float-right" variant="success" onClick={props.onHide}>
            <FontAwesomeIcon icon={faThumbsUp}/> Got it
          </Button>
        </Modal.Footer>
      }
    </Modal>
  )
}

function BlankForm(props) {
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <Container fluid className="fill-div">
      <Button variant="success" className="fill-button" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon className="mr-1" icon={faUserPlus}/> Sign Up
      </Button>
      <BlankInnerModal show={modalShow} onHide={() => {
        setModalShow(false)
        props.onUpdate()
      }} blob={props.blob}/>
    </Container>
  )
}



export default BlankForm
