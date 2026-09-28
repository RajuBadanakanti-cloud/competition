import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CompetitionDetails from "./pages/CompetitionDetails";
import Competitions from "./pages/Competitions";
import MyCompetitions from "./pages/MyCompetitions";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">

        <Navbar />

        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <div className="flex min-h-[80vh] items-center justify-center px-4">
                <div className="text-center">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Welcome to{" "}
                    <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                      Feedants
                    </span>
                  </h1>

                  <p className="mx-auto mt-4 max-w-xl text-slate-500">
                    Discover competitions, participate, and showcase your
                    skills.
                  </p>
                </div>
              </div>
            }
          />
          <Route path="/competitions" element={<Competitions />} /> { /* competitions  */}
          {/* Competition Details */}
          <Route
            path="/competition/:id"
            element={<CompetitionDetails />}
          />

          <Route
            path="/my-competitions"
            element={<MyCompetitions />}
          />

          {/* Profile  */}
          
          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="flex min-h-[80vh] items-center justify-center">
                <h1 className="text-2xl font-bold text-slate-800">
                  Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>

      </div>
    </BrowserRouter>
  );
};

export default App;