import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function DashboardLayout() {
    return (
        <div className="flex flex-row h-full w-full">
            <Navbar />
            <Outlet />
        </div>
    );
};