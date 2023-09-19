import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const guestsRef = db.collection("guests");

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const nombre = params.nombre;
    const formData = await request.formData()
    const confirmed = formData.get('confirmed') === 'true'
    console.log(formData)
  if (!nombre) {
    return new Response("No existe invitado", {
      status: 404,
    });
  }

  try {
    await guestsRef.doc(nombre).update({
     confirmed
    });
  } catch (error) {
    console.error(error)
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/rsvp/" + nombre);
};

