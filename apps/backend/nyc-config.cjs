"use strict";

const { parserPlugins, cache } = require("@istanbuljs/nyc-config-typescript");

module.exports = {
  cache,
  extends: "nyc-config-tsx",
  extension: [".ts"],
  parserPlugins: parserPlugins.concat("decorators-legacy"),
  include: ["src/**/*.ts"],
  reporter: ["html", "lcov", "text"],
  checkCoverage: true,
  lines: 0,
  all: true,
};
