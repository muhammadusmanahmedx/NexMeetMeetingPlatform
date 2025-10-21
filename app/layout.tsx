import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import { Toaster } from "@/components/ui/sonner"
import "@stream-io/video-react-sdk/dist/css/styles.css";
import 'react-datepicker/dist/react-datepicker.css';


export const metadata: Metadata = {
  title: "NexMeet",
  description: "Meeting App",
  icons:{
    icon:'/icons/logo.svg'
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider 
      
      appearance={{
        layout: {
          logoImageUrl: '/icons/yoom-logo.svg',
          socialButtonsVariant: 'iconButton',
        },
        variables: {
          colorPrimary: '#0e78f9',
          colorText: '#ffffff',
          colorBackground: '#1c1f2e',
          colorInputBackground: '#252a41',
          colorInputText: '#ffffff',
         
        }
      }}
      >
        <body className={`bg-dark-2 text-white`}>
          {children}
             <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
