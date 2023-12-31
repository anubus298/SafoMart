"use client";

import { ColorRing } from "react-loader-spinner";

import addToFavorite from "../../functions/addToFavorite";
import "@radix-ui/themes/styles.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCircleCheck,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import { ConfigProvider } from "antd";

function AddToMyFavorite({ collectionName, id, already }) {
  const [messageApi, contextHolder] = message.useMessage();
  message.config({
    top: 80,
  });
  const [isloading, setisloading] = useState(false);
  const router = useRouter();
  const [IsAddedfromThebutton, setIsAddedfromThebutton] = useState(false);
  async function handleFavorite(collectionName, id) {
    setisloading(true);

    let res = await addToFavorite(collectionName, id);
    setisloading(false);

    if (res.status == 401) {
      messageApi.info("You must login first ,redirecting to login page ...");
      setTimeout(() => {
        router.push("/logIn/QCqsf8q9");
      }, 5000);
    }
    if (res.status == 200) {
      messageApi.success("Added successfully to favoritesss");
      setIsAddedfromThebutton(true);
    }
    if (res.status == 400) {
      messageApi.error("Error accrued");
    }
  }
  return (
    <ConfigProvider
      theme={{
        token: {},
      }}
    >
      {contextHolder}

      <button
        onClick={() => {
          handleFavorite(collectionName, id);
        }}
        className="bg-main w-1/5 flex justify-center h-[50px] items-center transition rounded-lg md:rounded-e-none font-bold p-2 disabled:text-red-600 text-white"
        disabled={already || IsAddedfromThebutton}
      >
        {!isloading && (
          <FontAwesomeIcon
            icon={
              already || IsAddedfromThebutton
                ? faHeartCircleCheck
                : faHeartCirclePlus
            }
            className="transition"
            size="2x"
          />
        )}
        <ColorRing
          visible={isloading}
          height="25"
          width="25"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </button>
    </ConfigProvider>
  );
}

export default AddToMyFavorite;
