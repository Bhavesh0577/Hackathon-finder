"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { chatSchema } from "@/schemas/chatSchema";
import { Textarea } from "../ui/textarea";
import { Loader, Sparkle, Lightbulb, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ViewIdeaComponent from "./viewIdeaComponent";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlowingCard } from "../ui/glowing-card";
import { Sparkles } from "../ui/sparkles";

const IdeaGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState();

  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      theme: "",
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof chatSchema>) {
    console.log("Form values:", values);
    if (!values.title || !values.theme) {
      console.error("Invalid payload:", values);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/ideas", values);
      console.log("API Response:", response);

      if (response.status === 200 && response.data) {
        setResponse(response.data.result);
        setSuccess(true);
        console.log("Processed Response:", response.data);
      } else {
        console.error("Invalid API response format:", response);
      }
    } catch (error) {
      console.error("Error while generating idea:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl"
      >
        <GlowingCard className="w-full shadow-xl">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-3">
                <Lightbulb className="h-8 w-8 text-orange-500" />
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">Project Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your project title"
                          {...field}
                          className="rounded-lg py-3"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-muted-foreground">
                        A catchy name for your hackathon project
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">Hackathon Theme</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the hackathon theme or challenge"
                          {...field}
                          className="rounded-lg min-h-[120px] resize-none"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-muted-foreground">
                        Detailed description of the hackathon theme or problem statement
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 rounded-lg text-lg relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <>
                        <Loader className="mr-2 h-5 w-5 animate-spin" />
                        Generating ideas...
                      </>
                    ) : (
                      <>
                        Generate Brilliant Ideas
                        <Sparkle className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                      </>
                    )}
                  </span>
                </Button>

                {success && response && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={`/sample/${encodeURIComponent(response)}`}
                      className="flex items-center justify-center w-full p-4 mt-4 text-orange-600 font-medium rounded-lg bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                    >
                      <Sparkles>5 Ideas Generated</Sparkles>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </motion.div>
                )}
              </form>
            </Form>
          </CardContent>
        </GlowingCard>
      </motion.div>
    </div>
  );
};

export default IdeaGenerator;
