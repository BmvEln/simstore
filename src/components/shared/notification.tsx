"use client";

import React, { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { Check, CircleX, Info } from "lucide-react";

import { NotificationStatuses } from "@/static/types";

import { useNotificationStore } from "@/store/notification";

function NIcon({
  status,
  size = 24,
}: {
  status: NotificationStatuses;
  size?: number;
}) {
  if (status === 1) {
    return <CircleX size={size} />;
  } else if (status === 2) {
    return <Check size={size} />;
  } else if (status === 3) {
    return <Info size={size} />;
  }
}

function Notification() {
  const { text, status } = useNotificationStore((state) => state);

  const notificationText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!text && notificationText.current) {
      const timeout = setTimeout(() => {
        if (notificationText.current) {
          notificationText.current.textContent = "";
        }
      }, 1000);

      return () => clearTimeout(timeout);
    } else if (text && notificationText.current) {
      notificationText.current.textContent = text;
    }
  }, [text]);

  return (
    <div
      id="notification"
      className={cn(
        "fixed flex gap-2 items-center transition duration-300 left-[50%] z-99 px-4 py-1 rounded-md pointer-events-none box-border border-white bg-black/50 text-white h-10 w-fit border",
        text ? "opacity-100 top-2.5 scale-100" : "opacity-0 top-0 scale-0",
      )}
    >
      <NIcon status={status} />

      <span ref={notificationText} />
    </div>
  );
}

export default Notification;
