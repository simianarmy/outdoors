import React from "react";

export default function RouteMap({embedUrl}) {
  return (
    <iframe className="border-none overflow-y-hidden bg-white" title="route map" src={embedUrl} min-width="320" width="100%" height="420" scrolling="no" seamless></iframe>
  );
}
