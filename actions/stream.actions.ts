"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";


const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;


export const tokenProvider = async () => {
 const user =await currentUser();
    if (!user) throw new Error("User not logged in");
    if(!apiKey) throw new Error("STREAM_API_KEY is not defined");
    if(!apiSecret) throw new Error("STREAM_API_SECRET is not defined");

    const Client=new StreamClient(apiKey,apiSecret);


    const exp=Math.round(new Date().getTime()/1000)+60*60; 
    const issued =Math.floor(Date.now()/1000)-60;     

    const token=Client.createToken(user.id,exp,issued);

    return token;


}