import React from 'react'
import { Modal, Button, Alert, Container } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import MealService from '../../requests/meals'

const formSchema = Yup.object().shape({
  description: Yup.string().required('Please describe your meal.'),
  date: Yup.string().required(),
  type: Yup.string().required()
})

const validStatus = [
  'Meal details updated successfully!',
  'Meal successfully deleted.'
]

function EditInnerModal(props) {
  const [status, setStatus] = React.useState('')

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
        { status.length > 0 ?
          <Alert variant={validStatus.includes(status) ? "success" : "danger" }>
            {status}
          </Alert>
        : <Formik
        initialValues={{
          date: props.blob.date,
          type: props.blob.type,
          description: props.blob.description
        }}
        validationSchema={formSchema}
        onSubmit={ (values, bag) => {
          MealService.editMeal(values.date, values.type, values.description).then(response => {
            setStatus(response.data.message)
          }).catch(error => {
            if (error.response) {
              setStatus(error.response.data.message)
            } else if (error.request) {
              setStatus(error.request)
            } else {
              setStatus(error.message)
            }
          })
          bag.setSubmitting(false)
        }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="description">Meal description</label>
                <Field name="description" component="textarea" className="form-control" rows="6"/>
                <small className="form-text text-muted">
                  Change of heart? New meal ideas are always welcome.
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
      <Modal.Footer>
        { status === '' ?
        <Button variant="danger" onClick={() => {
          MealService.deleteMeal(props.blob.date, props.blob.type).then(response => {
            setStatus(response.data.message)
          }).catch(error => {
            if (error.response) {
              setStatus(error.response.data.message)
              console.log("first branch")
            } else if (error.request) {
              setStatus(error.request)
              console.log("second branch")
            } else {
              console.log("third branch")
              setStatus(error.message)
            }
            console.log(error)
          })
        }}>
          <FontAwesomeIcon icon={faTrash}/> Delete Meal
        </Button>
        : <Button variant="success" onClick={() => {
          props.onHide()
          setStatus('')
        }}>
            <FontAwesomeIcon icon={faThumbsUp}/> Got it
          </Button>
        }

      </Modal.Footer>
    </Modal>
  )
}

function EditForm(props) {
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <Container fluid>
      <Button className="fill-button" variant="info" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon className="mr-1" icon={faEdit}/> Modify
      </Button>
      <EditInnerModal show={modalShow} onHide={() => {
        setModalShow(false)
        props.onUpdate()
      }} blob={props.blob}/>
    </Container>
  )
}



export default EditForm
