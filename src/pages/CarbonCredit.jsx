import { Tabs, ConfigProvider } from "antd";
import { useState } from "react";
import Afforestation from "../components/Afforestation";
import CMM from "../components/CMM";

function CarbonCredit() {
  const [afforestationReduction, setAfforestationReduction] = useState(0);
  const [cNNReduction, setCNNReduction] = useState(0);

  const handleAReductionChange = (newReduction) => {
    setAfforestationReduction(newReduction);
  };

  const handleCReductionChange = (newReduction) => {
    setCNNReduction(newReduction);
  };

  const totalReductions = afforestationReduction + cNNReduction;
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
            label: "Afforestation",
            key: 1,
            children: <Afforestation onReductionChange={handleAReductionChange}/>,
          },
          {
            label: "Coal Mine Methane",
            key: 2,
            children: <CMM onReductionChange={handleCReductionChange}/>,
          },
        ]}
      />
      <div className="p-4 absolute -top-2 right-0">
        <h2 className="text-xl ">
          Total CO2 Emissions Reduced: <span className="font-bold">{totalReductions.toFixed(3)} tonnes</span> 
        </h2>
      </div>
    </div>
    </ConfigProvider>
  );
}

export default CarbonCredit;