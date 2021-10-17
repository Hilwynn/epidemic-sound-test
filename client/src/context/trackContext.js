import React, { createContext, useContext, useEffect, useState } from "react";

const TrackContext = createContext();

function TrackContextProvider({ children }) {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();

  useEffect(() => {
    fetch("http://localhost:8000/tracks")
      .then(res => res.json())
      .then(data => setTracks(data));
  }, []);

  const value = { tracks, currentTrack, setCurrentTrack };

  return (
    <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
  );
}

export default TrackContextProvider;

export function useTracks() {
  const context = useContext(TrackContext);
  if (context === undefined) {
    throw new Error("useTracks must be used within a Provider");
  }
  return context;
}
