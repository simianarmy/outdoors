import React from 'react';

export default function SectionIcon({ url }) {
  return (
    <div className="locationIcon">
      <img className="mr-4 mb-0" src={url} width="32" alt="location" />
    </div>
  );
}
