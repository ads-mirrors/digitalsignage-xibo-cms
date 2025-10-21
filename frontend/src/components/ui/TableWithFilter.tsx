import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import RowActions from './RowActions';

export interface Column<T extends object> {
  key: keyof T | 'actions';
  label: string;
  render?: (row: T) => ReactNode;
}

interface Props<T extends object> {
  data: T[];
  columns: Column<T>[];
}

export default function TableWithFilter<T extends object>({ data, columns }: Props<T>) {
  const [filter, setFilter] = useState('');
  const { t } = useTranslation();

  const filtered = data.filter((row) =>
    columns.some((col) => {
      if (col.key === 'actions') return false;
      const value = row[col.key as keyof T];
      return (
        value !== null &&
        value !== undefined &&
        String(value).toLowerCase().includes(filter.toLowerCase())
      );
    }),
  );

  return (
    <div>
      <input
        type="text"
        placeholder={t('Filter')}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={String(col.key)}
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {filtered.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-neutral-700">
                      {columns.map((col) => (
                        <td
                          key={String(col.key)}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
                        >
                          {col.key === 'actions' ? (
                            <RowActions<T> row={row} />
                          ) : col.render ? (
                            col.render(row)
                          ) : (
                            String(row[col.key as keyof T])
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
