import React, { useEffect, useState } from "react";
import { fetchData } from "./services/api";
import { DataCard } from "./components/DataCard";
import { CustomerTypeCard } from "./components/CustomerTypeCard";
import { TeamCard } from "./components/TeamCard";
import { AccountIndustryCard } from "./components/AccountIndustryCard";

function App() {
  const [customerType, setCustomerType] = useState([]);
  const [accountIndustry, setAccountIndustry] = useState([]);
  const [team, setTeam] = useState([]);
  const [acvRange, setAcvRange] = useState([]);

  useEffect(() => {
    fetchData("customer-type").then(setCustomerType);
    fetchData("account-industry").then(setAccountIndustry);
    fetchData("team").then(setTeam);
    fetchData("acv-range").then(setAcvRange);
  }, []);

  return (
    <div>
      <DataCard title="">
        <CustomerTypeCard customerData={customerType} acvRangeData={acvRange} />
        <TeamCard data={team} />
        <AccountIndustryCard data={accountIndustry} />
      </DataCard>
    </div>
  );
}

export default App;
