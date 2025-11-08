import React, { useMemo } from "react";
import { ROADMAP_DATA } from "../data";
import type { FrameworkSelectorProps, ExpertiseLevel, SkillOption } from "../types";

// This helper map converts the 'level' string from data.ts into a number
// so we can easily compare them (e.g., beginner (1) <= intermediate (2))
const levelMap: Record<string, number> = {
   "Must Have": 1,
   Intermediate: 2,
   Professional: 3,
};

// Helper function to get the user's level as a number
const getUserLevelNumber = (level: ExpertiseLevel): number => {
   switch (level) {
      case "beginner":
         return 1;
      case "intermediate":
         return 2;
      case "professional":
      case "custom": // Professionals see all options
         return 3;
      default:
         return 2; // Default to intermediate
   }
};

// Helper to map tags to CSS classes
const tagClassMap: Record<string, string> = {
   "Industry Standard": "tag-standard",
   "Enterprise Grade": "tag-enterprise",
   "Best for Versatility": "tag-versatile",
   "Great for Individuals": "tag-individual",
};

export const FrameworkSelector: React.FC<FrameworkSelectorProps> = ({ currentLevel, onNext }) => {
   // 1. Get the user's level as a number (1, 2, or 3)
   const userLevelNumber = getUserLevelNumber(currentLevel);

   // 2. Filter the framework options based on the user's level
   // We use useMemo to avoid re-filtering on every render
   const filteredOptions = useMemo(() => {
      const allFrameworks = ROADMAP_DATA.FRONTEND.categories.FRAMEWORKS.options;

      // Only show frameworks that are at or below the user's level
      return allFrameworks.filter((option: SkillOption) => {
         const optionLevelNumber = levelMap[option.level];
         // If a skill doesn't have a level in the map, default to showing it
         if (!optionLevelNumber) return true;

         return optionLevelNumber <= userLevelNumber;
      });
   }, [userLevelNumber]); // Re-run this logic only when userLevelNumber changes

   // 3. Render the component
   return (
      <div className="selector-container">
         <h2>Step 2: Choose Your Frontend Framework</h2>
         <p>Your choice will help tailor the rest of the roadmap.</p>

         <div className="options-grid">
            {filteredOptions.map((option) => (
               <button key={option.id} className="option-card" onClick={() => onNext(option.id)}>
                  {/* The "Industry Level" tag - NOW WITH NEW CLASSES */}
                  {option.tag && <span className={`tag ${tagClassMap[option.tag] || "tag-standard"}`}>{option.tag}</span>}

                  <h3>{option.name}</h3>
                  <p>{option.description}</p>

                  <small className="wise-note">💡 {option.wiseNote}</small>
               </button>
            ))}
         </div>
      </div>
   );
};

export default FrameworkSelector;
