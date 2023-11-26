import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
function OrderGraph({ items }) {
  return items && (
    <div className="p-3">
      <Chart
        type="area"
        height={350}
        width="100%"
        series={[
          {
            name: "Sales",
            data: items.map((item) => item.total),
          },
        ]}
        options={{
          title: {
            text: "Sale Counts With Respect To Date",
            style: { fontSize: 14, align: "center" },
          },
          colors: ["#1c4c96"],
          xaxis: {
            title: { text: "Dates" },
            categories: items.map((item) =>
              new Date(item.order_date).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              })
            ),
          },
          yaxis: {
            title: { text: "No of Sales" },
          },
        }}
      >
      </Chart>
    </div>
  );
}

export default OrderGraph;
