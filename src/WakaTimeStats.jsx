import React from "react";

export default function WakaTimeStats({ data }) {
  if (!data || !data.data) {
    return <p>No data available</p>;
  }

  const totalTime = data.data.reduce(
    (acc, day) => acc + day.grand_total.total_seconds,
    0
  );
  const totalHours = (totalTime / 3600).toFixed(2);

  return (
    <div>
      <h4>Total Coding Time: {totalHours} hours</h4>
      <ul>
        {data.data.map((day, index) => (
          <li key={index}>
            {day.range.date}: {day.grand_total.text} of coding
          </li>
        ))}
      </ul>
    </div>
  );
}
