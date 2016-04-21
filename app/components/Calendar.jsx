import { Router, Route, Link } from 'react-router'
import {List, Map} from 'immutable';
import {Grid, Row, Col, ButtonGroup, Button, DropdownButton, Badge, Label, Table } from 'react-bootstrap';
import Header from './CalendarHeader';
import Week from './Week';

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.on = this._initializeSignals()
        this.state = {date: moment()}
        this.updateConfig(this._getDefaultConfig())
    }
    updateConfig(newConfig) {
        this.config = newConfig;
        this.on.configUpdated.dispatch(this.config)
    }
    _getDefaultConfig() {
        return {
            monthTitleFormat: "MM YYYY",
            title: "Default Calendar",
            canShowAdminLink: false,
            dayGroups: null
        }
    }
    _initializeSignals() {
        const   pairs = List(`
                            dataloaded
                            dateChangeClicked:_changeDate
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
    _getWeeks(weeks, displayMonth, startDate, config) {
        const isOutOfMonth = startDate.month() + 1 != displayMonth
                            && startDate.clone().add(6, "days").month() + 1 != displayMonth
        return isOutOfMonth
            && weeks
            || this._getWeeks(weeks.push(
                <Week
                    key={`w${startDate.format("YYYYMMDD")}`}
                    config={config}
                    on={this.on}
                    date={startDate}
                    month={displayMonth}/>), displayMonth, startDate.clone().add(1, "weeks"), config)
    }
    _changeDate(quantity, units) {
        this.setState({date: this.state.date.add(quantity, units)})
        this.on.dateChanged.dispatch(this.state.date)
    }
    _getDayNameList(start, hasGroups) {
        return (hasGroups && ["*"] || [])
                    .concat([...Array(7).keys()])
                    .map(offset => offset == "*" && " " || start.clone().add(offset, "days").format("dddd"))
    }
    render() {
        const   month = this.state.date.month() + 1,
                startDate = this.state.date.clone().startOf("month").startOf("week"),
                weeks = this._getWeeks(List([]), month, startDate, this.config),
                dow = this._getDayNameList(startDate, this.config.dayGroups && this.config.dayGroups.length),
                names = dow.map(name => <Col md={1}>{name}</Col>)

        return (
            <Grid fluid={true}>
                <Header
                    date={this.state.date}
                    config={this.config}
                    on={this.on}/>
                <Row>
                    {names}
                </Row>
                {weeks}
            </Grid>
        )
    }
}
