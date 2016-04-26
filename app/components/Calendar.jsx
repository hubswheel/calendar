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
            monthTitleFormat: "MM YYYY", // header +  <> for prev/next
            dateFormat: "DD", // standard date format for a date displayed in a week
            dateFormatExtended: "M/DD", // format for 1st day of month change
            eventDateFormat: "MM/DD/YYYY", // format used in internal event list
            title: "Default Calendar", // displayed in header
            canShowAdminLink: false, // true to show admin link (admin page must be in router)
            dayGroups: null // array of id/name objects which are grouped on each day
        }
    }
    loadEvents() {
        const {start, end} = this.getDisplayDateRange()
        return {}
    }
    getSignals() {
        const   pairs = List(`
                            dateChangeClicked:changeDate
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
    getDisplayDateRange() {
        const {date} = this.state;
        return {start: date.clone().startOf("month").startOf("week"),
                end: date.clone().endOf("month").endOf("week")}
    }
    getWeeks(weeks, displayMonth, weekStart, displayEnd, config, eventsByWeek) {
        return weekStart.isAfter(displayEnd)
            && weeks
            || this.getWeeks(weeks.push(
                <Week
                    key={weekStart.week()}
                    config={config}
                    on={this.on}
                    date={weekStart}
                    events={eventsByWeek.get(weekStart.week())}
                    month={displayMonth}/>), displayMonth, weekStart.clone().add(1, "weeks"), displayEnd, config, eventsByWeek)
    }
    changeDate(quantity, units) {
        this.setState({date: this.state.date.add(quantity, units)})
    }
    processRawEvents(events, dateFormat) {
        return fromJS(events)
                .map(e => e.set("date", moment(e.get("date", "-invalid-"))))
                .filter(e => e.get("date").isValid()) // silently eliminate invalid dates
    }
    getDayNameColumns(start, hasGroups) {
        return (hasGroups && ["*"] || [])
                    .concat([...Array(7).keys()])
                    .map(offset => offset == "*" && " " || start.clone().add(offset, "days").format("dddd"))
                    .map((name, index) => <Col key={index} md={1}>{name}</Col>)
    }
    render() {
        const   {date, config, events} = this.state,
                {start, end} = this.getDisplayDateRange(),
                eventsByWeek = events && events.groupBy(e => e.get("date").week()) || Map(),
                weeks = this.getWeeks(List([]), date.month() + 1, start, end, config, eventsByWeek),
                nameCols = this.getDayNameColumns(start, (config.get("dayGroups") || List()).size);
        return (
            <Grid fluid={true}>
                <Header
                    date={date}
                    config={config}
                    on={this.on}/>
                <Row>
                    {nameCols}
                </Row>
                {weeks}
            </Grid>
        )
    }
}
