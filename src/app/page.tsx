import { stackServerApp } from "@/lib/stack/server";
import { Assistant } from "@/lib/assistant";

export default async function Home() {
  await stackServerApp.getUser({ or: "redirect" });
  return <Assistant />;
}
