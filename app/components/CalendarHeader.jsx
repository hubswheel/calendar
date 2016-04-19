import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap'
import $ from 'jquery';
import Icon from 'react-fa'
import moment from 'moment'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {date: props.date}
        props.on.monthChanged.add(date => this.setState({date: date}))
    }
    render() {
        var {title, on} = this.props,
            {date} = this.state;
        return (
            <span>
                <h2 style={{textAlign: "center"}}>
                    {title}
                </h2>
                <h4 style={{textAlign: "center"}}>
                    <span
                        onClick={on.monthChangeClicked.dispatch.bind(null, -1)}
                        style={{marginRight: 10, marginTop: 2, cursor: "pointer"}}>
                        <Icon name="chevron-left"/>
                    </span>
                    {date.format("MM/YYYY")}
                    <span
                        onClick={on.monthChangeClicked.dispatch.bind(null, 1)}
                        style={{marginLeft: 10, marginTop: 2, cursor: "pointer"}}>
                        <Icon name="chevron-right"/>
                    </span>
                </h4>
            </span>
        )
    }
}
