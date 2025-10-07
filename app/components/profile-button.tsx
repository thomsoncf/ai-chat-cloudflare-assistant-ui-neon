"use client";

import { useRevalidator } from "react-router";
import { useUser } from "@stackframe/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";

export function ProfileButton() {
  const user = useUser();
  const revalidator = useRevalidator();

  if (!user) {
    return null;
  }

  // Get user initials from display name or email
  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  const initials = getInitials(
    user.displayName || undefined,
    user.primaryEmail || undefined,
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.profileImageUrl || undefined}
              alt={user.displayName || "User"}
            />
            <AvatarFallback className="text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.profileImageUrl || undefined}
                alt={user.displayName || "User"}
              />
              <AvatarFallback className="text-xs font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {user.displayName || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.primaryEmail}
              </p>
            </div>
          </div>
          <div className="border-t pt-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm"
              onClick={async () => {
                await user.signOut();
                revalidator.revalidate();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
