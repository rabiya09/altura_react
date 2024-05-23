import { FormEvent, useState } from "react";
import React from "react";
import classNames from "classnames";
import "./styles.scss";

interface Props extends React.HTMLProps<HTMLInputElement> {
  id: string;
  name: string;
  className?: string;
  label?: string;
  errorText?: string;
  emptyError?: string;
  invalidError?: string;
  pattern?: string;
}

const Input = ({ className, label, errorText, emptyError, invalidError, pattern, id, ...rest }: Props) => {
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [inputValue, setInputValue] = useState('');
   const onInvalid = (e: FormEvent) => { 
    const target = e.target as HTMLInputElement;
    if(!!!e.target && emptyError){
      setValidationMessage(emptyError);
    }else{
      setValidationMessage(target.validationMessage);
    }    
  };

  const onBlur = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    if (!!validationMessage) {
      setValidationMessage(target.validationMessage);
    }
  };

  const wrapperCn = classNames(className, 'wrapper');

  return (
    <div className={wrapperCn}>
      <div>
        {label && (
          <div className={'label'}>
            <label htmlFor={id}>{label}</label>
          </div>
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          className={`input ${!!validationMessage ? 'error' : ''}`}
          onInvalid={onInvalid}
          onBlur={onBlur}    
          {...rest}
        />
      </div>

      {!!validationMessage && (
        <div className={'validationMessage'}>
          {errorText || validationMessage}
        </div>
      )}
    </div>
  );
};

Input.displayName = "Input";

export default Input;
export type { Props };