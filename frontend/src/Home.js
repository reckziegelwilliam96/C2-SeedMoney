import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const { user, token } = useSelector((state) => state.user);

    return (
        <div className="home-container">
            <Card>
                <CardBody>
                    <CardTitle>SeedMoney</CardTitle>
                </CardBody>
                <CardText>Plant tomorrow's financial seeds today..</CardText>
                {(token && user) ? (
                <CardText>Welcome back, {user?.first_name}</CardText>
                ) : (
                    <div className="button-container">
                        <Link to="/login">
                            <Button color="primary">Log In</Button>
                        </Link>
                        <Link to="/register">
                            <Button color="primary">Register</Button>
                        </Link>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Home;