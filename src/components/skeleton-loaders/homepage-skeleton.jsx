import React from 'react';
import { Container, Row, Col, Skeleton } from 'react-bootstrap';

const HomepageSkeleton = () => {
    return (
        <Container>
            {/* Hero Banner Skeleton */}
            <Row className="mb-4">
                <Col>
                    <Skeleton height={300} />
                </Col>
            </Row>

            {/* Categories Skeleton */}
            <Row className="mb-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Col key={index} md={3} className="mb-3">
                        <Skeleton height={150} />
                        <Skeleton width="80%" />
                    </Col>
                ))}
            </Row>

            {/* Featured Products Skeleton */}
            <Row className="mb-4">
                <Col>
                    <Skeleton width="30%" className="mb-3" />
                </Col>
            </Row>
            <Row>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Col key={index} md={4} className="mb-3">
                        <Skeleton height={200} />
                        <Skeleton width="90%" className="mt-2" />
                        <Skeleton width="60%" />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HomepageSkeleton;