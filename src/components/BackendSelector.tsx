import React, { useState, useMemo } from "react";
import { ROADMAP_DATA } from "../data";
// 1. Import the props type from types.ts, not define it here
import type { BackendSelectorProps, SkillOption } from "../types";

export const BackendSelector: React.FC<BackendSelectorProps> = ({ onNext, chosenFrontend }) => {
   const [selectedBackend, setSelectedBackend] = useState<string | null>(null);

   // 2. Get options from the correct path in data.ts
   const backendOptions = ROADMAP_DATA.BACKEND.categories.FRAMEWORKS.options;

   // 3. Add "suggestion" logic based on the frontend choice
   const suggestedOptions = useMemo(() => {
      const isReactStack = chosenFrontend === "react" || chosenFrontend === "nextjs";

      return backendOptions.map((option: SkillOption) => {
         let wiseNote = option.wiseNote; // Start with the default note

         // Add special recommendations
         if (isReactStack && option.id === "nest") {
            wiseNote = `RECOMMENDED: Nest.js is excellent with React/Next.js for a full-stack TypeScript experience.`;
         }
         if (isReactStack && option.id === "express") {
            wiseNote = `RECOMMENDED: Express.js is a lightweight and classic choice for any JavaScript frontend.`;
         }

         return {
            ...option,
            wiseNote: wiseNote, // Override the note if a suggestion matches
         };
      });
   }, [chosenFrontend, backendOptions]); // Re-run if the frontend choice changes

   const handleNext = () => {
      if (selectedBackend) {
         onNext(selectedBackend);
      }
   };

   return (
      <div className="selector-container">
         <h2>Step 3: Choose Your Primary Backend Framework</h2>
         <p>
            Select the engine for your application's logic. Based on your choice of {chosenFrontend || "your frontend"}, here are our
            recommendations:
         </p>

         <div className="options-grid">
            {suggestedOptions.map((option) => (
               <button
                  key={option.id}
                  className={`option-card ${selectedBackend === option.id ? "selected" : ""}`}
                  onClick={() => setSelectedBackend(option.id)}>
                  {option.tag && <span className="tag">{option.tag}</span>}
                  <h3>{option.name}</h3>
                  <p>{option.description}</p>
                  <small className="wise-note">💡 {option.wiseNote}</small>
               </button>
            ))}
         </div>

         <button className="next-step" onClick={handleNext} disabled={!selectedBackend}>
            Continue to Database Selection
         </button>
      </div>
   );
};

export default BackendSelector;
