"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  //console.log("Server action", formData);
  const session = await auth();
  if (!session) throw new Error("You should be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const regex = /^[a-zA-Z0-9]{6,12}$/;
  if (!regex.test(nationalID))
    throw new Error("Please provide a valid nationalId");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestID)
    .select()
    .single();

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  //console.log("Server action", formData);
  const session = await auth();
  if (!session) throw new Error("You should be logged in");

  const guestBookings = await getBookings(session.user.guestID);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) throw new Error("You are not allowed to delete this booking");

  /*// Función de espera mejorada
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Espera 10 segundos antes de continuar
await delay(30000); 
console.log("holi crayoli");*/

  const { error } = await supabase.from("booking").delete().eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}


export async function createReservation(bookingData,formData){
  console.log("<3<3<3<3<3<3<3", formData);
   const session = await auth();
  if (!session) throw new Error("You should be logged in");
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestID,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  

  const { error } = await supabase
    .from('booking').insert([newBooking])

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

    revalidatePath(`/cabins/${bookingData.cabinId}`);
      redirect("/cabins/thankyou");

}



export async function updateBooking(formData) {
  console.log("formData:", formData);

  const session = await auth();
  if (!session) throw new Error("You should be logged in");

 const guestBookings = await getBookings(session.user.guestID);

 const bookingId = Number(formData.get("bookingId"));
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) throw new Error("You are not allowed to delete this booking");
 const updatedDate = {
  numGuests : Number(formData.get("numGuests")),
  observations: formData.get("observations").slice(0,1000)

 };

  const { data, error } = await supabase
    .from("booking")
    .update(updatedDate)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

    revalidatePath("/account/reservations");
      revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut("google", { redirectTo: "/" });
}
