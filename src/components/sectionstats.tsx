import React from "react";

import { calculateNights } from '../utils/dates';

export default function SectionStats({ section }) {
    const totalNights = calculateNights(section.start_time, section.end_time);

    return (
        <table className="mx-auto max-w-[420px] table-auto">
            <tbody>
                <tr>
                    <td>Distance</td>
                    <td>{section.total_miles} mi</td>
                </tr>
                <tr>
                    <td>Nights</td>
                    <td>{totalNights}</td>
                </tr>
                <tr>
                    <td>Max Elevation</td>
                    <td>{section.max_elevation} ft</td>
                </tr>
                <tr>
                    <td>Difficulty</td>
                    <td>{section.difficulty}</td>
                </tr>
                <tr>
                    <td>Resupply</td>
                    <td>{section.resupply ? 'Yes' : 'No'}</td>
                </tr>
                {!section.on_trail && section.way_to_town ? (
                    <tr>
                        <td>Transportation</td>
                        <td>{section.way_to_town}</td>
                    </tr>
                ) : null}
                {section.slackpack && (
                    <tr>
                        <td>Slackpack</td>
                        <td>Yes</td>
                    </tr>
                )}
                {section.hike_partners && (
                    <tr>
                        <td>Hiked with</td>
                        <td>{section.hike_partners}</td>
                    </tr>
                )}
                {section.hikers_met && (
                    <tr>
                        <td>Hikers  met</td>
                        <td>{section.hikers_met}</td>
                    </tr>
                )}
                {section.animals && (
                    <tr>
                        <td>Animals Encountered</td>
                        <td>{section.animals}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

