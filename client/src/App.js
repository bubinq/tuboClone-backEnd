import "./App.scss";
import { Routes, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Results } from "./pages/Results";
import { PrivateGuard } from "./guards/PrivateGuard";
import { CreateVideo } from "./pages/CreateVideo";
import { Subscriptions } from "./pages/Subscriptions";
import { Trending } from "./pages/Trending";
import { VideoDisplay } from "./pages/VideoDisplay";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/results" element={<Results />}></Route>
          <Route path="/trending" element={<Trending />}></Route>
          <Route path="/watch/:videoId" element={<VideoDisplay />}></Route>
          <Route element={<PrivateGuard />}>
            <Route path="/create" element={<CreateVideo />}></Route>
            <Route path="/subs" element={<Subscriptions />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
