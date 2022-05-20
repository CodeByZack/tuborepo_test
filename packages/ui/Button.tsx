import { PropsWithChildren } from 'react';
import { CSSProperties } from 'react';
interface IButtonProps {
  onClick?: () => void;
  style?: CSSProperties;
}

export const Button = (props: PropsWithChildren<IButtonProps>) => {
  const { onClick, style, children } = props;

  
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
};
