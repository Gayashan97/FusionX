import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const InputField = ({ name, label, rules, handleOnChange, isDisabled = false, typeOfField="text" }) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input type={typeOfField} disabled={isDisabled} onChange={handleOnChange}/>
    </Form.Item>
  );
};

export default InputField;
