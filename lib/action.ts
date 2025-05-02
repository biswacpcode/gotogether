// lib/auth-actions.ts
'use server'
import { getServerSession } from "next-auth";
import { supabase } from "./supabase";
import { authOptions } from "./auth";
import { RideData } from "@/components/shared/RideCard";
import { differenceInDays, differenceInMinutes, parseISO } from "date-fns";

export async function checkExistence(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") { // Not "no rows"
    console.error("Supabase error checking user:", error.message);
    return null;
  }

  return data;
}

export async function createNewUser(name: string, email: string, image: string,) {
  const { error } = await supabase.from("users").insert([
    {
      name,
      email,
      image,
    },
  ]);

  if (error) {
    console.error("Supabase error creating user:", error.message);
    throw error;
  }
}

async function getUser(){

  const session = await getServerSession(authOptions);
  const email = session?.user?.email!;
  // const { data, error } = await supabase
  //   .from("users")
  //   .select("*")
  //   .eq("email", email)
  //   .single();

  //   if (error){
  //     console.error("Failed to fetch the current user : ", error);
  //     return null;
  //   }else{
  //     return data;
  //   }

  return {name: session?.user?.name!, email:session?.user?.email!};
  
}


export const insertRide = async (rideData: {
  direction: string;
  location: string;
  date: string;
  time: string;
  gender: string;
  genderPreference: string;
  notes?: string;
  phone?: string;
}) => {
  const user = await getUser();

  const dataTosend = {
    name: user.name,
    email: user.email,
    ...rideData,
  };

  const { data, error } = await supabase.from('shared_trips').insert([dataTosend]);

  if (error) {
    console.error("Error inserting ride:", error);
  } else {
    console.log("Ride inserted successfully:", data);
  }
};


export const getMatches = async ({
  email,
  date,
  time,
  direction,
  gender,
  genderPreference,
  location
}: {
  email: string;
  date: string;
  time: string;
  direction: string;
  gender: string;
  genderPreference: string;
  location: string;
}): Promise<RideData[]> => {
  const { data, error } = await supabase
    .from('shared_trips')
    .select('*')
    .eq('direction', direction)
    .eq('location', location);

  if (error) {
    console.error('Error fetching shared_trips:', error);
    return [];
  }


  if (!data) return [];
  const submittedDate = parseISO(date);
  const submittedTime = parseISO(`${date}T${time}`);


  const filtered:RideData[] = data.filter((trip) => {
    if (trip.email === email) return false;

    const tripDate = parseISO(trip.date);
    const tripTime = parseISO(`${trip.date}T${trip.time}`);

    const dateDiff = Math.abs(differenceInDays(submittedDate, tripDate));


    const genderMatchesPref = trip.genderPreference === gender || trip.genderPreference === 'any';
    const prefMatchesGender = genderPreference === trip.gender || genderPreference === 'any';

    return (
      dateDiff <= 1 &&
      genderMatchesPref &&
      prefMatchesGender
    );
  });



  return filtered;
};

export async function Getrides(){
  const session = await getServerSession(authOptions);
  const email = session?.user?.email!;
  const { data, error } = await supabase
  .from('shared_trips')
  .select('*')
  .eq('email', email)
  .order('created_at', { ascending: false });


  if (error) {
    console.error('Error fetching User Trips:', error);
    return [];
  }

  return data as RideData[];


}



export async function DeleteRide(id:string) {
  const { error } = await supabase.from('shared_trips').delete().eq('id', id);

  if (error) {
    console.error('Error deleting ride:', error);
  }
}


export async function getRideDetail(id: string){
  const { data, error } = await supabase
  .from('shared_trips')
  .select('*')
  .eq('id', id)


  if (error) {
    console.error('Error fetching Trip:', error);
    return;
  }

  return data[0] as RideData;
}