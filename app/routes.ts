import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/assistant.tsx"),
  route("api/chat", "routes/api/chat.tsx"),
  route("/handler/*", "routes/handler.tsx"),
] satisfies RouteConfig;
