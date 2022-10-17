import React from "react";
import {Link, useParams} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Details from "./Details";
import PriceChart from "./PriceChart";

const CoinsDetails = () => {
  const {param} = useParams();
  const [coinId, symbol] = param.split(':');

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Coin: {coinId}</h2>
        <Link to="/coins">Back</Link>
      </div>
      <Card className="mb-5">
        <Card.Body>
          <Card.Title>Coin details</Card.Title>
          <Details id={coinId} symbol={symbol} />
        </Card.Body>
      </Card>
      <Card className="mb-5">
        <Card.Body>
          <Card.Title>Price chart</Card.Title>
          <PriceChart id={coinId} />
        </Card.Body>
      </Card>
    </>
  );
};

export default CoinsDetails;
