import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
    // Placeholder for hook logic

const[calls,setCalls]=useState<Call[]>([]);
const[isLoading,setIsLoading]=useState(false);
const client=useStreamVideoClient();

const{user}=useUser();

useEffect(()=>{
const loadCalls=async()=>{
    if(!client || !user) return;
    setIsLoading(true);
    try {
       const result = await client.queryCalls(
        {
            sort:[{field:'starts_at',direction:-1}],
            filter_conditions:{
                starts_at:{$exists:true},
                $or:[
                    {created_by_user_id:user.id},
                    {members:{$in:[user.id]}},
                ]
            }
        }
       );
       // set calls state from the result
       // result may contain { calls: Call[] } or be the array directly depending on SDK
       // normalize to an array
       const fetchedCalls = (result && (result as any).calls) ? (result as any).calls : (result as any) || [];
       setCalls(fetchedCalls as Call[]);
    } catch (error) {
        console.log( error);
    } finally {
        setIsLoading(false);
    }
}
loadCalls();

},[client,user?.id]);

const now=new Date();

const endedCalls=calls.filter(({
    state:{startsAt,endedAt}}:Call)=>{
        return(startsAt && new Date(startsAt)<now || !!endedAt)
    })

    const upcomingCalls=calls.filter(({
        state:{startsAt}}:Call)=>{
            return startsAt && new Date(startsAt)>now 
        })

    return {
        endedCalls,
        upcomingCalls,
        callRecordings: calls,
        isLoading,
    }
}