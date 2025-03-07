// TypeScript enhancements
import "reflect-metadata";
import "@total-typescript/ts-reset";

// Dependencies
import express from "express";
import { config } from "dotenv";

// Setup
import { setupServer } from "@/server";

// Controllers
import "@/api/v1/controllers/product.controller";

config({ path: ".env" });

setupServer(express(), {
  port: process.env.PORT,
});
