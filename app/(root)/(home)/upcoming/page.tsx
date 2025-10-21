import CallList from '@/components/CallList'
import { Call } from '@stream-io/video-react-sdk'
import React from 'react'

const upcoming = () => {
  return (
     <section className='flex size-full flex-col gap-10 text-white'>
<h1 className='text-3xl font-bold'>
        Upcoming Meetings
      </h1>

   <CallList  type="upcoming" />


    </section>
  )
}

export default upcoming