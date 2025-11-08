import React, { useState, useMemo } from "react";
import { ROADMAP_DATA } from "../data";
// Import the props type from types.ts
import type { DatabaseSelectorProps, SkillOption } from "../types";

export const DatabaseSelector: React.FC<DatabaseSelectorProps> = ({ onNext, chosenBackend }) => {
   const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);

   // Get options from the correct path. Note we combine two categories.
   const relationalOptions = ROADMAP_DATA.DATABASES.categories.RELATIONAL.options;
   const noSqlOptions = ROADMAP_DATA.DATABASES.categories.NO_SQL.options;
   const allDatabaseOptions = [...relationalOptions, ...noSqlOptions];

   // Add "suggestion" logic based on the backend choice
   const suggestedOptions = useMemo(() => {
      // Check for backends that strongly prefer a certain DB type
      const isPythonStack = chosenBackend === "django" || chosenBackend === "fastapi";
      const isNodeStack = chosenBackend === "nest" || chosenBackend === "express";

      return allDatabaseOptions.map((option: SkillOption) => {
         let wiseNote = option.wiseNote; // Start with the default note

         // Add special recommendations
         if (isPythonStack && option.id === "postgres") {
            wiseNote = `RECOMMENDED: PostgreSQL is the gold standard for Python frameworks like Django.`;
         }
         if (isNodeStack && option.id === "mongodb") {
            wiseNote = `RECOMMENDED: MongoDB offers great flexibility and speed for Node.js applications.`;
         }
         if (isNodeStack && option.id === "postgres") {
            wiseNote = `RECOMMENDED: PostgreSQL is a powerful and reliable choice for any stack, especially Nest.js with TypeORM.`;
         }

         return {
            ...option,
            wiseNote: wiseNote, // Override the note
         };
      });
   }, [chosenBackend, allDatabaseOptions]); // Re-run if the backend choice changes

   const handleNext = () => {
      if (selectedDatabase) {
         onNext(selectedDatabase);
      }
   };

   return (
      <div className="selector-container">
         <h2>Step 4: Choose Your Database</h2>
         <p>
            Select where your data will be stored. Based on your choice of {chosenBackend || "your backend"}, here are our recommendations:
         </p>

         <div className="options-grid">
            {suggestedOptions.map((option) => (
               <button
                  key={option.id}
                  className={`option-card ${selectedDatabase === option.id ? "selected" : ""}`}
                  onClick={() => setSelectedDatabase(option.id)}>
                  {option.tag && <span className="tag">{option.tag}</span>}
                  <h3>{option.name}</h3>
                  <p>{option.description}</p>
                  <small className="wise-note">💡 {option.wiseNote}</small>
               </button>
            ))}
         </div>

         <button className="next-step" onClick={handleNext} disabled={!selectedDatabase}>
            View Your Roadmap!
         </button>
      </div>
   );
};

export default DatabaseSelector;
