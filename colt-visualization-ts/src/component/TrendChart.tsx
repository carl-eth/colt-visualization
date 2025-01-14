import React, { useEffect } from 'react';
import * as d3 from 'd3';

interface TrendData {
  week: string;
  events: number;
}

const TrendChartComponent: React.FC = () => {
  useEffect(() => {
    const trendData: TrendData[] = [
      { week: 'Week 1', events: 3000 },
      { week: 'Week 2', events: 3200 },
      { week: 'Week 3', events: 3400 },
      { week: 'Week 4', events: 5000 },
    ];

    const svg = d3.select('#trend-chart').append('svg').attr('width', 800).attr('height', 300);

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scalePoint().domain(trendData.map((d) => d.week)).range([0, width]);
    const y = d3.scaleLinear().domain([0, d3.max(trendData, (d) => d.events) || 0]).range([height, 0]);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
    g.append('g').call(d3.axisLeft(y));

    g.append('path')
      .datum(trendData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line<TrendData>()
          .x((d) => x(d.week) ?? 0)
          .y((d) => y(d.events))
      );
  }, []);

  return <div className="trend-chart w-full h-[300px]" id="trend-chart"></div>;
};

export default TrendChartComponent;
