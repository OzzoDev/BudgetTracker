import { Outlet } from "react-router";
import PageTransition from "../animations/PageTransition";
import DashboardHeader from "./DashboardHeader";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <main className="min-h-screen bg-black text-white">
        <PageTransition>
          <Outlet />
        </PageTransition>
        <Toaster className="bg-black" />
      </main>
    </div>
  );
}
