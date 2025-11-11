import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages";

function App() {
    return (
    //   <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                </Route>
            </Routes>
        </Router>
    //   </AuthProvider>
    );
}

export default App;