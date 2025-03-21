"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from '@/components/ui/sparkles';
import { GlowingCard } from '@/components/ui/glowing-card';
import { WavyBackground } from '@/components/ui/wavy-background';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Award, Calendar, Users } from 'lucide-react';
import Link from 'next/link';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-20">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container px-4 md:px-6"
        >
          <Sparkles className="inline-block">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-orange-600 font-orbitron mb-4">
              HackScraper
            </h1>
          </Sparkles>
          <p className="mx-auto max-w-[700px] text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            The Ultimate Hackathon Radar. Find, track, and join the best hackathons worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full" asChild>
              <Link href="/hackathons">
                Explore Hackathons <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <Link href="/idea">
                Generate Ideas <Compass className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24">
        <WavyBackground className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Why Choose HackScraper?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to find and succeed at your next hackathon
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <GlowingCard className="flex flex-col items-center space-y-2 p-6 text-center">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                  <Compass className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold">Discover</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Find hackathons around the world that match your skills and interests
                </p>
              </GlowingCard>
              <GlowingCard className="flex flex-col items-center space-y-2 p-6 text-center">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold">Compete</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Join top hackathons with great prizes and networking opportunities
                </p>
              </GlowingCard>
              <GlowingCard className="flex flex-col items-center space-y-2 p-6 text-center">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold">Track</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Save and track upcoming hackathons with our personalized dashboard
                </p>
              </GlowingCard>
              <GlowingCard className="flex flex-col items-center space-y-2 p-6 text-center">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold">Connect</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Find teammates and build your network in the hackathon community
                </p>
              </GlowingCard>
            </div>
          </div>
        </WavyBackground>
      </section>
    </div>
  );
};

export default Landing;
