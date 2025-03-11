const Typography = ({ variant = "p", children }) => {
  const baseStyles = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-medium",
    h4: "text-xl font-medium",
    p: "text-base",
    span: "text-sm",
  };

  return <p className={`${baseStyles[variant]}`}>{children}</p>;
};

export default Typography;
