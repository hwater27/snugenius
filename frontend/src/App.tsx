import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages";
import Question from "./pages/question";
import QuestionInquiry from "./pages/question-inquiry";
import QuestionProgress from "./pages/question-progress";
import Faq from "./pages/faq";
import Requirement from "./pages/requirement";

function App() {
    return (
    //   <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="/question" element={<Question />} />
                    <Route path="/question/inquiry" element={<QuestionInquiry />} />
                    <Route path="/question/progress" element={<QuestionProgress />} />
                    <Route path="/requirement" element={<Requirement />} />
                    <Route path="/faq" element={<Faq />} />
                </Route>
            </Routes>
        </Router>
    //   </AuthProvider>
    );
}

export default App;