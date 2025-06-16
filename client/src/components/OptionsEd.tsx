import { FC } from 'react';


const OptionsEd:FC = () => {
  return (
    <>
    <option value="кв. см">кв. см</option>
    <option selected value="кв. м">кв. м</option>
    <option value="кв. км">кв. км</option>
    </>
  )
}

export default OptionsEd;