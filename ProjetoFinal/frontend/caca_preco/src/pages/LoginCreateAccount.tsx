"use client"; // Necessário para usar hooks como useState no Next.js

import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import In from "@/components/In";
import Button from "@/components/Button";

const LoginCreateAccount = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [address, setAddress] = useState({
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    console.log("Email:", email, "Senha:", password, "Usuário:", username, "Data de Nascimento:", birthDate, "Endereço:", address);
    // Lógica de cadastro vai aqui
  };

  const handleGoogleLogin = () => {
    console.log("Login com Google");
    // Lógica para login com Google
  };

  const handleAddressChange = (field: string, value: string) => {
    setAddress((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <div>
        <img src="login.svg" alt="" className="ico_login" />
        <h1 className={styles.title}>Bem-vindo!</h1>
        <p className={styles.subtitle}>Faça seu cadastro para acessar</p>
        <p className={styles.description}>
          O PreçoMinimo tem o objetivo de levar o menor preço para o consumidor e incluir pequenos produtores no e-commerce.
        </p>
      </div>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.inputContainer}>
          <In
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Como prefere ser chamado"
            required={true}
            pathImg="user.svg"
          />

          <In
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor email"
            required={true}
            pathImg="mail.svg"
          />

          <In
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required={true}
            pathImg="key.svg"
          />

          <In
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
            required={true}
            pathImg="key.svg"
          />

          {/* Data de Nascimento */}
          <div className={styles.input}>
            <label htmlFor="birthDate">Data de Nascimento</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          {/* Endereço Completo */}
          <div className={styles.addressFields}>
            <In
              type="text"
              id="street"
              value={address.street}
              onChange={(e) => handleAddressChange("street", e.target.value)}
              placeholder="Rua"
              required={true}
              pathImg="key.svg"
            />
            <In
              type="text"
              id="number"
              value={address.number}
              onChange={(e) => handleAddressChange("number", e.target.value)}
              placeholder="Número"
              required={true}
              pathImg="key.svg"
            />
            <In
              type="text"
              id="complement"
              value={address.complement}
              onChange={(e) => handleAddressChange("complement", e.target.value)}
              placeholder="Complemento"
              pathImg="key.svg"
            />
            <In
              type="text"
              id="city"
              value={address.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              placeholder="Cidade"
              required={true}
              pathImg="key.svg"
            />
            <In
              type="text"
              id="state"
              value={address.state}
              onChange={(e) => handleAddressChange("state", e.target.value)}
              placeholder="Estado"
              required={true}
              pathImg="key.svg"
            />
            <In
              type="text"
              id="zipCode"
              value={address.zipCode}
              onChange={(e) => handleAddressChange("zipCode", e.target.value)}
              placeholder="CEP"
              required={true}
              pathImg="key.svg"
            />
          </div>

          {/* Termos e condições */}
          <div className={styles.termsContainer}>
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label htmlFor="terms">Aceito os <a href="/terms" target="_blank">Termos e Condições</a></label>
          </div>
        </div>

        <Button 
          text="Criar Conta"
          type="submit" 
          size="large"
          // disabled={!termsAccepted}
        />
      </form>

      <div className={styles.bnt_container}>
        <Button
          text="Criar com Google"
          type="button"
          onClick={handleGoogleLogin}
          size="large"
          color="#F5D1F0"
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

export default LoginCreateAccount;
