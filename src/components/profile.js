import React from 'react'
import { Container } from 'react-bootstrap'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faEnvelope } from '@fortawesome/free-solid-svg-icons'

function Profile(props) {
  const formattedBirthday = moment(props.profile.birthday, "YYYY-MM-DD").format("MMMM Do, YYYY")

  return (
    <Container>
      {/*
        Profile picture
        Username
        Email
        Birthday

      */}

      <h1 className="text-center">{ `${props.profile.username}'s Profile` }</h1>
      <img className="mx-auto rounded-circle d-block" src="https://bit.ly/fcc-relaxing-cat" alt="A cute orange cat lying on its back."/>
      <div className="text-center">
        <FontAwesomeIcon icon={ faEnvelope}/> { props.profile.email }
      </div>
      <div className="text-center">
        <FontAwesomeIcon icon={ faBirthdayCake}/> { formattedBirthday }
      </div>
    </Container>
  )
}

export default Profile
