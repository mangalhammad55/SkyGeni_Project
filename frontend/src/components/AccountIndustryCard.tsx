import React from "react";
import { DataCard } from "./DataCard";
import { HorizontalBarChart } from "../charts/HorizontalBarChart";

interface AccountIndustryCardProps {
  data: any[];
}

export const AccountIndustryCard = ({ data }: AccountIndustryCardProps) => {
  const industries = Array.from(new Set(data.map((d) => d.Acct_Industry)));

  // Aggregate total ACV by industry
  const totalACVByIndustry = industries.map((industry) => {
    const sum = data
      .filter((d) => d.Acct_Industry === industry)
      .reduce((acc, curr) => acc + curr.acv, 0);
    return { label: industry, value: sum };
  });

  return (
    <DataCard title="ACV by Account Industry">
      <div style={{ width: "100%" }}>
        <HorizontalBarChart data={totalACVByIndustry} />
      </div>
    </DataCard>
  );
};
