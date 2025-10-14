"use client";

import { useMemo } from "react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { AssistantCloud } from "@assistant-ui/react";
import { ProfileButton } from "@/components/profile-button";

export const Assistant = () => {
  const cloud = useMemo(
    () =>
      new AssistantCloud({
        baseUrl: process.env.NEXT_PUBLIC_ASSISTANT_BASE_URL!,
        authToken: () =>
          fetch("/api/chat/token", { method: "POST" }).then((r) =>
            r.json().then((data: any) => data.token),
          ),
      }),
    [],
  );

  const runtime = useChatRuntime({
    cloud,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex h-dvh flex-col">
        <header className="flex space-between items-center justify-end px-4 py-2 bg-[#F6821E] text-white border-b border-[#FBAE41]">
          <div>
            new thing
          </div>
          <ProfileButton />
        </header>
        <div className="grid flex-1 grid-cols-[200px_1fr] gap-x-2 px-4 py-4 overflow-hidden">
          <ThreadList />
          <Thread />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
};
