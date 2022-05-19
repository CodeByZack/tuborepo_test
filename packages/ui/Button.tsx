import { CSSProperties } from 'react';
interface IButtonProps {
  onClick?: () => void;
  style?: CSSProperties;
  text: string;
}

export const Button = (props: IButtonProps) => {
  const { onClick, style, text } = props;

  
  return (
    <button style={style} onClick={onClick}>
      {text}
    </button>
  );
};
