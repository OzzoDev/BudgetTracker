import { GrOverview } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { LuHandCoins } from "react-icons/lu";
import { NavLink } from "react-router";
import useDataStore from "@/hooks/useDataStore";
import { formatNumber } from "@/utils/helpers";

const LINKS = [
  {
    link: "/",
    text: "Overview",
    icon: <GrOverview size={24} color="white" />,
  },
  {
    link: "/spendings",
    text: "Spendings",
    icon: <LuHandCoins size={24} color="white" />,
  },
  {
    link: "/categories",
    text: "Categories",
    icon: <BiCategory size={24} color="white" />,
  },
  {
    link: "/goals",
    text: "Goals",
    icon: <GoGoal size={24} color="white" />,
  },
];

export default function DashboardHeader() {
  const { pay } = useDataStore();

  return (
    <nav className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-y-4 py-4 px-8 bg-slate-800">
      <div>
        <h1 className="text-2xl text-blue-300 font-semibold">Budget Tracker</h1>
        <h2 className="text-lg text-white">$ {formatNumber(pay)}</h2>
      </div>
      <ul className="flex gap-x-4 lg:gap-x-8">
        {LINKS.map((link, index) => {
          return (
            <NavLink
              key={link.link + index}
              to={link.link}
              end
              className={({ isActive }) =>
                `py-2 px-2 lg:px-4 rounded-full lg:rounded-md transition-all duration-300 ease border-b-[1px] border-transparent ${
                  isActive
                    ? "bg-gradient-to-r from-sky-800 to-blue-900"
                    : "bg-transparent hover:border-blue-300"
                }`
              }>
              <div className="flex items-center gap-x-2">
                <div className="p-2 rounded-full bg-black">{link.icon}</div>
                <p className="hidden lg:block text-lg text-gray-400 font-medium">{link.text}</p>
              </div>
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}
