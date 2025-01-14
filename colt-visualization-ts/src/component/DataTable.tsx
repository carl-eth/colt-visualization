import React, { useEffect } from 'react';
import * as d3 from 'd3';

interface TableRow {
  country: string;
  events: number;
  avg: number;
  change: string;
}

const DataTableComponent: React.FC = () => {
  useEffect(() => {
    const tableData: TableRow[] = [
      { country: 'Ukraine', events: 979, avg: 999, change: '-2%' },
      { country: 'Syria', events: 239, avg: 286, change: '-16%' },
      { country: 'Russia', events: 232, avg: 299, change: '-22%' },
    ];

    const tbody = d3.select('#data-table tbody');
    tableData.forEach((row) => {
      const tr = tbody.append('tr');
      Object.values(row).forEach((value) => {
        tr.append('td').text(value);
      });
    });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Event Count and Change Statistics</h2>
      <table id="data-table" className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border">Country</th>
            <th className="px-4 py-2 text-left border">Events in Week of 7 Dec</th>
            <th className="px-4 py-2 text-left border">4 Week Avg</th>
            <th className="px-4 py-2 text-left border">Pct Change</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default DataTableComponent;
