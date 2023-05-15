import { Route, Routes } from "react-router-dom";
import HomeScreen from "../screens/App/Home";

const Navigator = () => (
  <Routes>
    <Route path="/" element={<HomeScreen />} />
  </Routes>
);

export default Navigator;
