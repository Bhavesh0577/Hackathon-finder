import * as React from "react";
import { FunctionComponent } from "react";
import plantumlEncoder from "plantuml-encoder";

interface Props {
  src: string; 
  alt?: string; 
  width?: string | number; 
  height?: string | number; 
}

const ReactPlantUML: FunctionComponent<Props> = ({ 
  src, 
  alt = "PlantUML Diagram", 
  width = "100%", 
  height = "50%" 
}) => {
  let encodedUrl = "";

  try {
    const encoded = plantumlEncoder.encode(src);
    encodedUrl = `https://www.plantuml.com/plantuml/svg/${encoded}`;
  } catch (error) {
    console.error("❌ PlantUML Encoding Error:", error);
    return <p>Error: Invalid PlantUML syntax</p>;
  }

  return <img src={encodedUrl} alt={alt} width={width} height={height} />;
};

export default ReactPlantUML;
