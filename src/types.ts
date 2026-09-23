/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortalProduct {
  id: string;
  name: string;
  emoji: string;
  priceUsd: number;
  description: string;
}

export interface HotStackTemplate {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  examplePrompt: string;
}

export interface VibeAppResult {
  appName: string;
  tagline: string;
  vibeScore: {
    truth: number; // Max 100
    beauty: number;
    curiosity: number;
  };
  atomCompliance: string;
  brandStrategy: string;
  growthPhases: {
    phase: string;
    description: string;
    timeline: string;
  }[];
  generatedCodeSnippet?: string;
  marketFitAnalysis?: string;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  type: "system" | "success" | "warning" | "error" | "user" | "roar";
  message: string;
}

export interface CoreTelemetry {
  trunkVersion: string;
  trunkLocked: boolean;
  nodeCount: number;
  activeLions: number;
  giraffeVisionKm: number;
  pulseIntervalSec: number;
  lastPulseTime: string;
  nextPulseTime: string;
  selectedNest: string;
  activeNests: {
    id: string;
    name: string;
    status: "ACTIVE" | "SYNCHRONIZED" | "PENDING";
    pulseRate: string;
    nodes: number;
  }[];
}
