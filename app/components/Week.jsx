import {Row, Col} from 'react-bootstrap';
import DateGroup from "./DateGroup"
import {List, Map} from 'immutable'

export default class Week extends React.Component {
    render() {
        const   {date, month, on, config, events} = this.props,
                eventsByDay = events && events.groupBy(e => e.get("date").day()) || Map(),
                dayGroups = config.get("dayGroups") || List(),
                days = [...Array(7).keys()].map(offset => date.clone().add(offset, "days")),
                s = {style: {border: "solid #ccc 1px", overflow: "auto"}},
                formats = [config.get("dateFormat"), config.get("dateFormatExtended")],
                needsExtended = (index, dt) => (!index && dt.month() + 1 != month) || (index && dt.date() == 1),
                // groupEvents = (dt, group) => !eventsByDay.get(dt.day()) && null // no events today
                //     || (group === false && dayGroups.size) && eventsByDay.get(dt.day()).filter(e => !e.has("groupId") // find non-group events (i.e. for the day)
                //     || group === false && null // doesn't have groups, so ignore this request
                //     || !group.size && eventsByDay.get(dt.day()) // no groups, get them all.
                //     || eventsByDay.get(dt.day()).filter(e => e.get("groupId") == group.get("id")),
                numbers = days.map((dt, index) => (
                    <Col
                        key={index}
                        md={1}>
                        {dt.format(formats[+!!needsExtended(index, dt)])}
                    </Col>)),
                row = (k={}, group=Map()) => (
                    <Row {...k}>
                        {group.size && (<Col {...s}  md={1} >{group.get("name")}</Col>)}
                        {days.map((dt, index) => (
                            <DateGroup
                                {...group.toJS()}
                                key={index}
                                events={groupEvents(dt, group)}
                                date={dt} />))}
                    </Row>), // put in the day comments groupEvents(dt, false) somewhere...
                groups = dayGroups.size
                            && dayGroups.map(group => row({key: group.get("id")}, group))
                            || row();
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
