import React from 'react'
import { Container } from 'react-bootstrap'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import authToken from '../requests/get-token'

import ProfileForm from './forms/profile-form'
import ErrorPage from './error-page'
import LoadingPage from './loading'

import localConfig from '../config/local-dev'
import prodConfig from '../config/prod'

const PICTURE_STEM = process.env.NODE_ENV === 'production' ?
  `${prodConfig['static_dir']}live/` :
  `${localConfig['static_dir']}live/`

const DEFAULT_PIC_URL = process.env.NODE_ENV === 'production' ?
  `${prodConfig['static_dir']}default/default_profile_picture.png` :
  `${localConfig['static_dir']}default/default_profile_picture.png`

const STATUS_URL = process.env.NODE_ENV === 'production' ?
  `${prodConfig['users_url']}` :
  `${localConfig['users_url']}`

function Profile() {
  const [birthday, setBirthday] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [modalShow, setModalShow] = React.useState(false)
  const [ownPic, setOwnPic] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    axios.get(STATUS_URL, { headers: authToken() }).then(
      (res) => {
        setUsername(res.data.username)
        setBirthday(moment(res.data.birthday, "YYYY-MM-DD").format("MMMM Do, YYYY"))
        setEmail(res.data.email)
        setOwnPic(res.data.found)
        setIsLoaded(true)
      },
      (error) => {
        setIsLoaded(false)
        setError(error)
      }
    )
  }, [])

  if (error) {
    return <ErrorPage error={error}/>
  } else if (!isLoaded) {
    return <LoadingPage/>
  } else {
    return (
      <Container>
        {/*
          Profile picture
          Username
          Email
          Birthday

        */}

        <h1 className="text-center">{ `${username}'s Profile` }</h1>
        { ownPic ?
          <img
            onClick={() => setModalShow(true)}
            className="mx-auto rounded-circle d-block"
            src={`${PICTURE_STEM}${username}.png`}
            alt={`${username}'s profile avatar`}
          /> :
          <img
            onClick={() => setModalShow(true)}
            className="mx-auto rounded-circle d-block"
            src={DEFAULT_PIC_URL}
            alt="Default profile avatar"
          />
        }
        <ProfileForm hasOwnPic={ownPic} show={modalShow} onHide={() => setModalShow(false)}/>
        <div className="text-center">
          <FontAwesomeIcon icon={ faEnvelope}/> { email }
        </div>
        <div className="text-center">
          <FontAwesomeIcon icon={ faBirthdayCake}/> { birthday }
        </div>
      </Container>
    )
  }


}

export default Profile
