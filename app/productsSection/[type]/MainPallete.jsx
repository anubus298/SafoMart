"use client";
import { Rate } from "antd";
import { ColorRing } from "react-loader-spinner";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FilterPallete from "./FilterPallete";
import { useEffect, useState } from "react";
function MainPallete({ data, typeForHref }) {
  let brandList = data.map((i) => {
    if (i.expand?.brand?.brandName) {
      return i.expand.brand.brandName;
    }
  });
  brandList = brandList.filter((i) => {
    return i !== undefined;
  });
  brandList = [...new Set(brandList)];
  const [arrangment, setarrangment] = useState(data);
  const [IsLoading, setIsLoading] = useState(false);
  const [RememberBrand, setRememberBrand] = useState("default");
  const [Reference, setReference] = useState(data);
  const [FilterParams, setFilterParams] = useState({
    Price: "default",
    Rating: "default",
    Brand: "default",
    reset: false,
  });
  useEffect(() => {
    if (FilterParams.reset == true) {
      setarrangment(Reference);
      setFilterParams({
        Price: "default",
        Rating: "default",
        Brand: "default",
        reset: false,
      });
    }
    if (FilterParams.Price != "default") {
      let Ref = [...arrangment];
      if (FilterParams.Price == "Desc") {
        Ref.sort((a, b) => {
          return b.price - a.price;
        });
        console.log("desc");
        console.log(Ref);
        setarrangment(Ref);
      } else if (FilterParams.Price == "Asc") {
        Ref.sort((a, b) => {
          return a.price - b.price;
        });
        console.log("Asc");
        console.log(Ref);
        setarrangment(Ref);
      }
    }
    if (FilterParams.Rating !== "default") {
      let Ref2 = [...arrangment];
      if (FilterParams.Rating == "Asc") {
        Ref2.sort((a, b) => {
          return b.rating - a.rating;
        });
        setarrangment(Ref2);
      } else if (FilterParams.Rating == "Desc") {
        Ref2.sort((a, b) => {
          return a.rating - b.rating;
        });
        setarrangment(Ref2);
      }
    }
    if (FilterParams.Brand !== "default") {
      if (FilterParams.Brand !== RememberBrand) {
        setRememberBrand(FilterParams.Brand);
        let Ref3 = [...arrangment];
        Ref3 = Ref3.filter((a) => {
          return a.expand?.brand?.brandName == FilterParams.Brand;
        });
        setarrangment(Ref3);
        setIsLoading(false);
      }
    }
  }, [FilterParams]);
  const router = useRouter();

  return (
    <div className="rounded-lg">
      <div className="p-1 flex items-center md:p-4 rounded-t-md h-14 border-[.5px] border-secondarySecondarylight">
        <FilterPallete
          Reference={Reference}
          setIsLoading={setIsLoading}
          setarrangment={setarrangment}
          FilterParams={FilterParams}
          setFilterParams={setFilterParams}
          brandList={brandList}
        />
      </div>
      <div className=" p-1 md:p-4 rounded-b-md bg-secondarySecondarylight h-full flex justify-evenly md:justify-normal gap-y-4 md:gap-x-6 md:gap-y-8 flex-wrap">
        {arrangment.map((product) => {
          return (
            <Card
              key={product.id}
              bordered={true}
              className="w-44 md:w-56 h-72 py-2 md:py-4 hover:shadow-lg hover:-translate-y-1 duration-200 ease-out font-lato"
              cover={
                <Image
                  alt="ss"
                  className="h-[150px] w-auto mx-auto cursor-pointer"
                  src={`http://127.0.0.1:8090/api/files/${product.collectionId}/${product.id}/${product.imgs[0]}`}
                  height={150}
                  width={150}
                  onClick={() =>
                    router.push(`/product/${typeForHref}/${product.id}`)
                  }
                />
              }
            >
              <Meta
                title={
                  <CardTitle
                    collectionId={product.expand?.brand.collectionId}
                    img={product.expand?.brand.img}
                    brandId={product.expand?.brand.id}
                    id={product.id}
                    name={product.name}
                    typeForHref={typeForHref}
                  />
                }
                description={
                  <CardDescription
                    price={product.price}
                    rating={product.rating}
                    id={product.id}
                    totalRated={product.totalRated}
                    typeForHref={typeForHref}
                  />
                }
              ></Meta>
            </Card>
          );
        })}
        {IsLoading && (
          <div className="h-[320px] flex justify-center items-center">
            <ColorRing
              visible={true}
              height="100"
              width="100"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function CardTitle({ collectionId, img, id, brandId, name, typeForHref }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-[30px] flex items-center justify-center">
        {brandId && (
          <Image
            width={30}
            alt="brandName"
            className=""
            height={30}
            src={`http://127.0.0.1:8090/api/files/${collectionId}/${brandId}/${img}?thumb=0x30`}
          />
        )}
      </div>
      <a href={`/product/${typeForHref}/${id}`}>
        <p className="text-sm md:text-base">{name}</p>
      </a>
    </div>
  );
}
function CardDescription({ price, rating, id, typeForHref }) {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-evenly">
      <a
        href={`/product/${typeForHref}/${id}`}
        className="text-secondary font-bold text-lg"
      >
        ${price}
      </a>
      <Rate className="text-xs gap-x-2 " defaultValue={rating} disabled />
    </div>
  );
}
export default MainPallete;
