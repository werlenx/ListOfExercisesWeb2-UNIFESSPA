import React from "react";
import styles from "../styles/In.module.css";

// Usando interface para tipar as props do componente
interface InputProps {
  placeholder: string;
  value: string;
  type: string;
  id?: string;
  required?: boolean;
  pathImg: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const In: React.FC<InputProps> = ({ type, placeholder, value, id, required = false, onChange, pathImg}) => {
  return (
    <div className={styles.in_container}>
      {/* Ícone dentro de um div, com posição relativa */}
      {/* Input com padding extra para o ícone */}
      <div className={styles.img_container}>
        <img src={pathImg} alt="Email Icon" className={styles.img} />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id} // Passando o id como prop
        required={required} // Passando o required como prop
      >

      </input>
    </div>
  );
};

export default In;
