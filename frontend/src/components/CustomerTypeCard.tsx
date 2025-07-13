import React from "react";
import { DataCard } from "./DataCard";
import { StackedBarChart } from "../charts/StackedBarChart";
import { DonutChart } from "../charts/DonutChart";
import { CustomerTypeTable } from "../charts/CustomerTypeTable";

interface Props {
  customerData: any[];
  acvRangeData: any[];
}

export const CustomerTypeCard = ({ customerData, acvRangeData }: Props) => {
  const quarters = Array.from(
    new Set(customerData.map((d) => d.closed_fiscal_quarter))
  );
  const types = ["Existing Customer", "New Customer"];

  // Prepare stacked data from ACV Range (summed per Cust_Type per quarter)
  const stackedData: any[] = [];
  quarters.forEach((q) => {
    const row: any = {
      closed_fiscal_quarter: q,
      "Existing Customer": 0,
      "New Customer": 0,
    };
    customerData.forEach((d) => {
      if (d.closed_fiscal_quarter === q) {
        row[d.Cust_Type] += d.acv;
      }
    });
    stackedData.push(row);
  });

  // Donut total ACV by customer type
  const totalACVByType = types.map((type) => {
    const total = customerData
      .filter((d) => d.Cust_Type === type)
      .reduce((sum, d) => sum + d.acv, 0);
    return { label: type, value: total };
  });

  return (
    <DataCard title="Won ACV Mix by Cust Type">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <StackedBarChart
          data={stackedData}
          keys={types}
          xKey="closed_fiscal_quarter"
        />
        <DonutChart data={totalACVByType} />
      </div>
      <CustomerTypeTable data={customerData} />
    </DataCard>
  );
};
