import React from "react";
import Chart from "react-apexcharts";

function PieGraph({ soldItems }) {
  return soldItems && (
    <div>
      <Chart
        type="donut"
        options={{
          labels: soldItems.map((item) => item.product_type),
          title: {
            text: "Most sold product types",
            style: {
              fontSize: "14px",
            },
          },
          dataLabels: {
            style: {
              colors: ["#ffffff"],
            },
          },
          theme: {
            mode: "light",
            palette: "palette7",
          },
          legend: {
            position: "right",
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true,
                    showAlways: true,
                  },
                },
              },
            },
          },
        }}
        series={soldItems.map((item) => item.count)}
        width="100%"
        height={300}
      >
      </Chart>
    </div>
  );
}

export default PieGraph;
