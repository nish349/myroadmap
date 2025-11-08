// src/types.ts

import { LEVEL_MULTIPLIERS } from "./data";
import type { SkillOption, SkillCategory, TopLevelDomain } from "./data";

export type { SkillOption, SkillCategory, TopLevelDomain };

export type ExpertiseLevel = keyof typeof LEVEL_MULTIPLIERS;

export interface RoadmapState {
   level: ExpertiseLevel | null;
   customHours: number | undefined;
   frontendFramework: string | null;
   backendPrimary: string | null;
   database: string | null;
}

export interface LevelSelectorProps {
   onNext: (level: ExpertiseLevel, customHours?: number) => void;
}

export interface FrameworkSelectorProps {
   onNext: (frameworkId: string) => void;
   currentLevel: ExpertiseLevel;
}

export interface BackendSelectorProps {
   onNext: (backendId: string) => void;
   chosenFrontend: RoadmapState["frontendFramework"];
}

export interface DatabaseSelectorProps {
   onNext: (databaseId: string) => void;
   chosenBackend: RoadmapState["backendPrimary"];
}

export interface RoadmapResultsProps {
   roadmapState: RoadmapState;
}
