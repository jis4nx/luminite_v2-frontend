import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button,Input } from "@material-tailwind/react";
import React from "react";

function SearchButton(
  { setSearchQuery, setInpFocus, searchQuery, handleClick },
) {
  return (
    <div className="relative flex w-full max-w-[24rem]">
      <Input
        label="Search"
        className="pr-20"
        value={searchQuery}
        onFocus={() => setInpFocus(true)}
        onChange={(e) => setSearchQuery(e.target.value)}
        containerProps={{
          className: "min-w-0",
        }}
      />
      {searchQuery &&
        (
          <div
            onClick={() => {
              setInpFocus(false);
              setSearchQuery("");
            }}
          >
            <FontAwesomeIcon
              icon={faX}
              size="sm"
              className="!absolute top-3 right-24 text-red-500 bg-gray-200"
            />
          </div>
        )}

      <Button
        onClick={handleClick}
        size="sm"
        className="!absolute right-1 top-1 rounded bg-indigo-700"
      >
        Search
      </Button>
    </div>
  );
}

export default SearchButton;
