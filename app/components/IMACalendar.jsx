import Calendar from './Calendar';
import {fromJS} from "immutable";

export default class IMACalendar extends Calendar {
    constructor(props) {
        super(props)
        this.state = {  config: this.state.config.merge(this.getConfig()),
                        date: moment("12/02/2016", "MM/DD/YYYY")}
    }
    componentDidMount() {
        this.loadEvents()
    }
    notify(t) {
        alert(t)
    }
    loadEvents() {
        const   {start, end} = this.getDisplayDateRange(),
                events = [  {date: "12/03/2016", display: "Sample Text", onClick: this.notify.bind(this, "yo"),
                                groupId: 1, comment: "comment"},
                            {date: "12/04/2016", display: "text2", groupId: 2, comment: "comment 2"},
                            {date: "12/05/2016", comment: "day comment"}]
        this.setState({events: this.processRawEvents(events, this.state.config.get("eventDateFormat"))})
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
