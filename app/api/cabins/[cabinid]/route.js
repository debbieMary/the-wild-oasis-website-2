import { getCabin, getBookedDatesByCabinId } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinid } = params;

  try {
      const [cabin, bookedDates] = await Promise.all([
        getCabin(cabinid),
        getBookedDatesByCabinId(cabinid),
      ]);


  // Return a JSON response
  return Response.json({cabin, bookedDates});

  } catch (error) {
return Response.json({message: "Cabin not found"}, {status: 404});

  }

}
