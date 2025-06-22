import React, { FC } from 'react';


const OptionsMouthComponent: FC = () => {
  const defaultValue = localStorage.getItem('mouth') || ''


  const options = [
    { value: "января", label: "Январь" },
    { value: "февраля", label: "Февраль" },
    { value: "марта", label: "Март" },
    { value: "апреля", label: "Апрель" },
    { value: "мая", label: "Май" },
    { value: "июня", label: "Июнь" },
    { value: "июля", label: "Июль" },
    { value: "августа", label: "Август" },
    { value: "сентября", label: "Сентябрь" },
    { value: "октября", label: "Октябрь" },
    { value: "ноября", label: "Ноябрь" },
    { value: "декабря", label: "Декабрь" },
  ];

  return (
    <>
      {options.map((option, index) => (
        <option
          key={index}
          value={option.value}
          selected={option.value === defaultValue}
        >
          {option.label}
        </option>
      ))}
    </>
  );
};

export default OptionsMouthComponent;