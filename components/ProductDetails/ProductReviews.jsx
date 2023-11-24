import { Card } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { Rating } from "@material-tailwind/react";

function ProductReviews() {
  const { productItem: { reviews } } = useSelector((state) => state.product);
  return (
    <div className="">
      {reviews?.length
        ? reviews?.map((review) => {
          return review.body && (
            <div className="shadow-md bg-white p-5 rounded-sm">
              <div
                key={review.id}
                className="flex items-center gap-3"
              >
                <Image
                  alt="User Image"
                  width={50}
                  height={50}
                  src={`${process.env.BASE_URL}${review.user.image}`}
                />
                <div className="space-y-1">
                  <p className="text-site-blue text-xs">
                    {review.user.name}
                  </p>
                  <p className="text-sm text-gray-700">{review.body}</p>
                  <Rating value={review.rating} readonly />
                </div>
              </div>
              <p className="top-1 float-right  text-xs italic text-indigo-600">
                -{" "}{new Date(review.updated_at).toDateString()}
              </p>
            </div>
          );
        })
        : (
          <div className="shadow-md bg-white p-5 rounded-sm">
            <p className="text-sm text-gray-700">
              No Reviews found for this product :(
            </p>
          </div>
        )}
    </div>
  );
}

export default ProductReviews;
