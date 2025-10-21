"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { toast } from "sonner";

interface MeetingCardProps {
    title: string;
    date: string;
    icon: string;
    isPreviousMeeting?: boolean;
    buttonIcon1?: string;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({
    icon,
    title,
    date,
    isPreviousMeeting,
    buttonIcon1,
    handleClick,
    link,
    buttonText,
}: MeetingCardProps) => {


    return (
        <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
            <article className="flex flex-col gap-3">
                <Image src={icon} alt="upcoming" width={28} height={28} />
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-base font-normal">{date}</p>
                    </div>
                </div>
            </article>
           <article className={cn("flex justify-center relative", {})}>
    <div className="relative flex w-full max-sm:hidden items-center">
        <div className="flex items-center">
            {avatarImages.map((img, index) => (
                <Image
                    key={index}
                    src={img}
                    alt="attendee"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-dark-3 -ml-3 first:ml-0"
                    style={{
                        zIndex: avatarImages.length - index,
                    }}
                />
            ))}

            {/* Filled +5 bubble */}
            <div
                className="flex items-center justify-center size-10 rounded-full bg-blue-1 text-white text-sm font-semibold shadow-md -ml-3"
                style={{
                    zIndex: 0,
                }}
            >
                +5
            </div>
        </div>
    </div>

    {!isPreviousMeeting && (
        <div className="flex gap-2">
            <Button onClick={handleClick} className="rounded bg-blue-1 py-2 px-6 text-white">
                {buttonIcon1 && (
                    <Image src={buttonIcon1} alt="feature" width={20} height={20} />
                )}
                &nbsp; {buttonText}
            </Button>
            <Button
                onClick={() => {
                    navigator.clipboard.writeText(link);
                    toast.success("Link Copied");
                }}
                className="rounded bg-blue-950 mr-6 px-6 text-white"
            >
                <Image
                    src="/icons/copy.svg"
                    alt="feature"
                    width={20}
                    height={20}
                />
                &nbsp; Copy Link
            </Button>
        </div>
    )}
</article>
        </section>
    );
};

export default MeetingCard;