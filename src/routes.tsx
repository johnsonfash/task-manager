import { Routes, Route } from "react-router-dom";
import Page404 from "./pages/page404";
import EditTask from "./pages/edit";
import Dashboard from "./components/dashboard";
import Task from "./components/task";
import ViewTask from "./pages/view";

function Router() {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route index element={<Task category="all" />} />
        <Route path="/active" element={<Task category="active" />} />
        <Route path="/completed" element={<Task category="completed" />} />
        <Route path="/edit" element={<EditTask />} />
        <Route path="/task/:id" element={<ViewTask />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default Router;
