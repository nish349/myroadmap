// src/components/LevelSelector.tsx
import React, { useState } from "react";
// Import our shared types
import type { LevelSelectorProps, ExpertiseLevel } from "../types";

// These are the labels you wanted
const levelOptions = [
   {
      id: "beginner" as ExpertiseLevel,
      title: "Novice",
      description: "Starting from scratch, needs structure.",
   },
   {
      id: "intermediate" as ExpertiseLevel,
      title: "Competent",
      description: "Knows basics, ready for frameworks.",
   },
   {
      id: "professional" as ExpertiseLevel,
      title: "Polishing Up",
      description: "Experienced, targeting specific gaps.",
   },
];

export const LevelSelector: React.FC<LevelSelectorProps> = ({ onNext }) => {
   const [selectedLevel, setSelectedLevel] = useState<ExpertiseLevel | null>(null);
   // We'll add custom hours logic later if needed
   // const [customHours, setCustomHours] = useState<number | undefined>();

   const handleNext = () => {
      if (selectedLevel) {
         // For now, we'll pass 'custom' if professional is chosen,
         // to match the original App.tsx logic.
         // Or we can simplify this. Let's stick to the main levels.
         onNext(selectedLevel);
      }
   };

   return (
      <div className="selector-container">
         {/* This matches the title from your screenshot */}
         <h2>1. Gauged Your Current Skill Level</h2>
         <p>
            Select the option that best reflects your current proficiency. This will determine the estimated time commitment for each skill.
         </p>

         {/* We use the same class names as our other selectors */}
         <div className="options-grid">
            {levelOptions.map((option) => (
               <button
                  key={option.id}
                  // This is the key: use the same class names
                  className={`option-card ${selectedLevel === option.id ? "selected" : ""}`}
                  onClick={() => setSelectedLevel(option.id)}>
                  {/* We don't need a tag here, just title and description */}
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
               </button>
            ))}
         </div>

         <button className="next-step" onClick={handleNext} disabled={!selectedLevel}>
            Continue to Framework Selection
         </button>
      </div>
   );
};

export default LevelSelector;
