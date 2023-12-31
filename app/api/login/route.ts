export const fetchCache = "force-no-store";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { emailSchema, passwordSchema } from "../../(lib)/Zod/schema";
import { z } from "zod";
interface loginData {
  email: string;
  password: string;
}
export async function POST(request: NextRequest) {
  const zodSchema = z.object({
    password: passwordSchema,
    email: emailSchema,
  });
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const body: loginData = await request.json();
  //zod verification
  try {
    zodSchema.parse(body);
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: "invalid email or password",
    });
  }
  const path = request.nextUrl.searchParams.get("survive");
  let date = new Date();
  date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000);
  try {
    const res = await pb
      .collection("users")
      .authWithPassword(body.email, body.password, { expand: "information" });
    if (!pb.authStore.model.verified) {
      return NextResponse.json({
        success: false,
        msg: "Account is not verified,check your email address.",
      });
    }
    pb.authStore.model.username = pb.authStore.model.username
      .split("_")
      .join(" ");

    if (!pb.authStore.model.isFieldsCreated) {
      const dataForCreate = {
        user: pb.authStore.model.id,
        id: pb.authStore.model.id,
        product_laptops: [],
        product_mobiles: [],
        product_tablets: [],
        product_tvs: [],
        product_wearables: [],
      };
      const fav = await pb.collection("Favorites").create(dataForCreate);
      const cart = await pb.collection("Carts").create(dataForCreate);
      const infoAcc = await pb.collection("Accounts_informations").create({
        user: pb.authStore.model.id,
        birth: "2000-01-01 10:00:00.123Z",
        phone: "test",
        gender: "Male",
        color: "#22c55e",
      });
      const change = await pb
        .collection("users")
        .update(pb.authStore.model.id, {
          isFieldsCreated: true,
          information: infoAcc.id,
        });
    }
    if (pb.authStore.isValid) {
      let colorRes = { color: "#ffffff" };
      try {
        colorRes = await pb
          .collection("Accounts_informations")
          .getFirstListItem(`user="${pb.authStore.model.id}"`, {
            fields: "color",
          });
      } catch (_) {}
      if (path) {
        cookies().set(
          "pb_auth",
          pb.authStore.exportToCookie({
            httpOnly: false,
          }),
          {
            maxAge: 7 * 24 * 60 * 60,
          }
        );
      } else {
        cookies().set(
          "pb_auth",
          pb.authStore.exportToCookie({
            httpOnly: false,
          })
        );
      }
      if (!pb.authStore.model.isHisInfoProvided) {
        return NextResponse.json({
          success: true,
          msg: "successfully authenticated",
          color: colorRes.color,
          redirect: "/completInfo",
        });
      } else {
        return NextResponse.json({
          success: true,
          msg: "successfully authenticated",
          color: colorRes.color,
          redirect: "/",
        });
      }
    }
  } catch (error) {
    if ((error.message = "Failed to authenticate.")) {
      return NextResponse.json({
        success: false,
        msg: "no such email or password.",
        err: error.message,
      });
    } else {
      return NextResponse.json({
        success: false,
        msg: error.message,
      });
    }
  }
}
