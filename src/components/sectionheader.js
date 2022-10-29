import React from "react";

import SectionIcon from "../components/sectionicon";

//import "./sectionheader.scss";

export default function SectionHeader({section, startDate, endDate}) {
  return (
    <>
      <div className="flex mt-8 h-8">
        {section.location_icon?.url ? <SectionIcon url={section.location_icon.url} /> : null}
        <span className="locations">
          {section.starting_location} - {section.ending_location}
        </span>
      </div>
      <div className="mt-0 text-gray-400">
        <span>
          {startDate} - {endDate}
        </span>
      </div>
    </>
  );
}
