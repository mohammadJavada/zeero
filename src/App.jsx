import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProjectsPage from "./components/pages/projects";
import TasksPage from "./components/pages/tasks";
import Template from "./components/template";
import NotFoundPage from "./components/pages/not-found";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<ProjectsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
