import {Row, Col} from 'react-bootstrap';
import DateGroup from "./DateGroup"
import {List, Map} from 'immutable'

export default class Week extends React.Component {
    getDates(days, month, config) {
        const   suffix = (index, dt) => ((!index && dt.month() + 1 != month) || (index && dt.date() == 1)) && "Extended" || "";
        return days.map((dt, index) => (
                    <Col
                        key={index}
                        md={1}>
                        {dt.format(config.get(`dateFormat${suffix(index, dt)}`))}
                    </Col>))
    }
    render() {
        const   {date, month, on, config, events} = this.props,
                eventsByDay = events && events.groupBy(e => e.get("date").day()) || Map(),
                dayGroups = config.get("dayGroups") || List(),
                days = [...Array(7).keys()].map(offset => date.clone().add(offset, "days")),
                s = {style: {border: "solid #ccc 1px", overflow: "auto"}},
                dayEvents = dt => eventsByDay.get(dt.day()),
                groupEvents = (dt, group) => !dayEvents(dt) && List() // no events today
                    || (group === false && dayGroups.size) && dayEvents(dt).filter(e => !e.has("groupId")) // non-group entry in a calendar with groups
                    || group === false && List() // ignore request for non-grouped entries if calendar doesn't have groups
                    || !group.size && dayEvents(dt) // no group - return all events
                    || dayEvents(dt).filter(e => e.get("groupId") == group.get("id")), // group events for the day
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
                    {this.getDates(days, month, config)}
                </Row>
                {groups}
            </div>
        )
    }
}
