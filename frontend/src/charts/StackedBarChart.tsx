import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

interface StackedBarChartProps {
  data: any[];
  keys: string[]; // e.g. ['Existing Customer', 'New Customer']
  xKey: string; // e.g. 'closed_fiscal_quarter'
}

export const StackedBarChart = ({ data, keys, xKey }: StackedBarChartProps) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 300;
    const margin = { top: 40, right: 20, bottom: 40, left: 60 };

    const chart = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const stack = d3.stack().keys(keys);
    const stackedData = stack(data);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => String(d[xKey])))
      .range([0, width - margin.left - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d3.sum(keys, (key) => d[key])) ?? 0])
      .range([height - margin.top - margin.bottom, 0]);

    const color = d3
      .scaleOrdinal<string>()
      .domain(keys)
      .range(["#1f77b4", "#ff7f0e"]);

    chart
      .selectAll("g.layer")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("class", "layer")
      .attr("fill", (d) => color(d.key)!)
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr("x", (d) => x(String(d.data[xKey]))!)
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

    chart
      .append("g")
      .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x));

    chart.append("g").call(d3.axisLeft(y));
  }, [data, keys, xKey]);

  return <svg ref={ref} />;
};
