import React from 'react'
import { Col } from 'react-bootstrap'
import CaseSwitch from './case-switch'

function Day(props) {
  return (
      <tr>
        <td>
          <div>
            <Col>
              <div>{props.blob.dayOfWeek}</div>
              <div>{props.blob.formattedDay}</div>
            </Col>
          </div>
        </td>
        <td><CaseSwitch blob={props.blob.breakfastBlob}/></td>
        <td><CaseSwitch blob={props.blob.lunchBlob}/></td>
        <td><CaseSwitch blob={props.blob.dinnerBlob}/></td>
        <td><CaseSwitch blob={props.blob.snackBlob}/></td>
      </tr>
  )
}

export default Day
