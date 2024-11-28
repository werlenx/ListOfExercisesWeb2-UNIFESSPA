import styles from "../styles/Button.module.css";

interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
  onClick: () => void;
  size?: "small" | "medium" | "large";
  color?: string; 
  textColor?: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  type, 
  size = "medium", 
  color = "#876CF4", 
  textColor = "#FFFFFF",
  icon,
  iconPosition = "left" 
}) => {
  const sizeClass = styles[size] || styles.medium;
  const buttonStyle = { 
    backgroundColor: color, 
    color: textColor
  };

  return (
    <button 
      type={type} 
      className={`${styles.button} ${sizeClass}`} 
      onClick={onClick} 
      style={buttonStyle}
    >
      {icon && iconPosition === "left" && (
        <img 
          src={icon} 
          alt="icon" 
          className={styles.icon} 
        />
      )}
      {text}
      {icon && iconPosition === "right" && (
        <img 
          src={icon} 
          alt="icon" 
          className={styles.icon} 
        />
      )}
    </button>
  );
};

export default Button;
