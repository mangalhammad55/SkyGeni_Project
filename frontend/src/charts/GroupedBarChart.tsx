import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

interface GroupedBarChartProps {
  data: any[];
  keys: string[];
  xKey: string;
}

export const GroupedBarChart = ({ data, keys, xKey }: GroupedBarChartProps) => {
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
    if (!data.length || !keys.length) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = containerWidth;
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 40, left: 60 };

    const x0 = d3
      .scaleBand()
      .domain(data.map((d) => d[xKey]))
      .rangeRound([margin.left, width - margin.right])
      .paddingInner(0.1);

    const x1 = d3
      .scaleBand()
      .domain(keys)
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d3.max(keys, (key) => d[key])) || 0])
      .nice()
      .rangeRound([height - margin.bottom, margin.top]);

    const color = d3
      .scaleOrdinal<string>()
      .domain(keys)
      .range(d3.schemeCategory10);

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMin")
      .append("g");

    g.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${x0(d[xKey])},0)`)
      .selectAll("rect")
      .data((d) => keys.map((key) => ({ key, value: d[key] })))
      .enter()
      .append("rect")
      .attr("x", (d) => x1(d.key)!)
      .attr("y", (d) => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => y(0) - y(d.value))
      .attr("fill", (d) => color(d.key)!);

    g.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x0));

    g.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data, keys, xKey, containerWidth]);

  return <svg ref={ref} style={{ width: "100%" }} />;
};
