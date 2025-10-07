"use client";

import { AssistantCloud, AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "~/components/assistant-ui/thread";
import { ThreadList } from "~/components/assistant-ui/thread-list";
import { useUser } from "@stackframe/react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { ProfileButton } from "~/components/profile-button";
import { stackClientApp } from "~/lib/stack-auth";

export default function Assistant() {
  const user = useUser({ or: "anonymous" });
  const cloud = new AssistantCloud({
    baseUrl: import.meta.env.VITE_ASSISTANT_BASE_URL,
    userId: user?.id,
    anonymous: true,
  });
  const runtime = useChatRuntime({ cloud });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          {!user?.isAnonymous ? (
            <ProfileButton />
          ) : (
            <Link to="/handler/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
        </div>

        <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
          <ThreadList />
          <Thread />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}
