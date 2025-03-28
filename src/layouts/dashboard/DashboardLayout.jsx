import { Outlet } from "react-router";
import PageTransition from "../animations/PageTransition";
import DashboardHeader from "./DashboardHeader";
import { Toaster } from "@/components/ui/sonner";
import useStockStore from "@/hooks/useStockStore";
import { useEffect } from "react";

export default function DashboardLayout() {
  const { getStocks } = useStockStore();

  useEffect(() => {
    getStocks();
  }, []);

  return (
    <div className="flex flex-col oveflow-x-hidden">
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
