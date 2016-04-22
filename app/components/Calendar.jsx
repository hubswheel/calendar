import { Router, Route, Link } from 'react-router'
import {List, Map, fromJS} from 'immutable';
import {Grid, Row, Col, ButtonGroup, Button, DropdownButton, Badge, Label, Table } from 'react-bootstrap';
import Header from './CalendarHeader';
import Week from './Week';

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.on = this.getSignals()
        this.state = {config: fromJS(this.getDefaultConfig()), date: moment()}
    }
    getDefaultConfig() {
        return {
            monthTitleFormat: "MM YYYY",
            title: "Default Calendar",
            canShowAdminLink: false,
            dayGroups: null
        }
    }
    getSignals() {
        const   pairs = List(`
                            dataloaded
                            dateChangeClicked:changeDate
                            dateChanged
                            configUpdated
                            `
                        .split(/\n/))
                        .filter(pair => pair)
                        .map(pair => pair.split("#")[0].replace(/\s+/g, "").split(":")),
                on = pairs
                    .reduce((map, pair) => map.set(pair[0], new Signal()), Map())
                    .toJS()
        pairs.filter(pair => pair[1])
                .forEach(pair => on[pair[0]].add(this[pair[1]].bind(this)))
        return on
    }
    getWeeks(weeks, displayMonth, startDate, config) {
        const isOutOfMonth = startDate.month() + 1 != displayMonth
                            && startDate.clone().add(6, "days").month() + 1 != displayMonth
        return isOutOfMonth
            && weeks
            || this.getWeeks(weeks.push(
                <Week
                    key={`${startDate.week()}`}
                    config={config}
                    on={this.on}
                    date={startDate}
                    month={displayMonth}/>), displayMonth, startDate.clone().add(1, "weeks"), config)
    }
    changeDate(quantity, units) {
        this.setState({date: this.state.date.add(quantity, units)})
        this.on.dateChanged.dispatch(this.state.date)
    }
    getDayNameList(start, hasGroups) {
        return (hasGroups && ["*"] || [])
                    .concat([...Array(7).keys()])
                    .map(offset => offset == "*" && " " || start.clone().add(offset, "days").format("dddd"))
    }
    render() {
        const   {date, config} = this.state,
                month = date.month() + 1,
                startDate = date.clone().startOf("month").startOf("week"),
                weeks = this.getWeeks(List([]), month, startDate, config),
                dow = this.getDayNameList(startDate, (config.get("dayGroups") || List()).size),
                names = dow.map((name, index) => <Col key={index} md={1}>{name}</Col>);
        return (
            <Grid fluid={true}>
                <Header
                    date={date}
                    config={config}
                    on={this.on}/>
                <Row>
                    {names}
                </Row>
                {weeks}
            </Grid>
        )
    }
}
