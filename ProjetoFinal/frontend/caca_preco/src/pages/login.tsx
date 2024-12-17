"use client";

import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import In from "@/components/In";
import Button from "@/components/Button";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>(""); // Estado para armazenar erro

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Envia a requisição de login para a API
      const response = await fetch("http://localhost:3001/usuario/login", {  // Supondo que você tenha uma API de login
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha: password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard"; // Ou outra página de destino
      } else {
        const data = await response.json();
        setError(data.error || "Erro ao tentar fazer login");
      }
    } catch (err) {
      console.error("Erro de requisição:", err);
      setError("Erro de rede. Tente novamente.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login com Google");
    // Lógica para login com Google (integrar com OAuth)
  };

  return (
    <div className={styles.container}>
      <img src="login.svg" alt="" className="ico_login" />
      <h1 className={styles.title}>Bem-vindo!</h1>
      <p className={styles.subtitle}>Faça login para acessar</p>
      <p className={styles.description}>
        O PreçoMinimo tem o objetivo de levar o menor preço para o consumidor e incluir pequenos produtores no e-commerce.
      </p>

      {/* Exibição de erro de login */}
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.inputContainer}>
          <In
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor email"
            required
            pathImg="mail.svg"
          />
          
          <In
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            pathImg="key.svg"
          />
        </div>

        <Button 
          text="Entrar"
          type="submit" 
          size="large"
        />
      </form>

      <div className={styles.bnt_container}>
        <Button
          text="Entrar com Google"
          type="button"
          onClick={handleGoogleLogin}
          size="large"
          color="#F5D1F0"
          textColor="#000000"
          icon="google_ico.svg"
          iconPosition="left"
        />
        <p className={styles.recoverAccount}>
          <a href="/recover">Criar Conta</a>
        </p>
        <p className={styles.recoverAccount}>
          <a href="/recover">Recuperar conta</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
