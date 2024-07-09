import React from "react";
import { defaults } from "jest-config";

export default {
  clearMocks: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
