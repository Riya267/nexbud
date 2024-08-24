'use client';

import SidebarLoggedIn from "@/components/sidebar/sidebarLoggedIn";
import SidebarNotLoggedIn from "@/components/sidebar/sidebarNotLoggedIn";

export default function Sidebar() {
  const loggedIn = true
  return (
    <div>
      {loggedIn ? <SidebarLoggedIn /> : <SidebarNotLoggedIn />}
    </div>
  );
}
