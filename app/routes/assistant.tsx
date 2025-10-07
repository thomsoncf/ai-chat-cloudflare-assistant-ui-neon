"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "~/components/assistant-ui/thread";
import { ThreadList } from "~/components/assistant-ui/thread-list";
import { UserButton, useUser } from "@stackframe/react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export default function Assistant() {
  const user = useUser();
  const runtime = useChatRuntime();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="relative">
        {/* Auth header in top right */}
        <div className="absolute top-4 right-4 z-10">
          {user ? (
            <UserButton />
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
