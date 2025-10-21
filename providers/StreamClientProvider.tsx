"use client"; 
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import {

  StreamVideo,
  StreamVideoClient,


} from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
const appId = process.env.STREAM_APP_ID;

const StreamVideoProvider = ({children}:{children:ReactNode}) => {
const [videoClient,setVideoClient]=useState<StreamVideoClient>();

// clerk use fetching
const{user,isLoaded}=useUser();

useEffect(() => { 
  if(!isLoaded || !user) return;
  if(!apiKey) throw new Error("STREAM_API_KEY is not defined");
    
 const client = new StreamVideoClient({
  apiKey,
  user:{
    id: user?.id,
    name: user?.username || user?.id,
    image: user?.imageUrl,
  },
tokenProvider,

 });

 setVideoClient(client);
}, [user,isLoaded]);

if(!videoClient){
  return <Loader/>;
}

  return (
    <StreamVideo client={videoClient}>
     {children }
    </StreamVideo>
  );
};

export default StreamVideoProvider;