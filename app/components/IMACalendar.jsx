import Calendar from './Calendar';

export default class IMACalendar extends Calendar {
    constructor(props) {
        super(props)
        this.updateConfig(this.getConfig())
        this.state = Object.assign({}, this.state, {date: moment("12/01/2016", "MM/DD/YYYY")})
    }
    getConfig() {
        return {
            monthTitleFormat: "MMM YYYY",
            title: "IMA Calendar",
            canShowAdminLink: true,
            dayGroups: [{id: 1, name: "AM"}, {id: 2, name: "PM"}]
        }
    }
}
