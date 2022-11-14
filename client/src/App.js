import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import BookClass from "./pages/BookClass";
import { AuthProvider } from "./utils/auth";
import RequireAuth from "./components/RequireAuth";
import TutorInfo from "./components/TutorInfo";
const LazySearch = React.lazy(() => import("./components/SearchTutor"));

//Yian Chen
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/book" element={<BookClass />}>
        <Route path="tutors/:tutorId" element={<TutorInfo />} />
        </Route>
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        ></Route>
        <Route path="/bookclass" element={<BookClass />}></Route>
        {/* lazy loading source: https://www.youtube.com/watch?v=MJn4W7pR6RU&list=PLC3y8-rFHvwjkxt8TOteFdT_YmzwpBlrG&index=14 */}
        <Route
          path="/searchTutor"
          element={
            <React.Suspense fallback="Searching...">
              <LazySearch />
            </React.Suspense>
          }
        ></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
