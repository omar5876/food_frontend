import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateRecipe from "./pages/CreateRecipe";
import DetailRecipe from "./pages/DetailRecipe";
import Home from "./pages/Home";
import InitialPage from "./pages/InitialPage";
import LandingPage from "./pages/LandingPage";
import UpadateRecipe from "./pages/UpdateRecipe";

function App() {
  return (
    <BrowserRouter>
      <LandingPage>
        <Switch>
          <Route exact path={'/'}>
            <InitialPage/>
            </Route>
          <Route exact path={'/Home'}>
            <Navbar/>
            <Home/>
          </Route>
          <Route exact path={'/Details/:id'}>
            <Navbar/>
            <DetailRecipe/>
          </Route>
          <Route exact path={'/Create'}>
            <Navbar/>
            <CreateRecipe/>
          </Route>
          <Route exact path={'/Update/:id'}>
            <Navbar/>
            <UpadateRecipe/>
          </Route>
        </Switch>
      </LandingPage>
    </BrowserRouter>
  );
}

export default App;
