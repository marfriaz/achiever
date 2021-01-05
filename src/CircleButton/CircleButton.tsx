import React from "react";
import "./CircleButton.css";

interface myProps {
  children: React.ReactNode;
  className: string;
  tag: any;
  to?: string;
  type?: string;
  role?: string;
  onClick?: () => void;
}
export default function NavCircleButton(props: myProps) {
  const { className, children, ...otherProps } = props;

  return React.createElement(
    props.tag,
    {
      className: ["NavCircleButton", props.className].join(" "),
      ...otherProps,
    },

    children
  );
}
