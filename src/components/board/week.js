import React from 'react'
import moment from 'moment'
import { Row, Col, Collapse, Table } from 'react-bootstrap'
import Day from './day'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

function Week(props) {
  let mutMoment = props.start
  let week = []
  while (mutMoment.isSameOrBefore(props.end, 'day')) {
    week.push(mutMoment.format("L"))
    mutMoment = mutMoment.clone().add(1, 'd')
  }
  const weekBlobs = week.map((dateString) => {
      let tempDate = moment(dateString, "MM-DD-YYYY")
      let retObj = {
        key: dateString,
        dayBlob: {
          formattedDay: tempDate.format("MMMM Do"),
          dayOfWeek: tempDate.format("dddd"),
          breakfastBlob: {
            date: dateString,
            type: 'breakfast'
          },
          lunchBlob: {
            date: dateString,
            type: 'lunch'
          },
          dinnerBlob: {
            date: dateString,
            type: 'dinner'
          },
          snackBlob: {
            date: dateString,
            type: 'snack'
          }
        }
      }
      if (props.dates.hasOwnProperty(dateString)) {
        //at least one meal that day is assigned
        if (props.dates[dateString]['breakfast'].hasOwnProperty('chef')) {
          retObj['dayBlob']['breakfastBlob']['description'] = props.dates[dateString]['breakfast']['meal_desc']
          retObj['dayBlob']['breakfastBlob']['chef'] = props.dates[dateString]['breakfast']['chef']
        }
        if (props.dates[dateString]['lunch'].hasOwnProperty('chef')) {
          retObj['dayBlob']['lunchBlob']['description'] = props.dates[dateString]['lunch']['meal_desc']
          retObj['dayBlob']['lunchBlob']['chef'] = props.dates[dateString]['lunch']['chef']
        }
        if (props.dates[dateString]['dinner'].hasOwnProperty('chef')) {
          retObj['dayBlob']['dinnerBlob']['description'] = props.dates[dateString]['dinner']['meal_desc']
          retObj['dayBlob']['dinnerBlob']['chef'] = props.dates[dateString]['dinner']['chef']
        }
        if (props.dates[dateString]['snack'].hasOwnProperty('chef')) {
          retObj['dayBlob']['snackBlob']['description'] = props.dates[dateString]['snack']['meal_desc']
          retObj['dayBlob']['snackBlob']['chef'] = props.dates[dateString]['snack']['chef']
        }
      }
      return retObj
  })
  const days = weekBlobs.map(blob => {
    return (
      <Day key={blob.key} onUpdate={props.onUpdate} blob={blob.dayBlob}/>
    )
  })
  return (
    <div>
      <Table responsive striped bordered className="mt-3">
        <colgroup>
          <col className="table-even"/>
          <col className="table-even"/>
          <col className="table-even"/>
          <col className="table-even"/>
          <col className="table-even"/>
        </colgroup>
        <thead>
          <tr>
            <th className="text-center">Date</th>
            <th className="text-center">Breakfast</th>
            <th className="text-center">Lunch</th>
            <th className="text-center">Dinner</th>
            <th className="text-center">Snack</th>
          </tr>
        </thead>
        <tbody>
          {days}
        </tbody>
      </Table>
    </div>
  )
}

function CollapseWeek(props) {
  const [open, setOpen] = React.useState(props.opened)
  const firstExpression = moment(props.start).format("MMMM Do")
  const secondExpression = moment(props.start).format() !== moment(props.end).startOf("day").format() ?
    moment(props.start).month() === moment(props.end).month() ?
    moment(props.end).format(" - Do")
    : moment(props.end).format(" - MMMM Do")
    : ""
  return (
    <div>
      <Row className="mt-2 mb-2 text-light bg-dark-1 border border-secondary">
        <Col xs={10}><h3>Week of {`${firstExpression}${secondExpression}`}</h3></Col>
        <Col className="toggle-collapse">
          <FontAwesomeIcon className="mt-2" size="lg" onClick={() => setOpen(!open)} icon={open ? faMinusCircle : faPlusCircle }/>
        </Col>
      </Row>
      <Collapse in={open}>
        <div>
          <Week onUpdate={props.onUpdate} start={props.start} end={props.end} dates={props.dates}/>
        </div>
      </Collapse>
    </div>
  )
}

export default CollapseWeek
