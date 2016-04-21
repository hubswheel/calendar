import {Grid, Row, Col, ButtonGroup, Button, DropdownButton, Badge, Label } from 'react-bootstrap';
import DateGroup from "./DateGroup"

export default class Week extends React.Component {
    render() {
        const   {date, month, on} = this.props,
                {dayGroups} = this.props.config,
                hasGroups = dayGroups && dayGroups.length,
                none = "-*-none-*-",
                days = [...Array(7).keys()].map(offset => date.clone().add(offset, "days")),
                s = {style: {border: "solid #ccc 1px", overflow: "auto"}},
                format = (index, dt) => ((!index && dt.month() + 1 != month) || (index && dt.date() == 1))
                                            && dt.format("M/DD")
                                            || dt.format("DD"),
                numbers = days.map((dt, index) => (
                    <Col
                        key={`n${index}`}
                        md={1}>
                        {format(index, dt)}
                    </Col>)),
                groups = (hasGroups && dayGroups || [none]).map((g, index) => (
                    <Row key={index}>
                        {g !== none && (<Col {...s}  md={1} >{g.name}</Col>)}
                        {days.map((dt, index) => (
                            <DateGroup
                                key={index}
                                group={hasGroups && g || false}
                                date={dt} />))}
                    </Row>
                ))
        return (
            <div>
                <Row>
                    {hasGroups && (<Col md={1} />)}
                    {numbers}
                </Row>
                {groups}
            </div>
        )
    }
}
//                         {days.map(dt => (
//                             <DateGroup
//                                 key={g.get("id") + "_" + app.dateInt(dt)}
//                                 groupId={g.get("id")}
//                                 date={dt}
//                                 users={users}
//                                 editable={editable}
//                                 data={data.getIn([dt, g.get("id")])}/>))}
//                     </Row>
