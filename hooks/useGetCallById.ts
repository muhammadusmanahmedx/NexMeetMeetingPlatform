import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { use, useEffect, useState } from "react";

export const useGetCallById = (id: string| string[]) => {
  // Placeholder implementation
  // Replace with actual logic to get a call by its ID
  const [call , setCall] = useState<Call>();
    const [isCallLoading, setIsCallLoading]=useState(true);
const client =useStreamVideoClient();

useEffect(()=>{
 if(!client || !id) return;

 const loadCall=async()=>{
    const {calls}=await client.queryCalls({
        filter_conditions:{
            id: { $eq: Array.isArray(id) ? id[0] : id },
        },
    });

    if(calls.length > 0) setCall(calls[0]);
    setIsCallLoading(false);
 }

 loadCall();



},[client,id])


  return { call , isCallLoading };
}