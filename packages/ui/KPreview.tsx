interface IProps {
  srcDoc: string;
}

export const KPreview = (props: IProps) => {
  const { srcDoc } = props;
  return (
    <div style={{ height: '100%' }}>
      <iframe width="100%" height="100%" className="iframe" srcDoc={srcDoc} />
    </div>
  );
};