import React from 'react';
import styles from '../styles/menu.module.css';

const Menu = () => {
  return (
    <header className={styles.menu}>
      {/* Logo e Nome */}
      <div className={styles.logoContainer}>
        <button className={styles.menuButton}>
          {/* Ícone do menu hambúrguer */}
          <span className={styles.icon}>☰</span>
        </button>
        <h1 className={styles.logo}>
          Caça<span className={styles.highlight}>Preço</span>
        </h1>
      </div>

      {/* Perfil e Busca */}
      <div className={styles.actionContainer}>
        {/* Campo de busca */}
        <div className={styles.searchContainer}>
          <button className={styles.filterButton}>Filtrar</button>
          <input
            type="text"
            placeholder="Digite sua busca"
            className={styles.searchInput}
          />
        </div>
        {/* Perfil */}
        <div className={styles.profile}>
          <span className={styles.profileIcon}>👤</span>
          <span className={styles.profileName}>Fulano</span>
        </div>
      </div>
    </header>
  );
};

export default Menu;
