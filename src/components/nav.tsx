import {
  faBolt,
  faCheckDouble,
  faListCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store";

function Nav() {
  const [stat, setStat] = useState({
    all: 0,
    completed: 0,
    active: 0,
  });
  const { data } = useAppSelector((state) => state.task);

  useEffect(() => {
    if (data) {
      const active = data?.filter((t) => t.category === "active").length;
      const completed = data.length - active;
      setStat({ active, completed, all: data.length });
    }
  }, [data]);

  return (
    <div className="main-nav border-end position-fixed py-2 py-md-3 shadow-sm z-index-2 bg-white">
      <div className="text-center mt-md-5 px-2 no-break">
        <Link to="/edit" className="btn btn-primary rounded-0 w-100">
          <span className="d-inline-block me-2">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <span className="d-inline-block me-1">New</span>
          <span className="d-none d-md-inline-block">Task</span>
        </Link>
      </div>
      <div className="mt-md-5 pe-3 pe-sm-5 pe-md-0 pt-md-5 d-flex d-md-block w-100 justify-content-around">
        <NavLink
          className={({ isActive }) =>
            `d-block p-2 nav-link nav-link-hover ${isActive ? "active" : ""}`
          }
          to="/"
        >
          <span className="d-inline-block mx-1 icon">
            <FontAwesomeIcon icon={faListCheck} />
          </span>
          <span className="d-none d-md-inline-block me-1">All Tasks</span>
          <span>({stat.all})</span>
        </NavLink>
        <NavLink
          to="/active"
          className={({ isActive }) =>
            `d-block p-2 my-md-2 nav-link nav-link-hover ${
              isActive ? "active" : ""
            }`
          }
        >
          <span className="d-inline-block mx-1 icon">
            <FontAwesomeIcon icon={faBolt} />
          </span>
          <span className="d-inline-block me-1 d-none d-md-inline-block">
            Active
          </span>
          <span>({stat.active})</span>
        </NavLink>
        <NavLink
          to="/completed"
          className={({ isActive }) =>
            `d-block p-2 nav-link nav-link-hover ${isActive ? "active" : ""}`
          }
        >
          <span className="d-inline-block mx-1 icon">
            <FontAwesomeIcon icon={faCheckDouble} />
          </span>
          <span className="d-inline-block me-1 d-none d-md-inline-block">
            Completed
          </span>
          <span>({stat.completed})</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
