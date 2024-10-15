// TypeScript enhcancements
import "reflect-metadata";
import "@total-typescript/ts-reset";

// Controllers
import "@/api/v1/controllers/user.controller";
import "@/api/v1/controllers/animal.controller";

// Dependencies
import express from "express";
import { config } from "dotenv";

// Setup
import { setupServer } from "@/server";

config({ path: ".env" });

setupServer(express(), {
  port: process.env.PORT,
});
