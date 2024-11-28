import styles from '../styles/BottomMenu.module.css';

const BottomMenu = () => {
  return (
    <div className={styles.bottomMenu}>
      <button className={styles.menuItem}>
        <img src="/location_profile.svg" alt="Local" className={styles.icon} />
      </button>
      <button className={styles.menuItem}>
        <img src="/profile.svg" alt="Perfil" className={styles.icon} />
      </button>
      <button className={styles.menuItem}>
        <img src="/home.svg" alt="Home" className={styles.icon} />
      </button>
      <button className={styles.menuItem}>
        <img src="/add_market.svg" alt="Loja" className={styles.icon} />
      </button>
      <button className={styles.menuItem}>
        <img src="/add.svg" alt="Adicionar" className={styles.icon} />
      </button>
    </div>
  );
};

export default BottomMenu;
