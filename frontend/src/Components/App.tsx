import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const App = () => {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Dashboard/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                    </Routes>
                </div>
            </Router>
        </>
    );
};

export default App;
