interface IButtonProps {
  onClick?: () => void;
}

export const Button = (props: IButtonProps) => {
  const { onClick } = props;

  return <button onClick={onClick}>Boop</button>;
};
