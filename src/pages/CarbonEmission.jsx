import { Tabs, ConfigProvider } from "antd";
import CoalType from "../components/CoalType";
import TransportType from "../components/TransportType";
import { useState } from "react";

function CarbonEmission() {
  const [coalTotalEmission, setCoalTotalEmission] = useState(0);
  const [transportTotalEmission, setTransportTotalEmission] = useState(0);

  const handleCoalEmissionChange = (newEmission) => {
    setCoalTotalEmission(newEmission);
  };

  const handleTransportEmissionChange = (newEmission) => {
    setTransportTotalEmission(newEmission);
  };

  const totalEmission = coalTotalEmission + transportTotalEmission;
  return (
    <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimary: "rgb(54 79 107 / 0.85)",
          colorPrimaryHover : "#364F6B"
        },
        Tabs: {
          itemActiveColor: "#3FC1C9",
          itemHoverColor: "#FC5185",
          itemSelectedColor:"#3FC1C9"
        },
      },
    }} 
     >
    <div className="flex flex-col relative">
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"large"}
        animated={true}
        items={[
          {
            label: "Coal Type",
            key: 1,
            children: <CoalType onEmissionChange={handleCoalEmissionChange}/>,
          },
          {
            label: "Transportation Type",
            key: 2,
            children: <TransportType onEmissionChange={handleTransportEmissionChange}/>,
          },
        ]}
      />
      <div className="p-4 absolute -top-2 right-0">
        <h2 className="text-xl">
          Total CO2 Emission: <span className="font-bold">{totalEmission.toFixed(3)} tonnes</span> 
        </h2>
      </div>
    </div>
    </ConfigProvider>
  );
}

export default CarbonEmission;