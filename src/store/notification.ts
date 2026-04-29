import { create } from "zustand";

import { NotificationStatuses } from "@/static/types";

type NotificationState = {
  text: string;
  status: NotificationStatuses;
  showNotification: (text: string, status: NotificationStatuses) => void;
};

export const useNotificationStore = create<NotificationState>((set) => {
  let timmerId: ReturnType<typeof setTimeout> | null = null;

  return {
    text: "",
    status: 1,
    showNotification: (text: string, status: NotificationStatuses) => {
      // очищаем предыдущий таймер
      if (timmerId) {
        clearTimeout(timmerId);
      }

      set({ text, status });

      timmerId = setTimeout(() => {
        set({ text: "", status: 1 });
        timmerId = null;
      }, 3000);
    },
  };
});
