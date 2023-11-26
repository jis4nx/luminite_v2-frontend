import { useQuery } from "@tanstack/react-query";
import { merchantAnalytics } from "@app/api/productapi/merchant";
import "./styles.css";
import OrderGraph from "../SalesGraph/OrderGraph";
import PieGraph from "../SalesGraph/PieGraph";

function SalesData() {
  const { data: analyticsData } = useQuery({
    queryKey: ["analyticsData"],
    queryFn: merchantAnalytics,
  });

  return analyticsData && (
    <div className="m-3 flex flex-col gap-10">
      <section className="flex justify-around">
        <div className="flex flex-col justify-around items-center gap-3 p-3 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <p className="font-bold text-lg text-gray-600">Total Sales</p>
          <p className="text-site-blue font-bold">{analyticsData.total_sold}</p>
        </div>
        <div className="flex flex-col justify-around items-center gap-3 p-3 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <p className="font-bold text-lg text-gray-600">Total Earned</p>
          <p className="text-site-blue font-bold">
            {analyticsData.total_sales_price}
          </p>
        </div>
      </section>
      <section>
        <OrderGraph items={analyticsData.items} />
      </section>
      <section className="w-max-[600px] w-[700px]">
        <PieGraph soldItems={analyticsData.most_sold_types} />
      </section>
    </div>
  );
}

export default SalesData;
