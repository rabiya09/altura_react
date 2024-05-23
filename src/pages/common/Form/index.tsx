import { FormEvent, useState } from "react";
import React from "react";
import classNames from "classnames";
import "./styles.scss";

interface Props {
  action?: string;
  children: React.ReactNode;
  className?: string;
  onSubmit: (data: FormData) => void;
}

const Form = ({ action, children, className, onSubmit }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const isValid = formElement.checkValidity();

    formElement.classList.add('submitted');

    // focusing the first invalid field
    const firstInvalidField = formElement.querySelector(
      ":invalid"
    ) as HTMLInputElement;

    firstInvalidField?.focus();

    // submit the dataObject if isValid===true
    if (isValid) {
      const dataObject = new FormData(formElement);
      onSubmit(dataObject);
    }
  };

  return (
    <form
      action={action}
      onSubmit={handleSubmit}
      noValidate
      className={'form'}
    >
      <div className={'form-wrapper'}>{children}</div>
    </form>
  );
};

export default Form;