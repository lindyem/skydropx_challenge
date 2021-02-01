import {Fragment} from "react"
import ShowsList from "./components/ShowList/index.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Fragment>
      <header>
        TV Show Database! 
      </header>
      <main>
        <Router>
          <Switch>
            <Route path="/show/:id" children={<ShowsList />} />
            <Route path="/" children={<ShowsList />}/>
          </Switch>
        </Router>
      </main>
    </Fragment>
  );
}

export default App;
