import classNames from "classnames";
import styles from "./Button.module.scss";

const IconButton = ({ label, onClick, shape = "pill", className, ...rest }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.button, styles[shape], className)}
      {...rest}
    >
      {label}
    </button>
  );
};

export default IconButton;
