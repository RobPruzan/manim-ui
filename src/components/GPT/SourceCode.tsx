type Props = {
  sourceCode: string | undefined;
};

const SourceCode = ({ sourceCode }: Props) => {
  return sourceCode ? (
    <>
      <p className="text-3xl font-bold text-white">Source Code</p>
      <textarea
        contentEditable={false}
        value={sourceCode}
        className="m-2 h-1/4 w-3/4 rounded-lg bg-zinc-800 p-2 text-white outline-none"
      />
    </>
  ) : null;
};

export default SourceCode;
