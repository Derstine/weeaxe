"use client";

import { useEffect, useRef } from "react";
import { SkinViewer } from "skinview3d";

export default function SkinViewerComponent({ skinURL }: { skinURL: string }) { // chatgpt generated (literally no clue what's happening here)
  const canvasRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<SkinViewer | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // If there's an existing viewer, dispose of it and clear the container
    if (viewerRef.current) {
      viewerRef.current.dispose();
      viewerRef.current = null;
      canvasRef.current.innerHTML = "";
    }

    // Create a new viewer with the updated skin URL
    const viewer = new SkinViewer({
      width: 300,
      height: 400,
      skin: skinURL || "/defaultSkin.png",
      canvas: undefined, // let SkinViewer auto-create its canvas
    //   crossOrigin: "anonymous" // useful for remote images
    });
    viewerRef.current = viewer;
    canvasRef.current.appendChild(viewer.canvas);

    return () => {
      // Cleanup when the component unmounts or before re-running the effect
      if (viewerRef.current) {
        viewerRef.current.dispose();
        viewerRef.current = null;
      }
      if (canvasRef.current) {
        canvasRef.current.innerHTML = "";
      }
    };
  }, [skinURL]);

  return <div ref={canvasRef} />;
}
