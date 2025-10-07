import { useLocation } from "react-router";
import { StackHandler } from "@stackframe/react";
import { stackClientApp } from "~/lib/stack-auth";

export default function HandlerRoutes() {
  const location = useLocation();
  return (
    <StackHandler app={stackClientApp} location={location.pathname} fullPage />
  );
}
