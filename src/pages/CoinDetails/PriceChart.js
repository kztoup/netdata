import React, {useState, useEffect} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import {getPriceChart} from "../../api";
import {getDate} from "./utils";

const PriceChart = ({id}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(1);

  useEffect(() => {
    const fetchDetailsData = async () => {
      try {
        setLoading(true);
        const response = await getPriceChart(id, days);
        setData(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailsData();
  }, [id, days]);

  if (error) {
    return (<Alert variant="danger">{error}</Alert>);
  }

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <>
      <Form.Select
        value={days}
        className="mb-5"
        onChange={(event) => setDays(event.target.value)}
      >
        <option value="1">1 day ago</option>
        <option value="14">14 days ago</option>
        <option value="30">1 month ago</option>
        <option value="90">3 months ago</option>
        <option value="365"> 1 year ago</option>
        <option value="max"> Since the creation of the coin</option>
      </Form.Select>
      <div style={{width: '100%', height: '300px'}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data?.prices?.map(([timestamp, value]) => ({name: getDate(timestamp), value}))}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label="Date" tickMargin={-25} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default PriceChart;
