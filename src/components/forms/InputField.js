import React from "react";

import createFragment from "react-addons-create-fragment";

import { setStateObjectProperty } from "cloak-state-util";

import { Label, Button } from "reactstrap";
/**
 * Props:
 * name: The name of the input field.
 * stateValue: The state for this particular value
 * setStateFunc: The function that updates the state for this particular value
 * inputType: The input type for this particular value
 * onChange: The function to call when the input is changed
 */

function InputField({
  name,
  stateValue,
  stateFields,
  setStateFields,
  inputType,
  currency,
  index,
  onArrayChange = (e, index) => {
    const updatedArray = [...stateValue];
    updatedArray[index] = e.target.value;
    setStateObjectProperty(stateFields, setStateFields, name, updatedArray);
  },
  onChange = (e) => {
    let value = e.target.value;
    if (value === "true" || value === "false") {
      if (value === "true") {
        value = true;
      }
      if (value === "false") {
        value = false;
      }
      value = !value; // Invert Value
    }

    setStateObjectProperty(stateFields, setStateFields, name, value);
  },
}) {
  const [isArray, setIsArray] = React.useState(false);

  React.useEffect(() => {
    if (Array.isArray(stateValue)) {
      setIsArray(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateFields, stateValue, index]);

  function handleArrayAddElement(event) {
    // setStateFields([...stateValue].push(""));

    const updatedArray = [...stateValue];

    updatedArray.push("");

    setStateObjectProperty(stateFields, setStateFields, name, updatedArray);
  }

  function handleArrayDeleteElement(event) {
    // setStateFields(stateValue.slice(0, stateValue.length - 1));

    if (stateValue.length <= 1) {
      return;
    }

    const updatedArray = [...stateValue];
    updatedArray.pop();

    setStateObjectProperty(stateFields, setStateFields, name, updatedArray);
  }

  return (
    <React.Fragment key={`${name}-${index}-main-fragment-combo`}>
      {isArray && isArray !== undefined && (
        <Label key={`${name}-${index}-array-label`} htmlFor={name}>
          {name}
          {currency !== undefined ? <> ({currency})</> : ""}
        </Label>
      )}
      {isArray &&
        isArray !== undefined &&
        stateFields[name].map((resource, index) => {
          const value = stateFields[name][index];

          return (
            <React.Fragment>
              {currency !== undefined ? currency : ""}
              <input
                id={name}
                key={`${name}-${index}-input`}
                value={
                  stateFields[name][index] ||
                  (typeof value === "boolean" ? false : "")
                }
                checked={
                  stateFields[name][index] ||
                  (typeof value === "boolean" ? false : "")
                }
                name={name}
                type={inputType}
                className="form-multi-input"
                onChange={(event) => {
                  onArrayChange(event, index);
                }}
                data-form-group={name}
              />

              {index === stateValue.length - 1 && (
                <div
                  key={`${name}-${index}-buttons-div`}
                  className="button-container"
                >
                  <Button
                    key={`${name}-${index}-add-button`}
                    color="success"
                    type="button"
                    onClick={handleArrayAddElement}
                  >
                    Add
                  </Button>
                  <Button
                    key={`${name}-${index}-delete-button`}
                    color="danger"
                    type="button"
                    onClick={handleArrayDeleteElement}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </React.Fragment>
          );
        })}
      {!isArray && isArray !== undefined && (
        <React.Fragment key={`${name}-${index}-label-input-combo`}>
          <Label key={`${name}-label`} htmlFor={name}>
            {name}
            {currency !== undefined ? <> ({currency})</> : ""}
          </Label>
          <input
            id={name}
            key={`${name}-input`}
            value={
              stateFields[name] ||
              (typeof stateFields[name] === "boolean" ? false : "")
            }
            checked={
              stateFields[name] ||
              (typeof stateFields[name] === "boolean" ? false : "")
            }
            name={name}
            type={inputType}
            onChange={onChange}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default InputField;
