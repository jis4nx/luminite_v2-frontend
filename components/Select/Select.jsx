import React from "react";

function Select() {
  return (
    <div>
      <div class="flex-auto flex flex-col items-center h-64">
        <div class="flex flex-col items-center relative">
          <div class="w-full  svelte-1l8159u">
            <div class="my-2 bg-white p-1 flex border border-gray-200 rounded svelte-1l8159u">
              <div class="flex flex-auto flex-wrap"></div>
              <input
                value="Javascript"
                class="p-1 px-2 appearance-none outline-none w-full text-gray-800  svelte-1l8159u"
              />
            </div>
          </div>
          <div class="absolute shadow top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
            <div class="flex flex-col w-full">
              <div
                class="cursor-pointer w-full border-gray-100 rounded-t border-b 
            hover:bg-teal-100"
              >
                <div class="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-teal-600 hover:text-teal-100 hover:border-teal-600">
                  <div class="w-full items-center flex">
                    <div class="mx-2 leading-6  ">Python</div>
                  </div>
                </div>
              </div>
              <div
                class="cursor-pointer w-full border-gray-100 border-b 
            hover:bg-teal-100 "
              >
                <div class="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-teal-600 hover:text-teal-100 border-teal-600">
                </div>
              </div>
              <div
                class="cursor-pointer w-full border-gray-100 rounded-b 
            hover:bg-teal-100 "
              >
                <div class="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative  hover:bg-teal-600 hover:text-teal-100 hover:border-teal-600">
                  <div class="w-full items-center flex">
                    <div class="mx-2 leading-6  ">Ruby</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Select;
