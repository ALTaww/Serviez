import React, { FC } from "react";
import styles from "./component-container.module.scss";

interface IComponent extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const ComponentContainer: FC<IComponent> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={styles.component}>
      <div
        className={`container-body component-container${
          className ? " " + className : ""
        }`}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default ComponentContainer;
