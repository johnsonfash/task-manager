import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TaskProp } from "../database";
import { useAppSelector } from "../store";
import html from "html-react-parser";

function ViewTask() {
  const { id } = useParams();
  const [task, setTask] = useState<TaskProp>();
  const { data } = useAppSelector((state) => state.task);

  useEffect(() => {
    if (data && Number(id)) {
      setTask(data.find((task) => task.id == Number(id)));
    }
  }, [data]);

  return (
    <div className="pb-5 pb-md-0">
      <h2 className="bg-white mb-0 border-bottom py-3 sticky-top">
        {task?.title}
      </h2>
      <div className="mt-4">{html(task?.description ?? "")}</div>
    </div>
  );
}

export default ViewTask;
