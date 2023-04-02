import React, { useState, useEffect } from 'react';
import SideBar from '../components/sideBar';
import { useTable } from 'react-table';

function viewreports() {
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [reports, setReports] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Report Type',
        accessor: 'reportType',
      },
      {
        Header: 'Message',
        accessor: 'message',
      },
      {
        Header: 'Civilian ID',
        accessor: 'civilianId',
      },
    ],
    []
  );

  const data = React.useMemo(() => reports, [reports]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:80/api/get-reports');
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="flex">
      <SideBar
        onSidebarHide={() => {
          onSetShowSidebar(true);
        }}
        showSidebar={showSidebar}
      />

      <div className="table-container ml-64 mt-4 ">
        <table {...getTableProps()} className="table w-[102rem]">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default viewreports;