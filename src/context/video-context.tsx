"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VideoContextType {
  videoFile: File | null;
  setVideoFile: (file: File | null) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  return (
    <VideoContext.Provider value={{ videoFile, setVideoFile }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}
