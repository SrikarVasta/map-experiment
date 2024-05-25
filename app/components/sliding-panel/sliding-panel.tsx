"use client";

import React from "react";
import useMapStore from "../store";
import styles from "./sliding-panel.module.css";

const SlidingPanel = () => {
  const { isPanelOpen, togglePanel, setDrawType, drawType } = useMapStore();

  const handleChange = (event) => {
    setDrawType(event.target.value);
  };

  return (
    <div className={`${styles.panel} ${isPanelOpen ? styles.open : ""}`}>
      <button className={styles.panelButton} onClick={togglePanel}>
        {isPanelOpen ? "Close Panel" : "Open Panel"}
      </button>
      {isPanelOpen && (
        <div className={styles.content}>
          <h2>Select Shape</h2>
          <form>
            <div>
              <input
                type="radio"
                value="None"
                checked={drawType === "None"}
                onChange={handleChange}
              />
              <label className="text-black">None</label>
            </div>
            <div>
              <input
                type="radio"
                value="Square"
                checked={drawType === "Square"}
                onChange={handleChange}
              />
              <label className="text-black">Square</label>
            </div>
            <div>
              <input
                type="radio"
                value="Box"
                checked={drawType === "Box"}
                onChange={handleChange}
              />
              <label className="text-black">Box</label>
            </div>
            <div>
              <input
                type="radio"
                value="Star"
                checked={drawType === "Star"}
                onChange={handleChange}
              />
              <label className="text-black">Star</label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SlidingPanel;
