import React from "react";
import styles from "../styles/CardProduct.module.css";

interface CardProductProps {
  pathImg: string;
  name: string;
  description: string;
  price: string;
  starRank: number;
  verifiedCount: number;
  location: string;
}

const CardProduct: React.FC<CardProductProps> = ({
  pathImg,
  name,
  description,
  price,
  starRank,
  verifiedCount,
  location,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.productInfo}>
        <img src={pathImg} alt={name} className={styles.productImage} />
        <div className={styles.details}>
          <h2 className={styles.productTitle}>
            <img src="market.svg" alt={name} className={styles.marketIcon} />
            {name}
          </h2>
          <p className={styles.productDescription}>{description}</p>
          <p className={styles.productPrice}>{price}</p>
        </div>
      </div>
      <div className={styles.cardProductFooter}>
        <p>
          <img src="star.svg" alt="Rating" className={styles.icon} /> {starRank}
        </p>
        <p>
          <img src="verified.svg" alt="Verified" className={styles.icon} />
          Verificado ({verifiedCount})
        </p>
        <p>
          <img src="location.svg" alt="Location" className={styles.icon} />
          {location}
        </p>
      </div>
    </div>
  );
};

export default CardProduct;
