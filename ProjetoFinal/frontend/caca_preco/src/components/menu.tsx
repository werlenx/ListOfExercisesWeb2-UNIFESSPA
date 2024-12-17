import React from 'react';
import styles from '../styles/menu.module.css';

const Menu = () => {
  return (
    <header className={styles.menu}>
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>
          Caça<span className={styles.highlight}>Preço</span>
        </h1>
      </div>

      <div className={styles.actionContainer}>
        <div className={styles.searchContainer}>
          <button className={styles.filterButton}>Filtrar</button>
          <input
            type="text"
            placeholder="Digite sua busca"
            className={styles.searchInput}
          />
        </div>
        
      </div>
    </header>
  );
};

export default Menu;
