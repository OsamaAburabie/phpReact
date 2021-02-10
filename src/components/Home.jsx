import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProductList from "./ProductList";

function Home() {
  const Logged = localStorage.getItem("isLogged");
  const history = useHistory();
  useEffect(() => {
    if (!Logged) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [Logged]);
  return (
    <div>
      <ProductList />
    </div>
  );
}

export default Home;
