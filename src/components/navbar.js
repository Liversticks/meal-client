import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function MealNav(props) {
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <LinkContainer to={"/"}>
        <Navbar.Brand>Meals</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle/>
      <Navbar.Collapse>
        <Nav className="mr-auto">
          { props.isLoggedIn &&
            <Nav.Link href="/login" onClick={props.onLogout}>
              Logout
            </Nav.Link>
          }
          { !(props.isLoggedIn) &&
            <LinkContainer to={"/login"}>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          }
          { !(props.isLoggedIn) &&
            <LinkContainer to={"/signup"}>
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MealNav
