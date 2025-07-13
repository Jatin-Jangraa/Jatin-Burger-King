// import React, { useRef, useEffect, useState } from "react";
// import * as d3 from "d3";



// const DualLineChart = () => {
//   const containerRef = useRef();
//   const svgRef = useRef();
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     const observer = new ResizeObserver(entries => {
//       const { width, height } = entries[0].contentRect;
//       setDimensions({ width, height });
//     });

//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!dimensions.width || !dimensions.height) return;

//     const margin = { top: 40, right: 40, bottom: 50, left: 50 };
//     const width = dimensions.width;
//     const height = dimensions.height;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();

//     const xScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.day)])
//       .range([margin.left, width - margin.right]);

//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => Math.max(d.revenue, d.transactions))])
//       .range([height - margin.bottom, margin.top]);

//     const lineRevenue = d3.line()
//       .x(d => xScale(d.day))
//       .y(d => yScale(d.revenue))
//       .curve(d3.curveMonotoneX);

//     const lineTransactions = d3.line()
//       .x(d => xScale(d.day))
//       .y(d => yScale(d.transactions))
//       .curve(d3.curveMonotoneX);

//     // Axes
//     svg.append("g")
//       .attr("transform",` translate(0,${height - margin.bottom})`)
//       .call(d3.axisBottom(xScale).ticks(data.length).tickFormat(d =>` Day ${d}`));

//     svg.append("g")
//       .attr("transform",` translate(${margin.left},0)`)
//       .call(d3.axisLeft(yScale));

//     // Lines
//     svg.append("path")
//       .datum(data)
//       .attr("fill", "none")
//       .attr("stroke", "#ff4e4e")
//       .attr("stroke-width", 3)
//       .attr("d", lineRevenue);

//     svg.append("path")
//       .datum(data)
//       .attr("fill", "none")
//       .attr("stroke", "#4e9aff")
//       .attr("stroke-width", 3)
//       .attr("d", lineTransactions);

//     // Points
//     svg.selectAll(".dot-revenue")
//       .data(data)
//       .enter()
//       .append("circle")
//       .attr("cx", d => xScale(d.day))
//       .attr("cy", d => yScale(d.revenue))
//       .attr("r", 5)
//       .attr("fill", "#ff4e4e");

//     svg.selectAll(".dot-transactions")
//       .data(data)
//       .enter()
//       .append("circle")
//       .attr("cx", d => xScale(d.day))
//       .attr("cy", d => yScale(d.transactions))
//       .attr("r", 5)
//       .attr("fill", "#4e9aff");

//     // Title
//     svg.append("text")
//       .attr("x", width / 2)
//       .attr("y", margin.top / 2)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "20px")
//       .attr("font-weight", "bold")
//       .text("Revenue vs Transactions");

//   }, [dimensions]);

//   return (
//     <div ref={containerRef} style={{ width: "100%", height: "400px" }}>
//       <svg ref={svgRef} width="100%" height="100%"></svg>
//     </div>
//   );
// };

// export default DualLineChart;




// import React, { useRef, useEffect, useState } from "react";
// import * as d3 from "d3";



// const DualLineChart = ({data}) => {
//   const containerRef = useRef();
//   const svgRef = useRef();
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     const observer = new ResizeObserver(entries => {
//       const { width, height } = entries[0].contentRect;
//       setDimensions({ width, height });
//     });

//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!dimensions.width || !dimensions.height) return;

//     const margin = { top: 40, right: 40, bottom: 50, left: 50 };
//     const width = dimensions.width;
//     const height = dimensions.height;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();

//     // Categorical xScale using month names
//     const xScale = d3.scaleBand()
//       .domain(data.map(d => d.month))
//       .range([margin.left, width - margin.right])
//       .padding(0.2);

//     // Continuous yScale
//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => Math.max(d.revenue, d.transactions))])
//       .nice()
//       .range([height - margin.bottom, margin.top]);

//     // Line generators using scaleBand midpoint for x
//     const lineRevenue = d3.line()
//       .x(d => xScale(d.month) + xScale.bandwidth() / 2)
//       .y(d => yScale(d.revenue))
//       .curve(d3.curveMonotoneX);

//     const lineTransactions = d3.line()
//       .x(d => xScale(d.month) + xScale.bandwidth() / 2)
//       .y(d => yScale(d.transactions))
//       .curve(d3.curveMonotoneX);

//     // Axes
//     svg.append("g")
//       .attr("transform",` translate(0,${height - margin.bottom})`)
//       .call(d3.axisBottom(xScale));

//     svg.append("g")
//       .attr("transform",` translate(${margin.left},0)`)
//       .call(d3.axisLeft(yScale));

//     // Lines
//     svg.append("path")
//       .datum(data)
//       .attr("fill", "none")
//       .attr("stroke", "#ff4e4e")
//       .attr("stroke-width", 3)
//       .attr("d", lineRevenue);

//     svg.append("path")
//       .datum(data)
//       .attr("fill", "none")
//       .attr("stroke", "#4e9aff")
//       .attr("stroke-width", 3)
//       .attr("d", lineTransactions);

//     // Points
//     svg.selectAll(".dot-revenue")
//       .data(data)
//       .enter()
//       .append("circle")
//       .attr("cx", d => xScale(d.month) + xScale.bandwidth() / 2)
//       .attr("cy", d => yScale(d.revenue))
//       .attr("r", 5)
//       .attr("fill", "#ff4e4e");

//     svg.selectAll(".dot-transactions")
//       .data(data)
//       .enter()
//       .append("circle")
//       .attr("cx", d => xScale(d.month) + xScale.bandwidth() / 2)
//       .attr("cy", d => yScale(d.transactions))
//       .attr("r", 5)
//       .attr("fill", "#4e9aff");

//     // Title
//     svg.append("text")
//       .attr("x", width / 2)
//       .attr("y", margin.top / 2)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "20px")
//       .attr("font-weight", "bold")
//       .text("Revenue vs Transactions (Monthly)");

//   }, [dimensions]);

//   return (
//     <div ref={containerRef} style={{ width: "100%", height: "400px" }}>
//       <svg ref={svgRef} width="100%" height="100%"></svg>
//     </div>
//   );
// };

// export default DualLineChart;

import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const DualLineChart = ({ data }) => {
  const containerRef = useRef();
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const margin = { top: 60, right: 40, bottom: 50, left: 60 };
    const width = dimensions.width;
    const height = dimensions.height;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const tooltip = d3.select(tooltipRef.current)
      .style("position", "absolute")
      .style("padding", "8px")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("font-size", "12px");

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.revenue, d.transactions))])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const lineRevenue = d3.line()
      .x(d => xScale(d.month) + xScale.bandwidth() / 2)
      .y(d => yScale(d.revenue))
      .curve(d3.curveMonotoneX);

    const lineTransactions = d3.line()
      .x(d => xScale(d.month) + xScale.bandwidth() / 2)
      .y(d => yScale(d.transactions))
      .curve(d3.curveMonotoneX);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#ff4e4e")
      .attr("stroke-width", 3)
      .attr("d", lineRevenue);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4e9aff")
      .attr("stroke-width", 3)
      .attr("d", lineTransactions);

    // Revenue points
    svg.selectAll(".dot-revenue")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.month) + xScale.bandwidth() / 2)
      .attr("cy", d => yScale(d.revenue))
      .attr("r", 5)
      .attr("fill", "#ff4e4e")
      .on("mouseover", (event, d) => {
        const [x, y] = d3.pointer(event);
        tooltip
          .html(`<strong>${d.month}</strong><br/><span style="color:#ff4e4e">Revenue:</span> ₹${d.revenue}`)
          .style("left", x + 15 + "px")
          .style("top", y + "px")
          .transition().duration(200).style("opacity", 1);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    // Transactions points
    svg.selectAll(".dot-transactions")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.month) + xScale.bandwidth() / 2)
      .attr("cy", d => yScale(d.transactions))
      .attr("r", 5)
      .attr("fill", "#4e9aff")
      .on("mouseover", (event, d) => {
        const [x, y] = d3.pointer(event);
        tooltip
          .html(`<strong>${d.month}</strong><br/><span style="color:#4e9aff">Transactions:</span> ${d.transactions}`)
          .style("left", x + 15 + "px")
          .style("top", y + "px")
          .transition().duration(200).style("opacity", 1);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    // Title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .text("Revenue vs Transactions (Monthly)");

    // Legend
  

    // Legend
const legendData = [
  { label: "Revenue in ₹100", color: "#ff4e4e" },
  { label: "Transactions", color: "#4e9aff" },
];

const legendSpacing = 140;
const legendWidth = legendData.length * legendSpacing;
const startX = (width - legendWidth) / 2;
const legendY = height - 20;

const legend = svg
  .selectAll(".legend")
  .data(legendData)
  .enter()
  .append("g")
  .attr("class", "legend")
  .attr("transform", (d, i) =>` translate(${startX + i * legendSpacing}, ${legendY})`);

legend.append("circle")
  .attr("r", 6)
  .attr("fill", d => d.color);

legend.append("text")
  .attr("x", 10)
  .attr("y", 5)
  .text(d => d.label)
  .attr("font-size", "12px")
  .attr("fill", "#333");

  }, [dimensions, data]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "400px", position: "relative" }}>
      <svg ref={svgRef} width="100%" height="100%"></svg>
      <div ref={tooltipRef}></div>
    </div>
  );
};

export default DualLineChart;