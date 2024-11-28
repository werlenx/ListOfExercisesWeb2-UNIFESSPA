"use client"; // Necessário para usar hooks como useState no Next.js

import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import In from "@/components/In";
import Button from "@/components/Buttom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Senha:", password, "Usuário:", username);
    // Lógica de login vai aqui
  };

  const handleGoogleLogin = () => {
    console.log("Login com Google");
    // Lógica para login com Google
  };

  return (
    <div className={styles.container}>
      <div>
      </div>
        <img src="login.svg" alt="" className="ico_login"/>
        <h1 className={styles.title}>Bem vindo!</h1>
        <p className={styles.subtitle}>Faça login para acessar</p>
      <p className={styles.description}>
        O PreçoMinimo tem o objetivo de levar o menor preço para o consumidor e incluir pequenos produtores no e-commerce.
      </p>
      <form onSubmit={handleLogin} className={styles.form}>
        
        <div className={styles.inputContainer}>
          <In
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor email"
            required = {true}
            pathImg="mail.svg"
          />
          
          <In
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required = {true}
            pathImg="key.svg"
          />
          <In
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"
            required = {true}
            pathImg="user.svg"
          />
        </div>

        <Button 
          text="Criar conta"
          type="submit" 
          onClick={handleGoogleLogin}
          size="large"
        />
      </form>
      <div className={styles.bnt_container}>
        <Button
          text="Criar com Google"
          type="button"
          onClick={handleGoogleLogin}
          size="large"
          color= "#F5D1F0"
          textColor="#000000"
          icon="google_ico.svg"
          iconPosition="left"
        />

        <p className={styles.recoverAccount}>
          <a href="/recover">Recuperar conta</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
