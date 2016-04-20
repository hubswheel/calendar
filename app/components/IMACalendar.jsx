import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar';
import moment from 'moment';

export default class IMACalendar extends Calendar {
    constructor(props) {
        super(props)
        this.updateConfig(this.getConfig()) // use signals in case config is retrieved async via ajax
        this.state = Object.assign({}, this.state, {date: moment("12/01/2016")})
    }
    getConfig() {
        return {
            monthTitleFormat: "MMM YYYY",
            title: "IMA Calendar",
            canShowAdminLink: true,
            dayGroups: ["AM", "PM"]
        }
    }
}
