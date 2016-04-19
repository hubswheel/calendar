import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap'
import Immutable from 'immutable';
import Signal from 'signals'; //  var mySignal = new Signal();
import {Grid, Row, Col, ButtonGroup, Button, Overlay, DropdownButton, Badge, Label, Table } from 'react-bootstrap';
import $ from 'jquery';
import Header from './CalendarHeader';

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this._initializeSignals()
    }
    _initializeSignals() {
        const pairs = Immutable.List(`
                    dataloaded
                    monthChangeClicked:changeMonth`
                .split(/\n/))
                .filter(pair => pair)
                .map(pair => pair.split("#")[0].replace(/\s+/g, "").split(":"));
        this.on = pairs
                .reduce((map, pair) => map.set(pair[0], new Signal()), Immutable.Map())
                .toJS()
        pairs.filter(pair => pair[1])
                .forEach(pair => this.on[pair[0]].add(this[pair[1]].bind(this)))
    }
    changeMonth(dir) {

    }
    //{/*{this.state.showEdit && <CalendarEditor editable={editable}/>}*/}
    //{this.getWeeks(Immutable.List([]), month, firstSunday, groups, users, data, editable)}
    render() {
        return (
            <Grid fluid={true}>
                <Header title="Default Calendar" date={new Date()} on={this.on}/>
            </Grid>
        )
    }
}
