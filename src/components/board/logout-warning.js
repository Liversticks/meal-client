import React from 'react'
import { Alert } from 'react-bootstrap'

function LogoutWarning(props) {
  return (
    <Alert className="mt-2" variant="danger">
      <Alert.Heading>
        Session timed out.
      </Alert.Heading>
      <p>
        Please <Alert.Link href="/login" onClick={props.onLogout}>log out</Alert.Link> and log in again.
      </p>
    </Alert>
  )
}

export default LogoutWarning
