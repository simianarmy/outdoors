import React from "react";

import { calculateNights } from "./dates";

export function ThruStats({data, zeroDays, neroDays, numShoes}) {
  const totalMiles = data.reduce((prev, curr) => (prev + curr.total_miles), 0);
  const totalDays = calculateNights(data[0].start_time, data[data.length-1].end_time) + 1;
  const avgMilesPerDay = totalMiles / (totalDays - zeroDays);
  const avgMilesPerDayNoNero = totalMiles / (totalDays - zeroDays - neroDays);
  const sectionNights = data.map(p => calculateNights(p.start_time, p.end_time));
  const avgSectionNights = sectionNights.reduce((acc, curr) => (acc + curr), 0) / sectionNights.length;
  const maxSectionNights = Math.max(...sectionNights);
  const avgSectionMiles = totalMiles / data.length;
  const maxSectionMiles = Math.max(...(data.map(p => p.total_miles)));

  return (
    <section id="stats">
        <h2>Stats</h2>
        <table>
          <tr>
            <td><b>Miles</b></td>
            <td><span>{totalMiles}</span></td>
          </tr>
          <tr>
            <td><b>Days</b></td>
            <td><span>{totalDays}</span></td>
          </tr>
          <tr>
            <td><b>Zero Days</b></td>
            <td><span>{zeroDays}</span></td>
          </tr>
          <tr>
            <td><b>Nero Days</b></td>
            <td><span>{neroDays}</span></td>
          </tr>
          <tr>
            <td><b>Avg. Miles / Day (- zeros)</b></td>
            <td><span>{avgMilesPerDay.toFixed(1)}</span></td>
          </tr>
          <tr>
            <td><b>Avg. Miles / Day (- zero/nero)</b></td>
            <td><span>{avgMilesPerDayNoNero.toFixed(1)}</span></td>
          </tr>
          <tr>
            <td><b>Pairs of Shoes</b></td>
            <td><span>{numShoes}</span></td>
          </tr>
          <tr>
            <td><b>Max Section Nights</b></td>
            <td><span>{maxSectionNights}</span></td>
          </tr>
          <tr>
            <td><b>Avg Section Nights</b></td>
            <td><span>{avgSectionNights.toFixed(1)}</span></td>
          </tr>
          <tr>
            <td><b>Max Section Miles</b></td>
            <td><span>{maxSectionMiles}</span></td>
          </tr>
          <tr>
            <td><b>Avg Section Miles</b></td>
            <td><span>{avgSectionMiles.toFixed(1)}</span></td>
          </tr>
        </table>
    </section>
  );
}

