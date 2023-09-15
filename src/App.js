import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component.js";
import Navigation from "./routes/navigation/navigation.component.js";
import Authentication from "./routes/authentication/authentication.component.js";

const Shop = () => {
  return (
    <div>
      <h1>This is the shop page!</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;

// const categories = [
//   {
//     id: 1,
//     title: "hats",
//     imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
//   },
//   {
//     id: 2,
//     title: "jackets",
//     imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
//   },
//   {
//     id: 3,
//     title: "sneakers",
//     imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
//   },
//   {
//     id: 4,
//     title: "womens",
//     imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
//   },
//   {
//     id: 5,
//     title: "mens",
//     imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
//   },
// ];
// return <Directory categories={categories} />;
