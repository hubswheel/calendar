import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap'
// import Immutable from 'immutable';
// import Signal from 'signals'; //  var mySignal = new Signal();
import {Grid, Row, Col, ButtonGroup, Button, DropdownButton, Badge, Label } from 'react-bootstrap';
import $ from 'jquery';
import moment from 'moment';

export default class Week extends React.Component {
    render() {
        const   {date, month, on} = this.props,
                {dayGroups} = this.props.config,
                hasGroups = dayGroups && dayGroups.length,
                days = [...Array(7).keys()].map(offset => date.clone().add(offset, "days")),
                numbers = days.map((dt, index) => (
                    <Col
                        key={`n${index}`}
                        md={1}>
                        {dt.date()}
                    </Col>))
        return (
            <div>
                <Row>
                    {hasGroups && (
                        <Col md={1}/>
                    )}
                    {numbers}
                </Row>
            </div>
        )
    }
}
//
//
//
//                 var dt = new Date(date); dt.setDate(dt.getDate() + offset); return dt}),
//             dates = days.map(dt => (
//                     <Col
//                         key={app.dateInt(dt)}
//                         style={{backgroundColor: "#eee", borderTop: "solid #ccc 1px", borderRight: "solid #ccc 1px"}}
//                         md={1}>
//                         {dt.getDate()}
//                     </Col>));
//         return (
//             <div style={{minHeight: 100}}>
//                 <Row>
//                     <Col
//                         md={1}
//                         mdOffset={2}
//                         style={{borderTop: "solid #ccc 1px"}}/>
//                      {dates}
//                 </Row>
//                 {groups.map(g => (
//                     <Row key={g.get("id")}>
//                         <Col
//                             md={1}
//                             mdOffset={2}
//                             style={{borderTop: "solid #eee 1px"}}>
//                             {g.get("name")}
//                         </Col>
//                         {days.map(dt => (
//                             <DateGroup
//                                 key={g.get("id") + "_" + app.dateInt(dt)}
//                                 groupId={g.get("id")}
//                                 date={dt}
//                                 users={users}
//                                 editable={editable}
//                                 data={data.getIn([dt, g.get("id")])}/>))}
//                     </Row>
//                 ))}
//             </div>
//         )
//     }
// }
