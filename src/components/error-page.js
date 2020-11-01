import React from 'react'
import { Container } from 'react-bootstrap'

function ErrorPage(props) {
  return (
    <Container>
      <h2>Oops, something went wrong!</h2>
      <p>Try refreshing the page or logging out, then logging back in again</p>
    </Container>
  )
}

export default ErrorPage
