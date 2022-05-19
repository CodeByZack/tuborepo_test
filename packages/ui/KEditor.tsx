import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';
interface IProps {
  onMount?: OnMount;
  onChange?: OnChange;
  defaultValue?: string;
}

export const KEditor = (props: IProps) => {
  const { onMount, onChange, defaultValue } = props;

  return (
    <div className="h-full">
      <MonacoEditor
        onMount={onMount}
        theme="vs-dark"
        onChange={onChange}
        defaultLanguage="javascript"
        defaultValue={defaultValue}
      />
    </div>
  );
};