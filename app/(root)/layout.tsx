import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'
import Stream from 'stream'


export const metadata: Metadata = {
  title: "NexMeet",
  description: "Meeting App",
  icons:{
    icon:'/icons/logo.svg'
  }
};

const RootLayout = ({ children }:{children: ReactNode}) => {
  return (

   <main>
    <StreamVideoProvider>
    {children}
    </StreamVideoProvider>
   </main>
  )
}

export default RootLayout