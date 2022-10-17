import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';

const ListIem = ({label, value}) => (
  <>
    {
      value &&
        <ListGroup.Item><b className="me-1">{label}:</b>{value}</ListGroup.Item>
    }
  </>
)

export default ListIem;
