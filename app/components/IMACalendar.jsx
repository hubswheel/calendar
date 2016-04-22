import Calendar from './Calendar';
import {fromJS} from 'immutable'

export default class IMACalendar extends Calendar {
    constructor(props) {
        super(props)
        this.state = {config: fromJS(this.getConfig()), date: moment("12/02/2016", "MM/DD/YYYY")}
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
