"use client";

import { extractPlantUMLDiagram } from "@/lib/extract";
import axios from "axios";
import { useEffect, useState, use } from "react";
import ReactPlantUML from "@/components/flowchartComponents/plantuml";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import plantumlEncoder from "plantuml-encoder";

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

  const handleDownload = () => {
    if (chartData && !chartData.startsWith("Error")) {
      try {
        const encoded = plantumlEncoder.encode(chartData);
        const imageUrl = `https://www.plantuml.com/plantuml/png/${encoded}`;
        
        // Fetch the image as a blob
        fetch(imageUrl)
          .then(response => response.blob())
          .then(blob => {
            // Create a blob URL
            const blobUrl = URL.createObjectURL(blob);
            
            // Create a temporary anchor element
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `flowchart-${id}.png`;
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
          })
          .catch(error => {
            console.error("Download failed:", error);
          });
      } catch (error) {
        console.error("Download failed:", error);
      }
    }
  };

  return (
    <div>
      <Card className="flex flex-col items-center justify-center mx-auto max-w-5xl p-4">
        {chartData.startsWith("Error") ? (
          <p className="text-red-500">{chartData}</p>
        ) : (
          <>
            <ReactPlantUML src={chartData} alt="Generated Flowchart" />
            <Button 
              onClick={handleDownload} 
              className="mt-4 flex items-center gap-2"
              disabled={!chartData || chartData.startsWith("Error")}
            >
              <Download size={16} />
              Download Flowchart
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
