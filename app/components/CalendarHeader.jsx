import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap'
import {Grid, Row, Col, ButtonGroup, Button, Overlay, DropdownButton, Badge, Label, Table } from 'react-bootstrap';
import $ from 'jquery';
import Icon from 'react-fa'

export default class Header extends React.Component {
    render() {
        var {title, date, on} = this.props;
        return (
            <span>
                <h2 style={{textAlign: "center"}}>
                    {title}
                </h2>
                <h4 style={{textAlign: "center"}}>
                    <span
                        onClick={on.monthChangeClicked.dispatch.bind(null, -1)}
                        style={{marginRight: 10, marginTop: 2}}>
                        <Icon name="chevron-left"/>
                    </span>
                    {(date.getMonth() + 1) + "/" + date.getFullYear()}
                    <span
                        onClick={on.monthChangeClicked.dispatch.bind(null, -1)}
                        style={{marginLeft: 10, marginTop: 2}}>
                        <Icon name="chevron-right"/>
                    </span>
                </h4>
            </span>
        )
    }
}
