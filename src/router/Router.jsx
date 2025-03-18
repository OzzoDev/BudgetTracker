import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import CategoriesPage from "@/pages/CategoriesPage";
import GoalsPage from "@/pages/GoalsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import OverviewPage from "@/pages/OverviewPage";
import SpendingsPage from "@/pages/SpendingsPage";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<OverviewPage />} />
      <Route path="spendings" element={<SpendingsPage />} />
      <Route path="categories" element={<CategoriesPage />} />
      <Route path="goals" element={<GoalsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
