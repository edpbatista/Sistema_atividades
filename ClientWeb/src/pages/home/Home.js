import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="containerHome">
      <div className="menu">
        <div className="logo">
          <Link>Sistema de atividades</Link>
        </div>
        <ul>
        <li>
            <Link to="/CadastroProduto">Produto</Link>
          </li>
        <li>
            <Link to="/CadastroCategoria">Categoria</Link>
          </li>
          <li>
            <Link to="/atividades">Atividade</Link>
          </li>
          <li>
            <Link to="/cadastroUsuario">Usuário</Link>
          </li>
          <li>
            <Link to="/">Sair</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

