import React from "react";
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <div className=" mt-5">
          <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
          <p className="lead">
            The page you’re looking for doesn’t exist.
          </p>
          <Button onClick={() => navigate("/coins")} variant="primary">Go Home</Button>
        </div>
      </div>
    </div>
)};

export default NoMatch;
