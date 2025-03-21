export function extractPlantUMLDiagram(rawText: string): string {
    const plantUMLMatch = rawText.match(/```plantuml\s*([\s\S]*?)\s*```/);

    if (!plantUMLMatch) {
        console.error("❌ PlantUML syntax not found in response.");
        return "Error: Invalid PlantUML syntax detected.";
    }

    let cleanedPlantUML = plantUMLMatch[1].trim();

    // Remove non-ASCII characters (to avoid encoding issues)
    cleanedPlantUML = cleanedPlantUML.replace(/[^\x00-\x7F]+/g, "");

    // Validate structure (must start with @startuml and end with @enduml)
    if (!/^@startuml/.test(cleanedPlantUML) || !/@enduml$/.test(cleanedPlantUML)) {
        console.error("❌ Invalid PlantUML structure detected.");
        return "Error: PlantUML structure is incorrect. Expected '@startuml' and '@enduml'.";
    }

    // Ensure diagram has at least 3 connections/arrows (basic validation)
    // const connectionCount = (cleanedPlantUML.match(/->/g) || []).length;
    // if (connectionCount < 3) {
    //     console.error("❌ Incomplete diagram detected.");
    //     return "Error: Diagram is incomplete. Please regenerate.";
    // }

    console.log("✅ PlantUML diagram extracted successfully.");
    return cleanedPlantUML;
}
