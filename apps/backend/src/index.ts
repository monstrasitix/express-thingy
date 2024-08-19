import express from "express";
import { config } from "dotenv";
import { setupServer } from "@/server";

config({ path: ".env" });

setupServer(express(), {
  port: process.env.PORT || "3000",
});
