import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51Rk1HKR7HgCgke5LN53In3Jw87yn2BprXRBvtTTyFpCSLgJw0SUWcWYx3Tvohsogd4yo1zHN6QH2knYigbWYvJVH00IIMqzMOG"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);
