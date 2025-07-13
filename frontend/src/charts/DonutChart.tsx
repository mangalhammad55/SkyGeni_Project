import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

interface DonutChartProps {
  data: { label: string; value: number }[];
}

export const DonutChart = ({ data }: DonutChartProps) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 360;
    const radius = Math.min(width, 300) / 2;

    const chart = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2 - 30})`);

    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.label))
      .range(["#1f77b4", "#ff7f0e"]);

    const pie = d3
      .pie<{ label: string; value: number }>()
      .value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);

    chart
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc as any)
      .attr("fill", (d) => color(d.data.label)!);

    chart
      .selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .style("font-size", "10px")
      .text(
        (d) =>
          `$${(d.data.value / 1000).toFixed(0)}K\n(${Math.round(
            (d.data.value / d3.sum(data, (d) => d.value)) * 100
          )}%)`
      );

    chart
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .style("font-size", "14px")
      .text(`Total $${(d3.sum(data, (d) => d.value) / 1000).toFixed(0)}K`);

    // Move legend below donut
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width / 2 - 60}, ${height - 40})`);

    data.forEach((d, i) => {
      const xOffset = i * 120;

      legend
        .append("rect")
        .attr("x", xOffset)
        .attr("y", 0)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", color(d.label)!);

      legend
        .append("text")
        .attr("x", xOffset + 18)
        .attr("y", 10)
        .attr("font-size", "12px")
        .text(d.label);
    });
  }, [data]);

  return <svg ref={ref} />;
};
