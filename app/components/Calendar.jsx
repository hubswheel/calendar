import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import Bootstrap from 'bootstrap'
import {List, Map} from 'immutable';
import Signal from 'signals'; //  var mySignal = new Signal();
import {Grid, Row, Col, ButtonGroup, Button, DropdownButton, Badge, Label, Table } from 'react-bootstrap';
import $ from 'jquery';
import Header from './CalendarHeader';
import Week from './Week';
import moment from 'moment';

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
        const outOfMonth = startDate.month() + 1 != displayMonth
                            && startDate.clone().add(6, "days").month() + 1 != displayMonth
        return outOfMonth
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
    render() {
        const   month = this.state.date.month() + 1,
                startDate = this.state.date.clone().startOf("month").startOf("week"),
                weeks = this._getWeeks(List([]), month, startDate, this.config)
        return (
            <Grid fluid={true}>
                <Header
                    date={this.state.date}
                    config={this.config}
                    on={this.on}/>
                {weeks}
            </Grid>
        )
    }
}
