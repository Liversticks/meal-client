import React from 'react'
import { Modal, Card, Button, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

function OtherInnerModal(props) {
  const formattedDate = moment(props.blob.date, "MM-DD-YYYY").format("MMMM Do")
  const formattedType = props.blob.type.charAt(0).toUpperCase() + props.blob.type.slice(1)
  return (
    <div>
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
          <Card>
            <Card.Body>
              <Card.Subtitle>
                Chef: {props.blob.chef}
              </Card.Subtitle>
              <Card.Text>
                {props.blob.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.onHide}>
            <FontAwesomeIcon icon={faThumbsUp}/> Got it
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

function OtherForm(props) {
  const [modalShow, setModalShow] = React.useState(false)

  return (
    <Container fluid className="fill-div">
      <Button variant="light" className="fill-button" onClick={() => setModalShow(true)}>
        Assigned to <em className="other-username">{props.blob.chef}</em>
      </Button>
      <OtherInnerModal show={modalShow} onHide={() => setModalShow(false)} blob={props.blob}/>
    </Container>
  )
}

export default OtherForm
