import React from "react";

import SectionIcon from "../components/sectionicon";

//import "./sectionheader.scss";

/**
 * TODO: Title style depends on calling page
 */
export default function SectionHeader({section, startDate, endDate}) {
  return (
    <>
      <div className="flex mt-4 h-6">
        {section.location_icon?.url ? <SectionIcon url={section.location_icon.url} /> : null}
        <span className="text-base">
          {section.starting_location} - {section.ending_location}
        </span>
      </div>
      <div className="mt-0 text">
        <span className="text-gray-400 text-sm">
          {startDate} - {endDate}
        </span>
      </div>
    </>
  );
}
