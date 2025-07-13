import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

interface DataItem {
  label: string;
  value: number;
}

interface HorizontalBarChartProps {
  data: DataItem[];
}

export const HorizontalBarChart = ({ data }: HorizontalBarChartProps) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  useEffect(() => {
    const updateSize = () => {
      const parent = ref.current?.parentElement;
      if (parent) {
        setContainerWidth(parent.clientWidth);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = containerWidth;
    const height = data.length * 30 + 60;
    const margin = { top: 30, right: 40, bottom: 40, left: 200 };

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) ?? 0])
      .nice()
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.top, height - margin.bottom])
      .padding(0.15);

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMin")
      .append("g");

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.label)!)
      .attr("width", (d) => x(d.value) - x(0))
      .attr("height", y.bandwidth())
      .attr("fill", "#4682b4");

    g.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data, containerWidth]);

  return <svg ref={ref} style={{ width: "100%" }} />;
};
