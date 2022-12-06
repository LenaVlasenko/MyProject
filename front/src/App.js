// import 'react-toastify/dist/ReactToastify.css';

import {BrowserRouter} from "react-router-dom";
import MyRoutes from "./MyRoutes";
import {ToastContainer} from "react-toastify";
import FooterPage from "./pages/FooterPage";

function App() {
  return (
    <>
      <BrowserRouter>

        {/*<Navigation></Navigation>*/}
        <div className="out conteiner-fluid">
          <div className="inner">
            <MyRoutes></MyRoutes>
          </div>
        </div>
      </BrowserRouter>

      <ToastContainer />

      <FooterPage></FooterPage>
    </>
  );
}

export default App;
