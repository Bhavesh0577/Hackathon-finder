"use client";

import { extractPlantUMLDiagram } from "@/lib/extract";
import axios from "axios";
import { useEffect, useState, use } from "react";
import ReactPlantUML from "@/components/flowchartComponents/plantuml";
import { Card } from "@/components/ui/card";

interface FlowChartProps {
  params: Promise<{ id: string }>;
}

export default function FlowChart({ params }: FlowChartProps) {
  const paramsData = use(params);
  const { id } = paramsData;
  const [chartData, setChartData] = useState<string>("");

  async function getChartInfo() {
    try {
      const response = await axios.post("/api/chart", { id });
      console.log(response.data.result)
      const formattedChart = extractPlantUMLDiagram(response.data.result);
      console.log(formattedChart)
      setChartData(formattedChart);
    } catch (error) {
      setChartData("Error: Unable to generate chart.");
    }
  }

  useEffect(() => {
    if (id) {
      getChartInfo();
    }
  }, [id]);

  return (
    <div>
      <Card className="flex items-center justify-center mx-auto max-w-5xl">
        {chartData.startsWith("Error") ? (
          <p className="text-red-500">{chartData}</p>
        ) : (
          <ReactPlantUML src={chartData} alt="Generated Flowchart" />
        )}
      </Card>
    </div>
  );
}
