import React, {useState, useEffect} from "react";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import ListIem from './ListIem';
import {getCoinDetails} from "../../api";
import {links, socialMediaStats, getDate} from "./utils";

const Details = ({id, symbol}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetailsData = async () => {
      try {
        setLoading(true);
        const response = await getCoinDetails(id);
        setData(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailsData();
  }, [id]);

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
    <ListGroup>
      <ListIem label="Current price" value={data.market_data?.current_price?.[symbol]} />
      {
        data.description?.en &&
          <>
            <ListGroup.Item dangerouslySetInnerHTML={{__html: `<b className="mr-1">Description</b>: ${data.description.en}`}} />
          </>
      }
      {
        data.links &&
          <ListGroup.Item>
            <b className="me-1">Contact and social media links:</b>
            <ul>
            {Object.entries(data.links).map(([key, value]) =>
              Array.isArray(value) &&
                <li key={key}>
                  {links[key] ?? key}:
                  <ol>{value.map((link) => link && (<li key={link}>{link}</li>))}</ol>
                </li>
            )}
            </ul>
          </ListGroup.Item>
      }
      {
        data.community_data &&
          <ListGroup.Item>
            <b className="me-1">Social media statistics:</b>
            <ul>{Object.entries(data.community_data).map(([key, value]) => (<li key={key}>{socialMediaStats[key] ??key }: {value ?? '-'}</li>))}</ul>
          </ListGroup.Item>
      }
      {
        data.developer_data && 
          <ListGroup.Item>
            <b className="me-1">Github statistics:</b>
            <ul>
            {[
              {key: 'forks', label: 'Forks'},
              {key: 'stars', label: 'Stars'},
              {key: 'subscribers', label: 'Subscribers'},
              {key: 'total_issues', label: 'Issues'}
            ].map(({key, label}) => (<li key={key}>{label}: {data.developer_data[key] ?? '-'}</li>))}</ul>
          </ListGroup.Item>
      }
      {
        <ListGroup.Item>
          <b className="me-1">Reputation score:</b>
          <ul>
          {[
            {label: 'Up votes', value: data.sentiment_votes_up_percentage},
            {label: 'Down votes', value: data.sentiment_votes_down_percentage}
          ].map(({label, value}, index) => (<li key={index}>{label}: {value ?? '-'}</li>))}</ul>
        </ListGroup.Item>
      }
      {
        <ListGroup.Item>
          <b className="me-1">Price changes:</b>
          <ul>
          {[
            {label: '24 hous', value: data.market_data?.price_change_percentage_24h},
            {label: '7 days', value: data.market_data?.price_change_percentage_7d},
            {label: '14 days', value: data.market_data?.price_change_percentage_14d},
            {label: '1 month', value: data.market_data?.price_change_percentage_30d},
            {label: '2 months', value: data.market_data?.price_change_percentage_60d},
            {label: '200 days', value: data.market_data?.price_change_percentage_200d},
            {label: '1 year', value: data.market_data?.price_change_percentage_1y}
          ].map(({label, value}, index) => (<li key={index}>{label}: {`${value} %` ?? '-'}</li>))}</ul>
        </ListGroup.Item>
      }
      {
        <ListIem label="Highest price on last day" value={data.market_data?.high_24h?.[symbol]} />
      }
      {
        <ListIem label="Lowest price on last day" value={data.market_data?.low_24h?.[symbol]} />
      }
      {
        data.market_data?.ath?.[symbol] && data.market_data?.ath_date?.[symbol] &&
          <ListIem label="Highest price since its creation" value={`${data.market_data.ath[symbol]} on ${getDate(data.market_data.ath_date[symbol])}`}/>
      }
      {
        data.market_data?.atl?.[symbol] && data.market_data?.atl_date?.[symbol] &&
          <ListIem label="Highest price since its creation" value={`${data.market_data.atl[symbol]} on ${getDate(data.market_data.atl_date[symbol])}`}/>
      }
    </ListGroup>
  );
};

export default Details;
