import React from "react";
import "./AchieverForm.css";

interface myProps {
  children: React.ReactNode;
  onSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
}
export default function AchieverForm(props: myProps) {
  const { ...otherProps } = props;
  return <form className="Achiever-form" action="#" {...otherProps} />;
}
