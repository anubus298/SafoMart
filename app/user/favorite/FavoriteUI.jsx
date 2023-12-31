"use client";
import BackComp from "./back";
import Favorite_product_section from "./Favorite_product_section";
import { useState } from "react";
function CartUI({ products, count, fullStartingPrice, id }) {
  const [priceSummary, setpriceSummary] = useState(fullStartingPrice);
  return (
    <>
      <div className="bg-secondarySecondarylight w-full md:w-10/12 md:ps-5">
      <div className="text-center py-2 w-full bg-main text-white md:bg-transparent md:text-main md:py-0">

          <p className="text-5xl md:text-4xl font-semibold text-center md:text-start pt-2">
            Favorites
          </p>
        </div>
        <div className="flex flex-col gap-2  font-semibold  py-2 md:py-10 h-full ">
          <Favorite_product_section
            id={id}
            products={products}
            count={count}
            priceSummary={priceSummary}
            setpriceSummary={setpriceSummary}
          />
        </div>
      </div>
    </>
  );
}

export default CartUI;
