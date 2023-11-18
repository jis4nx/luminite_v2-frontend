import { createReview } from "@app/api/productapi/productapi";
import { Button, Rating, Textarea, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

function UserReview() {
  const [rating, setRating] = useState();
  const [body, setBody] = useState();
  const [isReviewError, setIsReviewError] = useState(false);
  const addReview = useMutation(createReview);
  const { user_id } = useSelector((state) => state.profile);
  const { productItem } = useSelector((state) => state.product);
  const queryClient = useQueryClient();

  useEffect(() => {
    let timeoutId;
    if (isReviewError) {
      timeoutId = setTimeout(() => {
        setIsReviewError(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isReviewError]);

  const handleSubmit = () => {
    const data = {
      user: user_id,
      product_item: productItem.id,
      rating: rating,
      body: body,
    };
    addReview.mutate(data, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["product"] });
      },
      onError(err) {
        setIsReviewError(err.response.data.non_field_errors[0]);
      },
    });
  };
  return (
    <div className="space-y-3">
      {isReviewError
        ? <p className="text-red-600 text-sm">{isReviewError}</p>
        : null}

      <div className="flex gap-3">
        <p className="text-sm text-gray-700">Rating</p>
        <Rating value={rating} onChange={(value) => setRating(value)} />
      </div>
      <Textarea
        size="lg"
        color="indigo"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Loved it!!!"
      />
      <Button size="sm" color="blue-gray" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default UserReview;
