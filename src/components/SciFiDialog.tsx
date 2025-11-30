import React, { useState } from "react";
import "./sci-fi-dialog.css";
import { SciFiButton } from "./SciFiButton";

export const SciFiDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <button onClick={() => setIsOpen(true)}>Open Dialog</button> */}

      <SciFiButton onClick={() => setIsOpen(true)}>Open Dialog
      </SciFiButton>
      

      {isOpen && (
        <div 
          className="dlg-backdrop"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="dlg-frame"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dlg-content">
              <h2>SCI-FI DIALOG</h2>
              <p>This modal uses custom sci-fi styling.</p>
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
