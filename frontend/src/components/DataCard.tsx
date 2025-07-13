import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const DataCard = ({ title, children }: Props) => (
  <Card style={{ margin: "20px", padding: "10px" }}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      {children}
    </CardContent>
  </Card>
);
