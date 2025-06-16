import { FC, ReactNode } from 'react';
import "../sass/block.scss"

interface Props {
    children: ReactNode,
    width: string
}

const BlockComponent:FC<Props> = ({ children, width }) => {
  return (
    <div id='block' style={{ width }}>
       <span>
        {children}
       </span>
    </div>
  )
}

export default BlockComponent;