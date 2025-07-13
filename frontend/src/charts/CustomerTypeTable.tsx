import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface CustomerDataItem {
  closed_fiscal_quarter: string;
  Cust_Type: string;
  count: number;
  acv: number;
}

interface CustomerTypeTableProps {
  data: CustomerDataItem[];
}

export const CustomerTypeTable = ({ data }: CustomerTypeTableProps) => {
  const quarters = Array.from(
    new Set(data.map((item) => item.closed_fiscal_quarter))
  );
  const types = ["Existing Customer", "New Customer"];

  const grouped = types.map((type) => {
    const row: any = { type, totalCount: 0, totalACV: 0, quarters: {} };
    quarters.forEach((q) => {
      const item = data.find(
        (d) => d.closed_fiscal_quarter === q && d.Cust_Type === type
      );
      if (item) {
        row.totalCount += item.count;
        row.totalACV += item.acv;
        row.quarters[q] = {
          count: item.count,
          acv: item.acv,
        };
      } else {
        row.quarters[q] = { count: 0, acv: 0 };
      }
    });
    return row;
  });

  const grandTotalACV = grouped.reduce((sum, t) => sum + t.totalACV, 0);
  const grandTotalCount = grouped.reduce((sum, t) => sum + t.totalCount, 0);

  return (
    <div style={{ marginTop: 40 }}>
      <Typography variant="h6" gutterBottom>
        Summary by Quarter
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Cust Type</TableCell>
              {quarters.map((q) => (
                <TableCell key={q} align="right" colSpan={3}>
                  {q}
                </TableCell>
              ))}
              <TableCell align="right" colSpan={3}>
                Total
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              {quarters.map((q) => (
                <React.Fragment key={q}>
                  <TableCell align="right"># of Opps</TableCell>
                  <TableCell align="right">ACV</TableCell>
                  <TableCell align="right">% of Total</TableCell>
                </React.Fragment>
              ))}
              <TableCell align="right"># of Opps</TableCell>
              <TableCell align="right">ACV</TableCell>
              <TableCell align="right">% of Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grouped.map((row) => (
              <TableRow key={row.type}>
                <TableCell>{row.type}</TableCell>
                {quarters.map((q) => {
                  const acv = row.quarters[q].acv;
                  const count = row.quarters[q].count;
                  return (
                    <React.Fragment key={q}>
                      <TableCell align="right">{count}</TableCell>
                      <TableCell align="right">
                        ${(acv / 1000).toFixed(1)}K
                      </TableCell>
                      <TableCell align="right">
                        {grandTotalACV
                          ? `${Math.round((acv / grandTotalACV) * 100)}%`
                          : "0%"}
                      </TableCell>
                    </React.Fragment>
                  );
                })}
                <TableCell align="right">{row.totalCount}</TableCell>
                <TableCell align="right">
                  ${(row.totalACV / 1000).toFixed(1)}K
                </TableCell>
                <TableCell align="right">
                  {grandTotalACV
                    ? `${Math.round((row.totalACV / grandTotalACV) * 100)}%`
                    : "0%"}
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ fontWeight: "bold" }}>
              <TableCell>
                <strong>Total</strong>
              </TableCell>
              {quarters.map((q) => {
                const total = grouped.reduce(
                  (sum, t) => sum + t.quarters[q].acv,
                  0
                );
                const count = grouped.reduce(
                  (sum, t) => sum + t.quarters[q].count,
                  0
                );
                return (
                  <React.Fragment key={q}>
                    <TableCell align="right">{count}</TableCell>
                    <TableCell align="right">
                      ${(total / 1000).toFixed(1)}K
                    </TableCell>
                    <TableCell align="right">100%</TableCell>
                  </React.Fragment>
                );
              })}
              <TableCell align="right">{grandTotalCount}</TableCell>
              <TableCell align="right">
                ${(grandTotalACV / 1000).toFixed(1)}K
              </TableCell>
              <TableCell align="right">100%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
