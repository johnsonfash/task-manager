import { Outlet } from "react-router-dom";
import Nav from "./nav";
import Sticky from "./sticky";
import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { loadTasksFromDB } from "../store/states/task";

function Dashboard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTasksFromDB());
  }, []);

  return (
    <main>
      <Nav />
      <div className="main-content position-relative">
        <Sticky />
        <div className="py-4 px-2 p-md-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
