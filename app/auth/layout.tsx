const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="h-[100vh] flex flex-col items-center justify-center bg-blue-400"
    >
      {children}
    </div>
  );
};

export default layout;
