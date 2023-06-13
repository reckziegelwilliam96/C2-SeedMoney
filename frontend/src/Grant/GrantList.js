import React from 'react';
import GrantCard from './GrantCard';
import { Container, Row, Col } from 'reactstrap';

const GrantList = ({ grants }) => {
    return (
        <Container>
            <Row>
                {grants.map((grant, index) => (
                    <Col sm="4" key={index}>
                        <GrantCard grant={grant} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default GrantList;
