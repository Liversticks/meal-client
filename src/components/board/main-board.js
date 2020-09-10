import React from 'react'
import { Container } from 'react-bootstrap'
import moment from 'moment'
import CollapseWeek from './week'
import LogoutWarning from './logout-warning'

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
      {props.stale &&
        <LogoutWarning onLogout={props.onLogout}/>
      }
      <h1 className="mt-4 mb-4">Upcoming Meals</h1>
      <CollapseWeek opened={true} onUpdate={props.onUpdate} start={start1} end={end1} dates={props.dates}/>
      <CollapseWeek opened={false} onUpdate={props.onUpdate} start={start2} end={end2} dates={props.dates}/>
      <CollapseWeek opened={false} onUpdate={props.onUpdate} start={start3} end={end3} dates={props.dates}/>
      <CollapseWeek opened={false} onUpdate={props.onUpdate} start={start4} end={end4} dates={props.dates}/>
      <CollapseWeek opened={false} onUpdate={props.onUpdate} start={start5} end={end5} dates={props.dates}/>
    </Container>
  )
}

export default MainBoard
