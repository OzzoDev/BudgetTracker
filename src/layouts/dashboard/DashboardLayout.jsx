import { Outlet } from "react-router";
import PageTransition from "../animations/PageTransition";
import DashboardHeader from "./DashboardHeader";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <main className="min-h-screen bg-black">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
}
