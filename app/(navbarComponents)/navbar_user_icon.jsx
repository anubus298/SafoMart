"use client";
import { Menu, Transition } from "@headlessui/react";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { CartIcon } from "./cartIcon";
import PocketBase from "pocketbase";

import commandsAtom from "../(lib)/jotai/commandsAtom";
import accountAtom from "../(lib)/jotai/accountAtom";
import userAtom from "../(lib)/jotai/userAtom";
import notificationAtom from "../(lib)/jotai/notificationAtom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../(lib)/context-provider";
import { Avatar, Badge } from "antd";
import { useAtom } from "jotai";
import Category_notification from "./(user_categories)/category_notification";
import Category_account from "./(user_categories)/category_account";
import Category_commands from "./(user_categories)/category_commands";
function Navbar_user_icon() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const [commandsCountAtom, setcommandsCountAtom] = useAtom(commandsAtom);
  const [userCountAtom] = useAtom(userAtom);
  const [accountCountAtom, setaccountCountAtom] = useAtom(accountAtom);
  const [notificationsCountAtom, setnotificationsCountAtom] =
    useAtom(notificationAtom);
  const { isValid, setisValid } = useContext(AuthContext);
  const [loop, setloop] = useState(false);
  useEffect(() => {
    function GetUserCategoriesInfo() {
      const res = fetch("/api/userCategories?type=number", {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setnotificationsCountAtom(data.notif);
            setcommandsCountAtom(data.commands);
            setaccountCountAtom(data.account);
          }
        });
    }
    GetUserCategoriesInfo();
  }, [loop]);
  setInterval(() => setloop(!loop), 30000);

  pb.authStore.loadFromCookie(getCookie("pb_auth"));

  function deleteCookie(name) {
    setCookie(name, "", {
      "max-age": -1,
    });
  }
  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  function setCookie(name, value, options = {}) {
    options = {
      path: "/",
      ...options,
      secure: true,
      expires: new Date(Date.now() + 86400e3).toUTCString(),
    };

    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }
  const router = useRouter();
  return (
    <div className="flex">
      <CartIcon />
      <Menu className="relative" as={"menu"}>
        <Menu.Button className="hover:text-secondary transition m-2 flex items-center gap-x-2">
          <Badge size="small" count={userCountAtom}>
            <Avatar shape="square" size="small" className="bg-green-500">
              {pb.authStore.model?.username[0].toUpperCase()}
            </Avatar>
          </Badge>
          <p className="max-w-[90px] md:max-w-[120px] overflow-hidden">
            {pb.authStore.model?.username}
          </p>
        </Menu.Button>
        <Transition
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-y-75"
          enterTo="transform opacity-100 scale-y-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-y-100"
          leaveTo="transform opacity-0 scale-y-75"
        >
          <Menu.Items className="bg-secondary flex flex-col rounded-lg gap-y-4 p-4 right-4 w-[150px] absolute z-50 ">
            <Menu.Item>
              <Category_account />
            </Menu.Item>
            <Menu.Item>
              <Category_notification />
            </Menu.Item>
            <Menu.Item>
              <Category_commands />
            </Menu.Item>
            <Menu.Item>
              {() => (
                <div
                  className={
                    " p-1  flex items-center gap-x-2 cursor-pointer transition ease-out " +
                    ` transition p-1 rounded-lg`
                  }
                  onClick={() => {
                    pb.authStore.clear();
                    router.push("/");
                    deleteCookie("pb_auth");
                    setisValid(false);
                  }}
                >
                  <FontAwesomeIcon icon={faSignOut} />
                  <p>Logout</p>
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default Navbar_user_icon;
