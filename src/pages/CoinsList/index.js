import React, {useState, useCallback, Fragment} from "react";
import Alert from 'react-bootstrap/Alert';
import Table from "./Table";
import {columns} from "./utils"
import {getCoins} from "../../api";

const CoinsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchListData = async (pageSize, pageIndex) => {
    try {
      setLoading(true);
      const response = await getCoins(pageSize, pageIndex);
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
      fetchListData(pageSize, pageIndex)
    }, []
  );

  if (error) {
    return (<Alert variant="danger">{error}</Alert>);
  }

  return (
    <>
      <h5>Coins List</h5>
      <Table
        fetchData={fetchData}
        columns={columns}
        loading={loading}
        data={data}
      />
    </>
  );
}

export default CoinsList;
