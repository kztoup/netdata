import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useTable, usePagination, useExpanded, useSortBy} from "react-table";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';

const TableComponent = ({ columns, data, fetchData, loading}) => {
  const navigate = useNavigate();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 1,
        pageSize: 10,
        hiddenColumns: columns
          .filter((column) => !column.show)
          .map((column) => column.id),
      },
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      pageCount: 101,
    },
    useSortBy,
    useExpanded,
    usePagination
  );

  useEffect(() => {
    fetchData && fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <>
    {
      loading ?
        <div className="text-center">
          <Spinner animation="border" role="status" />
        </div> :
        <div className="flex flex-col w-full">
          <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200"></div>
              <Table striped bordered hover {...getTableProps()}>
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} onClick={() => navigate(`/coins/${row.original.id}:${row.original.symbol}`)}>
                        {row.cells.map(({column, original, getCellProps, render}) => {
                          return (<td {...getCellProps()}>{render('Cell')}</td>)
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <div className="d-flex justify-content-between">
                <Pagination>
                  <Pagination.First disabled={pageIndex === 1} onClick={() => gotoPage(1)} />
                  <Pagination.Prev disabled={pageIndex === 1} onClick={() => previousPage()} />
                  <Pagination.Item>{pageIndex} / {pageOptions.length - 1}</Pagination.Item>
                  <Pagination.Next disabled={pageIndex === 100} onClick={() => nextPage()} />
                  <Pagination.Last disabled={pageIndex === 100} onClick={() => gotoPage(100)} />
                </Pagination>
                <div className="d-flex align-items-center">
                  page size: &nbsp;
                  <Form.Select
                    style={{width: '200px', height: '38px'}}
                    onChange={({target}) => setPageSize(Number(target.value))}
                    value={pageSize}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </Form.Select>
                </div>
              </div>
          </div>
        </div>
      }
    </>
  );
};

export default TableComponent;
