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
    <div>
      <Nav />
      <div className="main-content position-relative">
        <Sticky />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
