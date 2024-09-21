import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import AppRoutes from "./routes/AppRoutes";
import Notificacion from "./components/atoms/Notificacion";

library.add(fas);

function App() {
  return (
    <>
      <div className="App">
        <Notificacion/>
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
