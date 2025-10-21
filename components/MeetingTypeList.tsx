"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Call } from '@stream-io/video-react-sdk'
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import ReactDatePicker from 'react-datepicker';
import { Input } from "@/components/ui/input"


const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const router = useRouter();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const [Values, setValues] = useState({ dateTime: new Date(), link: '', description: '' });

  const [callDetails, setcallDetails] = useState<Call>()

  // create meeting
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!Values.dateTime) {
        toast.error("Please select a date and time");
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if (!call) throw new Error('Failed to create call');

      const startsAt = Values.dateTime.toISOString();
      const description = Values.description || 'Instant Meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }

        }
      })

      setcallDetails(call);
      if (!Values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast.success("Meeting created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create meeting");
    }
  }

  const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id} `;


  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>

      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className="bg-orange-1"
      />

      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className="bg-blue-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push('/recordings')}
        className="bg-purple-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Join via invitation link"
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className="bg-yellow-1"
      />


      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}

          title="Start an Instant Meeting"

          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">Add a Description</label>
            <Textarea className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => setValues({ ...Values, description: e.target.value })}
            />

          </div>

          <div className="flex w-full flex-col gap-2.5 ">
            <label className="text-base text-normal leading-[22px] text-sky-2">Select Date and Time</label>
           <ReactDatePicker
            selected={Values.dateTime}
            onChange={(date) => setValues({ ...Values, dateTime: date! })}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='time'
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full rounded bg-dark-2 p-2 focus:outline-none"
           />
          </div>

        </MeetingModal>

      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          className="text-center"
          title="Meeting Created"

          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Meeting link copied to clipboard");
           
          }}
           image = "/icons/checked.svg"
            buttonIcon="/icons/copy.svg"
            buttonText="Copy Meeting Link"
        />

     ) }

      {/* )} */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        className="text-center"
        title="Start an Instant Meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

         <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        className="text-center"
        title="Type the link here"
        buttonText="Join Meeting"
        handleClick={()=>router.push(Values.link)}
      >
        <Input
          placeholder="Enter Meeting Link"
          className="bg-dark-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={Values.link}
          onChange={(e) => setValues({ ...Values, link: e.target.value })}
        />
        </MeetingModal>

    </section>
  )
}

export default MeetingTypeList