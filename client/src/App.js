import React from "react";
import useRoutes from "./routes.js";
import "materialize-css";

const routes = useRoutes(false, false)

function App() {
  return (
    <div className="container">
      {routes}
    </div>
  )
}

export default App;