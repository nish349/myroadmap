// ============IMPORTS=================
import React, { useState, useEffect } from "react"; // <-- 1. Import useEffect

import LevelSelector from "./components/LevelSelector";
import FrameworkSelector from "./components/FrameworkSelector";
import BackendSelector from "./components/BackendSelector";
import DatabaseSelector from "./components/DatabaseSelector";
import RoadmapResults from "./components/RoadmapResults";
import RoadmapModal from "./components/RoadmapModal";
import Footer from "./components/Footer";

// ============IMPORTS TYPE=================
import type { LevelSelectorProps, FrameworkSelectorProps, BackendSelectorProps, DatabaseSelectorProps, RoadmapState } from "./types";

// --- 2. Define the key and initial state ---
const STORAGE_KEY = "roadmapUserState";

const initialState: RoadmapState = {
   level: null,
   customHours: undefined,
   frontendFramework: null,
   backendPrimary: null,
   database: null,
};

// --- 3. Helper function to find the current step from saved state ---
const getStepFromState = (state: RoadmapState): number => {
   if (state.level === null) return 1;
   if (state.frontendFramework === null) return 2;
   if (state.backendPrimary === null) return 3;
   if (state.database === null) return 4;
   return 5; // If nothing is null, show results
};

const App: React.FC = () => {
   // --- 4. Load state from localStorage on initial render ---
   const [roadmapState, setRoadmapState] = useState<RoadmapState>(() => {
      try {
         const savedState = localStorage.getItem(STORAGE_KEY);
         if (savedState) {
            return JSON.parse(savedState) as RoadmapState;
         }
      } catch (error) {
         console.error("Error loading state from localStorage", error);
      }
      return initialState; // Return empty state if nothing is saved
   });

   // --- 5. Set the step based on the loaded state ---
   const [step, setStep] = useState(() => getStepFromState(roadmapState));

   // --- THIS IS THE MISSING LINE ---
   const [isModalOpen, setIsModalOpen] = useState(false);

   // --- 6. Save state to localStorage whenever it changes ---
   useEffect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(roadmapState));
   }, [roadmapState]); // This hook runs every time roadmapState is updated

   // --- 7. Add a reset handler ---
   const handleReset = () => {
      localStorage.removeItem(STORAGE_KEY); // Clear saved data
      setRoadmapState(initialState); // Reset React state
      setStep(1); // Go back to step 1
   };

   // Handler for Level Selection
   const handleLevelSelection: LevelSelectorProps["onNext"] = (level, customHours) => {
      setRoadmapState((prev) => ({
         ...prev,
         level,
         customHours: customHours,
      }));
      setStep(2);
      console.log(`Level set to: ${level}, Custom Hours: ${customHours}`);
   };

   // Handler for Framework Selection
   const handleFrameworkSelection: FrameworkSelectorProps["onNext"] = (frameworkId) => {
      setRoadmapState((prev) => ({
         ...prev,
         frontendFramework: frameworkId,
      }));
      setStep(3); // Go to Backend Selection
      console.log(`Frontend Framework set to: ${frameworkId}`);
   };

   // Handler for Backend Selection
   const handleBackendSelection: BackendSelectorProps["onNext"] = (backendId) => {
      setRoadmapState((prev) => ({
         ...prev,
         backendPrimary: backendId,
      }));
      setStep(4); // Go to Database Selection
      console.log(`Backend Stack set to: ${backendId}`);
   };

   // Handler for Database Selection
   const handleDatabaseSelection: DatabaseSelectorProps["onNext"] = (databaseId) => {
      setRoadmapState((prev) => ({
         ...prev,
         database: databaseId,
      }));
      setStep(5); // Go to the Results Screen!
      console.log(`Database selected: ${databaseId}`);
   };

   // The renderContent function is perfect as-is
   const renderContent = () => {
      switch (step) {
         case 1:
            return <LevelSelector onNext={handleLevelSelection} />;
         case 2:
            return <FrameworkSelector onNext={handleFrameworkSelection} currentLevel={roadmapState.level || "intermediate"} />;
         case 3:
            return <BackendSelector onNext={handleBackendSelection} chosenFrontend={roadmapState.frontendFramework} />;
         case 4:
            return <DatabaseSelector onNext={handleDatabaseSelection} chosenBackend={roadmapState.backendPrimary} />;
         case 5:
            // Pass the entire state object to the results component
            return <RoadmapResults roadmapState={roadmapState} />;
         default:
            return <div>Something went wrong.</div>;
      }
   };

   return (
      <div className="App">
         <h1>Build Your Roadmap</h1>
         <p>Customize your learning path and set a custom time duration to review your progress.</p>

         {/* --- 8. Add the "Start Over" button --- */}
         <button onClick={handleReset} className="reset-button">
            Start Over
         </button>

         {renderContent()}

         {/* These lines will now work correctly */}
         <Footer onOpenModal={() => setIsModalOpen(true)} />
         <RoadmapModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
   );
};

export default App;
