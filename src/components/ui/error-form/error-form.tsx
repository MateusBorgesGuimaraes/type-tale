type ErrorFormProps = {
  errorMessage: string;
};

export function ErrorForm({ errorMessage }: ErrorFormProps) {
  return <p className="text-red-500 text-xs font-medium">{errorMessage}</p>;
}
