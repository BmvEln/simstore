import { create } from "zustand";

import { NotificationStatuses } from "@/static/types";

type NotificationState = {
  text: string;
  status: NotificationStatuses;
  setShow: (text: string, status: NotificationStatuses) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  text: "",
  status: undefined,
  setShow: (text: string, status: NotificationStatuses) => {
    set({ text, status });

    setTimeout(() => {
      set({ text: "", status: undefined });
    }, 3000);
  },
}));
