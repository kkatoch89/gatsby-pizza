import { useState } from 'react';

const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // Check if its a number and convert
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }
    setValues({
      // Copy the existing values into it
      ...values,
      // Update the new values that changed
      [e.target.name]: value,
    });
  }
  return { values, updateValue };
};

export default useForm;
