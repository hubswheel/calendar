import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap'
import Immutable from 'immutable';
import Signal from 'signals'; //  var mySignal = new Signal();
import { Grid, Row, Col, ButtonGroup, Button, DropdownButton, Badge, Label, Table } from 'react-bootstrap';
import $ from 'jquery';
import moment from 'moment';
import { Router, Route, Link } from 'react-router'

export default class Calendar extends React.Component {
    render() {
        return (
            <div>
                This is the admin page
                <Button>
                    <Link to={{pathname: "/"}}>back to calendar</Link>
                </Button>
            </div>
        )
    }
}
