import { FormEvent, useEffect, useState, useCallback } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import { Spinner, Modal } from "reactstrap";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store";
import { addToTasks, editATask } from "../store/states/task";
import { useSearchParams } from "react-router-dom";

function EditTask() {
  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const { loading, data } = useAppSelector((state) => state.task);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  useEffect(() => {
    const id = (searchParams.get("id") as any) * 1;
    if (id) {
      const task = data?.find((task) => task.id === id);
      if (task) {
        setDescription(task.description);
        setTitle(task.title);
      }
    }
  }, [searchParams, data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description.length < 10) {
      toast.error("Characters length for description must be greater than 10");
      return;
    }
    const id = (searchParams.get("id") as any) * 1;
    if (id) {
      dispatch(editATask({ description, title, id }));
      toast.success("Edit task succesfully!");
    } else {
      dispatch(addToTasks({ description, title }));
      toast.success("New task saved successfully!");
      setDescription("");
      setTitle("");
    }
    toggle();
  };

  return (
    <div className="pb-5 pb-md-0">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h5 className="mb-3">Title</h5>
          <input
            type="text"
            disabled={loading}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength={5}
            placeholder="Title of task here..."
            className="form-control py-2"
          />
        </div>
        <div className="form-group mt-3">
          <h5>Description</h5>
          <ReactQuill
            theme="snow"
            value={description}
            readOnly={loading}
            placeholder="Write task description here..."
            onChange={setDescription}
          />
        </div>
        <div className="text-end mt-4">
          <button
            disabled={loading}
            className="btn py-2 btn-primary px-5 rounded-0"
          >
            {loading ? <Spinner size="sm" className="me-2" /> : null}
            Save
          </button>
        </div>
      </form>
      <Modal isOpen={modal} toggle={toggle} centered>
        <div className="p-3 text-center">
          <h5 className="border-bottom pb-3">Whats Next?</h5>
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="btn btn-light w-100 border me-1">
              Go Home
            </Link>
            <button onClick={toggle} className="btn btn-light border w-100">
              Continue
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditTask;
