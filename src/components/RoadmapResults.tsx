import React, { useMemo } from "react";
import {
   ROADMAP_DATA,
   LEVEL_MULTIPLIERS,
   // We need to import the type interfaces
   type SkillOption,
   type TopLevelDomain,
} from "../data";
import type { RoadmapResultsProps, ExpertiseLevel } from "../types";

// ===================================================================
// 1. MISSING HELPER FUNCTIONS (Here are the fixes)
// ===================================================================

// Helper map to convert skill levels to numbers for filtering
const levelMap: Record<string, number> = {
   "Must Have": 1,
   Intermediate: 2,
   Professional: 3,
};

// Helper function to get the user's level as a number
const getUserLevelNumber = (level: ExpertiseLevel | null): number => {
   if (!level) return 2; // Default to intermediate
   switch (level) {
      case "beginner":
         return 1;
      case "intermediate":
         return 2;
      case "professional":
      case "custom":
         return 3;
   }
};

// Helper map for tag classes
const tagClassMap: Record<string, string> = {
   "Industry Standard": "tag-standard",
   "Enterprise Grade": "tag-enterprise",
   "Best for Versatility": "tag-versatile",
   "Great for Individuals": "tag-individual",
};

// ===================================================================
// 2. THE COMPONENT (No changes needed here)
// ===================================================================

export const RoadmapResults: React.FC<RoadmapResultsProps> = ({ roadmapState }) => {
   const { level, customHours } = roadmapState;

   // 1. Calculate the total time
   const { totalTime, totalCCH } = useMemo(() => {
      let calculatedCCH = 0;
      const userLevelNum = getUserLevelNumber(level); // This will work now
      const userChoices = Object.values(roadmapState); // All chosen IDs

      // Iterate over all skills
      Object.values(ROADMAP_DATA as { [key: string]: TopLevelDomain }).forEach((domain) => {
         Object.values(domain.categories).forEach((category) => {
            category.options.forEach((option: SkillOption) => {
               // Check if skill is at or below user's level
               const optionLevelNum = levelMap[option.level]; // This will work now
               if (optionLevelNum <= userLevelNum) {
                  // Add to CCH if it's mandatory OR if the user chose it
                  if (category.selectionType === "mandatory" || userChoices.includes(option.id)) {
                     calculatedCCH += option.cch;
                  }
               }
            });
         });
      });

      if (level === "custom" && customHours) {
         return { totalTime: customHours, totalCCH: calculatedCCH };
      }
      if (!level) return { totalTime: 0, totalCCH: 0 };

      return {
         totalTime: Math.round(calculatedCCH * LEVEL_MULTIPLIERS[level]),
         totalCCH: calculatedCCH,
      };
   }, [roadmapState, level, customHours]);

   return (
      <div className="results-container">
         <h2>Your Personalized Full Stack Roadmap</h2>

         <div className="results-summary">
            <h3>Total Estimated Time</h3>
            <div className="time-display">{totalTime} Hours</div>
            <small>(Based on {totalCCH} Core Hours for your chosen path)</small>
         </div>

         <hr />

         {/* 2. Render the structured results */}
         {Object.values(ROADMAP_DATA as { [key: string]: TopLevelDomain }).map((domain) => {
            // Check if any category in this domain is visible for the user's level
            const userLevelNum = getUserLevelNumber(level); // This will work now
            const isDomainVisible = Object.values(domain.categories).some((cat) =>
               cat.options.some(
                  (opt) => levelMap[opt.level] <= userLevelNum // This will work now
               )
            );

            if (!isDomainVisible) return null; // Skip entire domain if not relevant

            return (
               <div key={domain.title} className="results-domain">
                  <h2>{domain.title}</h2>
                  <p className="domain-focus">{domain.focus}</p>

                  {Object.values(domain.categories).map((category) => {
                     // Get all options for this category that match user's level
                     const visibleOptions = category.options.filter(
                        (opt) => levelMap[opt.level] <= userLevelNum // This will work now
                     );

                     if (visibleOptions.length === 0) return null; // Skip category

                     return (
                        <div key={category.title} className="results-category">
                           <h3>{category.title}</h3>

                           <div className="skills-grid-structured">
                              {visibleOptions.map((option) => {
                                 // Check if this option was chosen
                                 const isChosen = Object.values(roadmapState).includes(option.id);
                                 // Check if it's from a mandatory category
                                 const isMandatory = category.selectionType === "mandatory";

                                 // Determine class
                                 let cardClass = "skill-card-result";
                                 if (isChosen || isMandatory) {
                                    cardClass += " chosen";
                                 } else {
                                    cardClass += " alternative";
                                 }

                                 return (
                                    <div key={option.id} className={cardClass}>
                                       {option.tag && (
                                          <span
                                             className={`tag ${
                                                tagClassMap[option.tag] || "tag-standard" // This will work now
                                             }`}>
                                             {option.tag}
                                          </span>
                                       )}
                                       <strong>{option.name}</strong>
                                       <p>{option.description}</p>
                                       <small className="wise-note">💡 {option.wiseNote}</small>
                                    </div>
                                 );
                              })}
                           </div>
                        </div>
                     );
                  })}
               </div>
            );
         })}
      </div>
   );
};

export default RoadmapResults;
