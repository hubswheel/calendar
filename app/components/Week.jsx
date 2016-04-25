import {Row, Col} from 'react-bootstrap';
import DateGroup from "./DateGroup"
import {List, Map} from 'immutable'

export default class Week extends React.Component {
    render() {
        const   {date, month, on, config, events} = this.props,
                dayGroups = config.get("dayGroups") || List(),
                days = [...Array(7).keys()].map(offset => date.clone().add(offset, "days")),
                s = {style: {border: "solid #ccc 1px", overflow: "auto"}},
                formats = [config.get("dateFormat"), config.get("dateFormatExtended")],
                needsExtended = (index, dt) => (!index && dt.month() + 1 != month) || (index && dt.date() == 1),
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
                                date={dt} />))}
                    </Row>),
                groups = dayGroups.size
                            && dayGroups.map(group => row({key: group.get("id")}, group))
                            || row();
        console.log((events || Map()).toJS());
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
