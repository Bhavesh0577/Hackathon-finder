"use client"
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WavyBackground } from "@/components/ui/wavy-background";

const MapComponent = dynamic(() => import("@/components/hackathonComponents/map"), { ssr: false });
const Hackathons = dynamic(() => import("@/components/hackathonComponents/hackathons"), { ssr: false });

export default function Page() {
  return (
    <div className="space-y-8 py-8">
      <WavyBackground className="h-32">
        <h1 className="text-3xl md:text-5xl font-bold text-center font-orbitron text-orange-600">
          Discover Hackathons
        </h1>
        <p className="text-center mt-2 text-gray-600 dark:text-gray-300">
          Find the perfect hackathon for your next project
        </p>
      </WavyBackground>

      <Tabs defaultValue="list" className="max-w-6xl mx-auto px-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-6">
          <Hackathons />
        </TabsContent>
        <TabsContent value="map" className="mt-6">
          <MapComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
