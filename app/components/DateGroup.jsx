import {Grid, Row, Col, ButtonGroup, Button, DropdownButton, Badge, Label } from 'react-bootstrap';

export default class Week extends React.Component {
    render() {
        const   {name, date} = this.props;
        return (
            <Col
                md={1}>
                {`${name || ""} ${date.date()} `}
            </Col>
        )
    }
}
