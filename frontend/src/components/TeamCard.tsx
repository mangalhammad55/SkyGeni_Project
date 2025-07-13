import React from "react";
import { DataCard } from "./DataCard";
import { GroupedBarChart } from "../charts/GroupedBarChart";

interface TeamCardProps {
  data: any[];
}

export const TeamCard = ({ data }: TeamCardProps) => {
  const quarters = Array.from(
    new Set(data.map((d) => d.closed_fiscal_quarter))
  );
  const teams = Array.from(new Set(data.map((d) => d.Team)));

  // Structure for GroupedBarChart
  const groupedData = quarters.map((quarter) => {
    const entry: any = { quarter };
    teams.forEach((team) => {
      const item = data.find(
        (d) => d.closed_fiscal_quarter === quarter && d.Team === team
      );
      entry[team] = item ? item.acv : 0;
    });
    return entry;
  });

  // Structure for DonutChart
  const totalACVByTeam = teams.map((team) => {
    const sum = data
      .filter((d) => d.Team === team)
      .reduce((acc, curr) => acc + curr.acv, 0);
    return { label: team, value: sum };
  });

  return (
    <DataCard title="Team ACV Distribution">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <GroupedBarChart data={groupedData} keys={teams} xKey="quarter" />
      </div>
    </DataCard>
  );
};
