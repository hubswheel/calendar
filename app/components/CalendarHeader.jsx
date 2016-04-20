import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap'
import $ from 'jquery';
import Icon from 'react-fa'
import moment from 'moment'
import { Router, Route, Link } from 'react-router'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {date: props.date, config: props.config}
        props.on.dateChanged.add(date => this.setState({date: date}))
        props.on.configUpdated.add(config => {
            console.log("config", config);
            this.setState({config: config})
        })
    }
    render() {
        var on = this.props.on,
            {monthTitleFormat: format, title, canShowAdminLink} = this.state.config,
            {date} = this.state;

        return (
            <span>
                <h2 style={{textAlign: "center"}}>
                    {title}
                </h2>
                <h4 style={{textAlign: "center"}}>
                    <span
                        onClick={on.dateChangeClicked.dispatch.bind(null, -1, "months")}
                        style={{marginRight: 10, marginTop: 2, cursor: "pointer"}}>
                        <Icon name="chevron-left"/>
                    </span>
                    {date.format(format)}
                    <span
                        onClick={on.dateChangeClicked.dispatch.bind(null, 1, "months")}
                        style={{marginLeft: 10, marginTop: 2, cursor: "pointer"}}>
                        <Icon name="chevron-right"/>
                    </span>
                </h4>
                {canShowAdminLink && <Link to={{pathname: "/admin"}}>Admin page</Link>}
            </span>
        )
    }
}
