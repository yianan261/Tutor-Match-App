import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Landing from "./pages/Landing";
import Profile from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import NotFound from "./pages/NotFound";
import BookClass from "./pages/BookClass";
import { AuthProvider } from "./utils/auth";
// import RequireAuth from "./components/RequireAuth";
// import TutorInfo from "./components/TutorInfo";
import TutorProfile from "./components/TutorProfile";
const LazySearch = React.lazy(() => import("./components/SearchTutor"));
const LazySearch2 = React.lazy(() => import("./components/TutorInfo"));

//Yian Chen
function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/book" element={<BookClass />}>
          <Route path=":subject" element={<TutorProfile />} />
          <Route
            path=":tutorId"
            element={
              <React.Suspense fallback="Searching...">
                <LazySearch2 />
              </React.Suspense>
            }
          />
        </Route>
        <Route
          path="/profile"
          element={
            // <RequireAuth>
              <Profile />
            // </RequireAuth>
          }
        ></Route>
        <Route
          path="/profile/editProfile"
          element={
            // <RequireAuth>
              <EditProfilePage />
            // </RequireAuth>
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
        <Route path="/" element={<Landing />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
