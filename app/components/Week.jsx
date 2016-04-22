import {Grid, Row, Col, ButtonGroup, Button, DropdownButton, Badge, Label } from 'react-bootstrap';
import DateGroup from "./DateGroup"
import {List, Map} from 'immutable'

export default class Week extends React.Component {
    render() {
        const   {date, month, on} = this.props,
                dayGroups = this.props.config.get("dayGroups") || List(),
                days = [...Array(7).keys()].map(offset => date.clone().add(offset, "days")),
                s = {style: {border: "solid #ccc 1px", overflow: "auto"}},
                format = (index, dt) => ((!index && dt.month() + 1 != month) || (index && dt.date() == 1))
                                            && dt.format("M/DD")
                                            || dt.format("DD"),
                numbers = days.map((dt, index) => (
                    <Col
                        key={`${index}`}
                        md={1}>
                        {format(index, dt)}
                    </Col>)),
                groups = dayGroups.size
                            && dayGroups.map(g => (
                                <Row key={g.get("id")}>
                                    <Col {...s}  md={1} >{g.get("name")}</Col>
                                    {days.map((dt, index) => (
                                        <DateGroup
                                            {...g.toJS()}
                                            key={index}
                                            date={dt} />))}
                                </Row>))
                            || (<Row>
                                    {days.map((dt, index) => (
                                        <DateGroup
                                            key={index}
                                            date={dt} />))}
                                </Row>)
        return (
            <div>
                <Row>
                    {dayGroups.size && (<Col md={1} />)}
                    {numbers}
                </Row>
                {groups}
            </div>
        )
    }
}
