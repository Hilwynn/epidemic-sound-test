import { useState } from "react";
import { Dialog } from "@reach/dialog";
import IconButton from "../Button/IconButton";
import Button from "../Button/Button";
import { kebabCase } from "../../utils/string";
import CloseSVG from "../Icons/CloseSVG";
import "@reach/dialog/styles.css";
import styles from "./PlaylistForm.module.scss";

function Form({ handler, initialValue = "", heading, label, hideLabel, icon }) {
  const [showDialog, setShowDialog] = useState(false);
  const [value, setValue] = useState(initialValue);

  const id = kebabCase(label);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handler(value);
    close();
  };

  return (
    <div>
      <IconButton icon={icon} label={heading} onClick={open} />

      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        className={styles.wrapper}
        aria-label={heading}
      >
        <IconButton
          icon={CloseSVG}
          label="Close"
          onClick={close}
          className={styles.closeButton}
        />
        <h1 className={styles.heading}>{heading}</h1>
        <form className={styles.form}>
          <div>
            <label htmlFor={id} className={hideLabel && "visually-hidden"}>
              {label}
            </label>
            <input id={id} onChange={handleChange} value={value} required />
          </div>
          <Button onClick={handleSubmit} label="Save" type="submit" />
        </form>
      </Dialog>
    </div>
  );
}

export default Form;
