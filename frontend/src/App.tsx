import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import AppRoutes from "./routes/AppRoutes";

library.add(fas);

function App() {
  return (
    <>
      <div className="App">
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
