export const buttonAnimation = (e: React.MouseEvent<HTMLButtonElement>, setPosition: Function) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  setPosition({ x, y });
  setTimeout(() => {
    setPosition(null);
  }, 500);
}
