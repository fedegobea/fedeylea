import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const guestsRef = db.collection("messages");

export const POST: APIRoute = async ({ params, redirect, request }) => {
    const formData = await request.formData()
    const name = formData.get('name') 
    const _public = formData.get('public') 
    const message = formData.get('message') 
  try {
    await guestsRef.doc().set({
     name,
     message,
     public:_public === 'on' ? true : false
    });
  } catch (error) {
    console.error(error)
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/messages/thank-you");
};

