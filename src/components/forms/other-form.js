import React from 'react'
import { Modal, Card, Button } from 'react-bootstrap'
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
          <Button variant="success" onClick={props.onHide}>Got it</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

function OtherForm(props) {
  const [modalShow, setModalShow] = React.useState(false)

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Assigned to {props.blob.chef}
      </Button>
      <OtherInnerModal show={modalShow} onHide={() => setModalShow(false)} blob={props.blob}/>
    </div>
  )
}

export default OtherForm
