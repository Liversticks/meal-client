import React from 'react'
import EditForm from '../forms/edit-form'
import BlankForm from '../forms/blank-form'
import OtherForm from '../forms/other-form'
import { getUsername } from '../../requests/get-username'

function CaseSwitch(props) {
  /*
  Input object
    blob
    {
      date,
      type,
      description (OPTIONAL),
      chef (OPTIONAL),
    }
  If blob contains chef, then it must also contain description
  If blob contains chef, see if chef matches current user
  */

  if (props.blob.hasOwnProperty('chef')) {
    if (props.blob.chef === getUsername()) {
      return (
        <EditForm onUpdate={props.onUpdate} blob={props.blob}/>
      )
    } else {
      return (
        <OtherForm blob={props.blob}/>
      )
    }
  } else {
    return (
      <BlankForm onUpdate={props.onUpdate} blob={props.blob}/>
    )
  }
}

export default CaseSwitch
