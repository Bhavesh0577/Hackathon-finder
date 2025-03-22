"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Globe, Search, Users, Info, ArrowUp } from "lucide-react";
import { FloatingCard } from "@/components/ui/floating-card";
import { motion } from "framer-motion";
import axios from "axios";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const platforms = [
  { name: "devfolio", color: "bg-blue-500" },
  { name: "dora", color: "bg-purple-500" },
];

const Hackathons = () => {
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [filteredHackathons, setFilteredHackathons] = useState<any[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    async function fetchHackathons() {
      try {
        const response = await axios.get("/api/hackathons");
        if (response.status === 200 && response.data.results.hackathons) {
          setHackathons(response.data.results.hackathons);
          setFilteredHackathons(response.data.results.hackathons);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      }
    }

    fetchHackathons();
  }, []);

  const filterHackathons = () => {
    let filtered = hackathons;

    // Filter by platform
    if (selectedPlatform) {
      filtered = filtered.filter((h) => h.platform === selectedPlatform);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (h) =>
          h.hackathon_name.toLowerCase().includes(query) ||
          (h.theme && h.theme.toLowerCase().includes(query))
      );
    }

    setFilteredHackathons(filtered);
  };

  useEffect(() => {
    filterHackathons();
  }, [selectedPlatform, searchQuery, hackathons]);

  // Add scroll to top button effect
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search hackathons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full md:w-auto">
          {platforms.map(({ name, color }) => (
            <Badge
              key={name}
              variant={selectedPlatform === name ? "default" : "outline"}
              className={`cursor-pointer capitalize text-sm px-3 py-1 ${selectedPlatform === name ? color : ""}`}
              onClick={() => setSelectedPlatform(selectedPlatform === name ? null : name)}
            >
              {name}
            </Badge>
          ))}
        </div>
      </div>

      {filteredHackathons.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No hackathons found. Try changing your filters.</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredHackathons.map((hackathon) => (
            <motion.div key={hackathon.id} variants={itemVariants} className="flex">
              <FloatingCard className="h-full flex flex-col w-full">
                <CardHeader className="pb-2">
                  <Badge className={`mb-2 w-fit capitalize ${hackathon.platform === 'devfolio' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                    {hackathon.platform}
                  </Badge>
                  <CardTitle className="text-xl line-clamp-2">
                    <Link href={`/hackathon/${hackathon.id}`} className="hover:text-orange-600 transition-colors">
                      {hackathon.hackathon_name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 py-2 flex-1">
                  {hackathon.theme && (
                    <div className="flex items-start gap-2">
                      <span className="text-sm text-muted-foreground min-w-16">Theme:</span>
                      <span className="text-sm font-medium line-clamp-2">{hackathon.theme}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <span className="text-sm">{hackathon.date}</span>
                  </div>
                  {hackathon.participants && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm">{hackathon.participants} participants</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-2 pt-2 mt-auto">
                  <Button size="sm" className="w-full" asChild>
                    <Link href={`/hackathon/${hackathon.id}`} className="flex items-center justify-center">
                      <Info className="h-4 w-4 mr-2" /> View Details
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={hackathon.hackathon_link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </FloatingCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {showScrollButton && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-orange-600 bg-orange-500 text-white z-50"
          size="icon"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default Hackathons;