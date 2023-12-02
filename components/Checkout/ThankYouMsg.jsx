import React from "react";
import Link from "next/link";

function ThankYouMsg({ orderId }) {
  return (
    <div className="max-w-[900px]">
      <div className="m-20 p-10 rounded shadow-lg ring ring-indigo-600/50">
        <div className="flex flex-col items-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-600 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold">Thank You !</h1>
          <div className="text-gray-800 text-center text-lg space-y-3">
            <p className="text-site-blue font-semibold">
              ORDER ID #{orderId}
            </p>
            <div className="space-y-3">
              <p>
                Your order has been placed successfully
              </p>
              <p>
                An email has been sent with the order summary
              </p>
            </div>
          </div>
          <Link
            className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
            href="/orders"
          >
            <span className="text-sm font-medium">
              Your orders
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThankYouMsg;
