// src/components/Footer.tsx
import React from "react";

// 1. Define the props
interface FooterProps {
   onOpenModal: () => void;
}

const year = new Date().getFullYear();

// 2. Accept the 'onOpenModal' prop
export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
   return (
      <footer className="footer-container">
         <p>Built by Nish S. &copy; {year}</p>

         {/* 3. Add the new link/button */}
         <p>
            <button className="footer-link" onClick={onOpenModal}>
               View My Tech Philosophy
            </button>
         </p>

         <p>This roadmap is a guide, not a rule. Enjoy the journey!</p>
      </footer>
   );
};

export default Footer;
