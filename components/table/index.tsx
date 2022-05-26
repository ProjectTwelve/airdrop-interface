/* eslint-disable react/jsx-key */
import { useMemo } from 'react';
import classNames from 'classnames';
import { useTable } from 'react-table';
import Empty from '../empty';

type TableProps = {
  dataSource: any[];
  columns: any[];
  className?: string;
};

export default function Table({ dataSource, columns, className }: TableProps) {
  const data = useMemo(() => dataSource, [dataSource]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  return (
    <div className={classNames('react-table', className)}>
      <table className="table-auto" {...getTableProps()}>
        <thead className="react-table-thead">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="react-table-cell" {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="react-table-tbody" {...getTableBodyProps()}>
          {rows?.length ? (
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className="react-table-cell" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4}>
                <Empty />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
