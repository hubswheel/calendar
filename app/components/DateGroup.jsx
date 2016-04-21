import {Grid, Row, Col, ButtonGroup, Button, DropdownButton, Badge, Label } from 'react-bootstrap';

export default class Week extends React.Component {
    render() {
        const {group, date}= this.props;
        return (
            <Col
                md={1}>
                {`${group && group.name || ""} ${date.date()} `}
            </Col>
        )
    }
}
