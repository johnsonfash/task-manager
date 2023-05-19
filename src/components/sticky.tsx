import { faSearch, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Modal } from "reactstrap";
import { FormHandler } from "../utils/form";
import { useAppSelector } from "../store";
import html from "html-react-parser";
import { TaskProp, findTask } from "../database";

function Sticky() {
  const [searchModal, setSearchModal] = useState(false);
  const [searchValues, setSearchValues] = useState<TaskProp[] | null>(null);
  const { data } = useAppSelector((state) => state.task);
  const route = useNavigate();

  const toggle = useCallback(() => {
    setSearchModal(!searchModal);
    setSearchValues(null);
  }, [searchModal]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const { searchText } = FormHandler(e, ["searchText"]);
    if (searchText) {
      setSearchValues(findTask(searchText, data));
    } else {
      setSearchValues(null);
    }
  };

  const routeTo = (id: number) => {
    route(`/task/${id}`);
    toggle();
  };

  return (
    <div className="sticky-top bg-white px-4 py-3 border-bottom shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/" className="text-dark d-block h2">
          Task Manager
        </Link>
        <button className="btn btn-ligh btn-outline-secondary" onClick={toggle}>
          <span className="d-inline-block me-2">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <span>Search</span>
        </button>
      </div>
      <Modal
        contentClassName="rounded-1"
        isOpen={searchModal}
        modalClassName="search-background"
        toggle={toggle}
        centered
        fullscreen="md"
      >
        <div>
          <div className="sticky-top bg-white bg">
            <div className="border-bottom p-3 mb-0 d-flex align-items-center justify-content-between">
              <h4 className="my-1">Search</h4>
              <button onClick={toggle} className="btn p-0">
                <FontAwesomeIcon icon={faXmarkCircle} className="display-7" />
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="d-flex align-items-center p-3 shadow-sm border-bottom"
            >
              <input
                name="searchText"
                placeholder="search task here"
                type="text"
                className="form-control me-1"
              />
              <button type="submit" className="btn btn-primary">
                <span>
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </button>
            </form>
          </div>
          <div className="">
            <div className="search-list px-3 pt-3">
              {searchValues === null ? (
                <Alert>Search result will be here!</Alert>
              ) : searchValues?.length ? (
                searchValues?.map((task, i) => (
                  <div
                    // to={`/task/${task.id}`}
                    onClick={() => routeTo(task.id)}
                    key={i}
                    className="py-2 d-block text-dark border-bottom nav-link-hover"
                  >
                    <h5 className="my-0 one-line">{task.title}</h5>
                    <p className="one-line mt-0 mb-1">
                      {html(task.description)}
                    </p>
                    <small>
                      <em>{task.date}</em>
                    </small>
                  </div>
                ))
              ) : (
                <Alert color="danger">No tasks match your search!</Alert>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Sticky;
