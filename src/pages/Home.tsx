import React from "react";
import { CreateServiceForm } from "../components";

const Home = () => {
  return (
    <div className="page home-page">
      <div className="main-view">
        <h1>
          Serv<span className="hidden-letter">ing </span>i
          <span className="hidden-letter">s </span>ez
        </h1>
        <h3>Услуги - это легко!</h3>
      </div>
      <div className="info-view">
        <h2>О нас</h2>
        <CreateServiceForm />
      </div>
      <div className="action-view"></div>
    </div>
  );
};

export default Home;
