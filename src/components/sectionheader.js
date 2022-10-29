import React from "react";

import SectionIcon from "../components/sectionicon";

function HeaderDates({startDate, endDate}) {
  return (
    <div className="mt-0 text">
      <span className="text-gray-400 text-sm">
        {startDate} - {endDate}
      </span>
    </div>
  );
};


/**
 * TODO: Title style depends on calling page
 */
export default function SectionHeader({section, startDate, endDate}) {
  return (
    <>
      <div className="flex mt-4 min-h-max">
        {section.location_icon?.url ? <SectionIcon url={section.location_icon.url} /> : null}
        <span className="text-base">
          {section.starting_location} - {section.ending_location}
        </span>
      </div>
      <HeaderDates startDate={startDate} endDate={endDate} />
    </>
  );
}

export function SectionHeaderBold({section, startDate, endDate}) {
  return (
    <>
      <div className="flex mt-4 min-h-max">
        {section.location_icon?.url ? <SectionIcon url={section.location_icon.url} /> : null}
        <div className="text-lg font-bold">
          {section.starting_location} - {section.ending_location}
        </div>
      </div>
      <HeaderDates startDate={startDate} endDate={endDate} />
    </>
  );
}

