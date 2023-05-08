import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useAppSelector} from "./hooks/hooks";
import "./App.css";

// components
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoute from "./ProtectedRoute";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Settings from "./pages/Settings";
import UserReadingListView from "./pages/UserReadingListView";
import WelcomeView from "./pages/WelcomeView";
import NewUserRedirect from "./components/NewUserRedirect/NewUserRedirect";

function App() {
    const userIsAuthenticated = useAppSelector(
        (state) => state.auth.user !== undefined
    );
    const isNewUser = useAppSelector(state => state.auth.user)

    return (
        <div>
            <BrowserRouter>
                <NewUserRedirect/>

                <Navbar/>
                <Sidebar/>
                <ToastContainer position="top-center"/>

                <Switch>
                    <ProtectedRoute exact path="/welcome">
                        <WelcomeView/>
                    </ProtectedRoute>

                    <Route exact path="/">
                        <Redirect to="/books"/>
                    </Route>
                    <Route exact path="/books">
                        <Books/>
                    </Route>
                    <Route exact path="/book/:id">
                        <Book/>
                    </Route>
                    <Route exact path="/login">
                        {userIsAuthenticated ? <Redirect to="/books"/> : <Login/>}
                    </Route>
                    <Route exact path="/signup">
                        {userIsAuthenticated ? <Redirect to="/books"/> : <Signup/>}
                    </Route>
                    <Route exact path="/:username/reading-list">
                        <UserReadingListView/>
                    </Route>
                    <ProtectedRoute exact path="/settings">
                        {isNewUser ? <Redirect to="/welcome"/> : <Settings/>}
                    </ProtectedRoute>

                    {/*<Route path="/*" component={ErrorPage} />*/}
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
