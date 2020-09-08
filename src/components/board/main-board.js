import React from 'react'
import { Container } from 'react-bootstrap'
import moment from 'moment'
import CollapseWeek from './week'

function MainBoard(props) {
  //entries: props.dates
  const start1 = moment().startOf('day')
  const end1 = start1.clone().endOf('week')
  const start2 = end1.clone().add(1, 'd').startOf('day')
  const end2 = start2.clone().endOf('week')
  const start3 = end2.clone().add(1, 'd').startOf('day')
  const end3 = start3.clone().endOf('week')
  const start4 = end3.clone().add(1, 'd').startOf('day')
  const end4 = start4.clone().endOf('week')
  const start5 = end4.clone().add(1, 'd').startOf('day')
  const end5 = start5.clone().endOf('week')

  return (
    <Container>
      <h1>Upcoming Meals</h1>
      <CollapseWeek start={start1} end={end1} dates={props.dates}/>
      <CollapseWeek start={start2} end={end2} dates={props.dates}/>
      <CollapseWeek start={start3} end={end3} dates={props.dates}/>
      <CollapseWeek start={start4} end={end4} dates={props.dates}/>
      <CollapseWeek start={start5} end={end5} dates={props.dates}/>
    </Container>
  )
}

export default MainBoard
