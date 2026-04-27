import { create } from "zustand";

import { NotificationStatuses } from "@/static/types";

type NotificationState = {
  text: string;
  status: NotificationStatuses | undefined;
  showNotification: (
    text: string,
    status: NotificationStatuses | undefined,
  ) => void;
};

export const useNotificationStore = create<NotificationState>((set) => {
  let timmerId: ReturnType<typeof setTimeout> | null = null;

  return {
    text: "",
    status: undefined,
    showNotification: (
      text: string,
      status: NotificationStatuses | undefined,
    ) => {
      // очищаем предыдущий таймер
      if (timmerId) {
        clearTimeout(timmerId);
      }

      set({ text, status });

      timmerId = setTimeout(() => {
        set({ text: "", status: undefined });
        timmerId = null;
      }, 3000);
    },
  };
});
