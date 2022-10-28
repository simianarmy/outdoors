import React from "react";

export default function RouteMap({embedUrl}) {
  return (
    <iframe title="route map" src={embedUrl} width="100%" height="420" scrolling="no" seamless></iframe>
  );
}
