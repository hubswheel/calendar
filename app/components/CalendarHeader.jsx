import { Router, Route, Link } from 'react-router'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {date: props.date, config: props.config}
        props.on.dateChanged.add(date => this.setState({date: date}))
        props.on.configUpdated.add(config => {
            this.setState({config: config})
        })
    }
    render() {
        const   {on, config} = this.props,
                format = config.get("monthTitleFormat"),
                title = config.get("title"),
                canShowAdminLink = config.get("canShowAdminLink"),
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
