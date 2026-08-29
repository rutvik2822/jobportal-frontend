import { Outlet } from "react-router-dom";
import RecruiterSidebar from "./components/RecruiterSidebar";
import RecruiterHeader from "./components/RecruiterHeader";

function RecruiterLayout() {

    return (

        <div className="flex">

            <RecruiterSidebar />

            <div className="flex-1 bg-slate-100 min-h-screen">

                <RecruiterHeader />

                <main className="p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default RecruiterLayout;