"use client";

import React, { useState, useEffect } from 'react';

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${loading ? '' : 'hidden'}`}>
      <div className="preloader-content">
        <div className="preloader-logo">EA_DEV</div>
        <p className="preloader-text">Inicializando Sistemas...</p>
      </div>
    </div>
  );
}
