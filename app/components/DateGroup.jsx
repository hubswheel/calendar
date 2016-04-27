import {Grid, Row, Col, ButtonGroup, Button, DropdownButton, Badge, Label } from 'react-bootstrap';

export default class Week extends React.Component {
    render() {
        const   {name, date, events} = this.props,
                comment = c => c && ` (${c})`,
                items = events.map(e => `${e.get("groupId")}: ${e.get("display")}${comment(e.get("comment"))}`)
                    .toList()
        return (
            <Col
                md={1}>
                {items}
            </Col>
        )
    }
}
