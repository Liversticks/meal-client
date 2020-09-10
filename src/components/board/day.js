import React from 'react'
import { Col } from 'react-bootstrap'
import CaseSwitch from './case-switch'

function Day(props) {
  return (
      <tr>
        <td>
          <div>
            <Col>
              <div className="day-of-week">{props.blob.dayOfWeek}</div>
              <div>{props.blob.formattedDay}</div>
            </Col>
          </div>
        </td>
        <td className="centered-cell"><CaseSwitch onUpdate={props.onUpdate} blob={props.blob.breakfastBlob}/></td>
        <td className="centered-cell"><CaseSwitch onUpdate={props.onUpdate} blob={props.blob.lunchBlob}/></td>
        <td className="centered-cell"><CaseSwitch onUpdate={props.onUpdate} blob={props.blob.dinnerBlob}/></td>
        <td className="centered-cell"><CaseSwitch onUpdate={props.onUpdate} blob={props.blob.snackBlob}/></td>
      </tr>
  )
}

export default Day
