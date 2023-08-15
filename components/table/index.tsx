import { useMemo } from 'react';
import classNames from 'classnames';
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import Empty from '../empty';
import Loading from '../loading';

type TableProps = {
  dataSource: any[];
  columns: any[];
  className?: string;
  loading?: boolean;
};

export default function Table({ dataSource, columns, className, loading }: TableProps) {
  const data = useMemo(() => dataSource, [dataSource]);
  const { getRowModel, getHeaderGroups } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  const { rows } = getRowModel();

  return (
    <div className={classNames('react-table', className)}>
      <table className="table-auto">
        <thead className="react-table-thead">
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="react-table-cell">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="react-table-tbody">
          {rows.length ? (
            rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td className="react-table-cell" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : loading ? (
            <tr>
              <td colSpan={columns.length}>
                <Loading className="mt-8" size={48} />
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={columns.length}>
                <Empty />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
