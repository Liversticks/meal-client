import React from 'react'
import { Modal } from 'react-bootstrap'
import FileInput from '../file-input'

function ProfileForm(props) {

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FileInput hasOwnPic={props.hasOwnPic} onHide={props.onHide}/>
      </Modal.Body>
    </Modal>
  )
}

export default ProfileForm
