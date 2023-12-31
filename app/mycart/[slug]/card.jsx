"use client";
import Image from "next/image";
import { Table } from "@radix-ui/themes";
import StarComp from "../../(homePage)/(products section)/StarComp";

import Counter from "./counter";
import TotalCell from "./(components)/TotalCell";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
function Card({
  product,
  deleteItemFromCart,
  arrayOfproductCounts,
  setarrayOfproductCounts,
  i,
}) {
  const regex = /(Pro)(\S)/;
  const type = product.collectionName.replace(regex, (str, p1, p2) => {
    return p2.toLowerCase();
  });
  const [isMobileScreen, setisMobileScreen] = useState(false);

  useEffect(() => {
    if (document.documentElement.clientWidth < 768) {
      setisMobileScreen(true);
    }
  }, []);
  const router = useRouter();
  return (
    <Table.Row align={"center"} className="relative">
      <Table.RowHeaderCell>
        <div className="flex md:flex-row flex-col items-center md:space-x-5 h-[120px] overflow-auto sm:overflow-hidden">
          <div className="flex items-center p-1 bg-white ">
            <Image
              src={`${process.env.pocketBaseUrl}api/files/${product.collectionId}/${product.id}/${product.imgs}`}
              alt=""
              height={isMobileScreen ? 50 : 70}
              width={isMobileScreen ? 50 : 80}
              className="w-auto h-auto cursor-pointer"
              onClick={() =>
                router.push("/product" + "/" + type + "/" + product.id)
              }
            />
          </div>
          <div className="flex flex-col items-start justify-center w-full md:justify-between">
            <Link
              className="w-full text-xs font-semibold text-center md:text-start md:text-lg"
              href={"/product" + "/" + type + "/" + product.id}
            >
              {product.name}
            </Link>
            <div className="items-center hidden md:flex">
              <StarComp
                className="fill-secondaryYellow"
                count={product.rating}
                size={10}
                readonly={true}
              />
              <p className="block text-xs text-gray-400 md:inline">
                ({product.totalRated})
              </p>
            </div>
          </div>
        </div>
      </Table.RowHeaderCell>

      <Table.Cell justify={"center"}>
        <p className="md:text-lg ">
          $
          {parseFloat(product.price).toFixed(2) -
            (parseFloat(product.price).toFixed(2) * product.sale).toFixed(2)}
        </p>
      </Table.Cell>

      <Table.Cell justify={"center"}>
        <Counter
          arrayOfproductCounts={arrayOfproductCounts}
          i={i}
          setarrayOfproductCounts={setarrayOfproductCounts}
        />
      </Table.Cell>
      <Table.Cell>
        <TotalCell
          product={product}
          deleteItemFromCart={deleteItemFromCart}
          quantity={arrayOfproductCounts[i]}
        />
      </Table.Cell>
    </Table.Row>
  );
}

export default Card;
