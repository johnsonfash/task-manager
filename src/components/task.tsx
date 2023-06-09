import {
  faCheck,
  faEllipsis,
  faEye,
  faPen,
  faBolt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { TaskProp } from "../database";
import { useEffect, useState } from "react";
import html from "html-react-parser";
import { useAppDispatch, useAppSelector } from "../store";
import { completedATask, deleteATask } from "../store/states/task";

function Task({
  category = "all",
}: {
  category: "all" | "completed" | "active";
}) {
  const { data } = useAppSelector((state) => state.task);
  const [tasks, setTasks] = useState<TaskProp[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      if (category === "all") {
        setTasks(data);
      } else if (category === "active") {
        setTasks(data.filter((task) => task.category === "active"));
      } else {
        setTasks(data.filter((task) => task.category === "completed"));
      }
    }
  }, [category, data]);

  const setTaskToStatus = (id: number, status: "active" | "completed") => {
    dispatch(completedATask({ id, status }));
  };

  const deleteTask = (id: number) => {
    dispatch(deleteATask(id));
  };

  return (
    <div className="pb-3 pb-md-0">
      {tasks?.map((task, i) => (
        <div key={i} className="border-bottom mb-3 pb-3 task">
          <Link
            to={`/task/${task.id}`}
            className="text-dark d-block"
            title="click to view"
          >
            <h5 className="lh-1 one-line">{task.title}</h5>
            <div className="one-line">{html(task.description)}</div>
          </Link>
          <div className="d-flex mt-2 justify-content-between align-items-center">
            <div>
              <small>
                <em>{task.date}</em>
              </small>
            </div>
            <div>
              <UncontrolledDropdown>
                <DropdownToggle
                  outline
                  className="position-relative z-index-1 py-0"
                >
                  <span className="d-inline-block position-relative z-index-off-1">
                    <FontAwesomeIcon icon={faEllipsis} />
                  </span>
                </DropdownToggle>
                <DropdownMenu className="mt-1">
                  <DropdownItem className="text-primary">
                    <Link to={`/task/${task.id}`} className="d-block w-100">
                      <span className="d-inline-block icon">
                        <FontAwesomeIcon icon={faEye} />
                      </span>
                      View
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link
                      to={`/edit?id=${task.id}`}
                      className="text-dark d-block w-100"
                    >
                      <span className="d-inline-block icon">
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                      Edit
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setTaskToStatus(
                        task.id,
                        task.category === "completed" ? "active" : "completed"
                      )
                    }
                    className="text-success"
                  >
                    <span className="d-inline-block icon">
                      <FontAwesomeIcon
                        icon={task.category === "completed" ? faBolt : faCheck}
                      />
                    </span>
                    {task.category === "completed" ? "Active" : "Completed"}
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => deleteTask(task.id)}
                    className="text-danger"
                  >
                    <span className="d-inline-block icon">
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Task;
