import { store } from "./store";
import { Provider } from "react-redux";
import { Router } from "./components/Router";

const App = () => (
    <Provider store={store}>
        <Router />
    </Provider>
);

export default App;
