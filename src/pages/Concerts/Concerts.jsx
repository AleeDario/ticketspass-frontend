import React, { useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ConcertCard from "../../components/Concerts/ConcertCard/ConcertCard";
import concertsActions from "../../redux/actions/concertsActions";
import Search from "../../utils/search/Search";
import "./Concerts.css";

export default function Concerts() {
    const dispatch = useDispatch();
    const { getInitialData, getQuery } = concertsActions;
    const { concerts, search, initial, loading, message } = useSelector(store => store.concerts);

    useState(() => {
        if (initial) {
            dispatch(getInitialData());
        }
    }, []);

    const onSearch = e => {
        let query = { params: { name: e.target.value } };
        dispatch(getQuery({ query }));
    };
    return (
        <>
            <div className='backNav'></div>
            <div className="p-5 container">
                <div className="mb-4 d-flex justify-content-end">
                    <Search placeholder="Search by concert" onChange={onSearch} defaultValue={search} />
                </div>
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner className="text-center" />
                    </div>
                ) : concerts.length > 0 ? (
                    <Row xs={1} md={2} xl={3}>
                        {concerts.map(concert => (
                            <Col key={concert._id} className="mb-5">
                                <ConcertCard concert={concert} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <h2 className="text-center text-main">{message}</h2>
                )}
            </div>
        </>
    );
}
