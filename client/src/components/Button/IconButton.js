import classNames from "classnames";
import styles from "./Button.module.scss";

const IconButton = ({
  icon,
  label,
  onClick,
  shape = "square",
  className,
  ...rest
}) => {
  const Icon = icon;
  return (
    <button
      onClick={onClick}
      className={classNames(styles.button, styles[shape], className)}
      {...rest}
    >
      <span className="visually-hidden">{label}</span>
      <Icon aria-hidden />
    </button>
  );
};

export default IconButton;
