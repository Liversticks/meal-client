import React from 'react'
import moment from 'moment'
import { Row, Col, Button, Collapse, Table } from 'react-bootstrap'
import Day from './day'

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
      <Day key={blob.key} blob={blob.dayBlob}/>
    )
  })
  return (
    <div>
      <Table bordered>
        <thead>
          <tr>
            <th>Date</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
            <th>Snack</th>
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
  const [open, setOpen] = React.useState(false)
  const firstExpression = moment(props.start).format("MMMM Do")
  const secondExpression = moment(props.start).month() === moment(props.end).month() ?
    moment(props.end).format("Do") : moment(props.end).format("MMMM Do")
  return (
    <div>
      <Row>
        <Col xs={10}><h3>Week of {`${firstExpression} - ${secondExpression}`}</h3></Col>
        <Col>
          <Button onClick={() => setOpen(!open)}>
            { open ? 'Collapse' : 'Open'}
          </Button>
        </Col>
      </Row>
      <Collapse in={open}>
        <div>
          <Week start={props.start} end={props.end} dates={props.dates}/>
        </div>
      </Collapse>
    </div>
  )
}

export default CollapseWeek
