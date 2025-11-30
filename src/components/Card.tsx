type CardProps = {
  children: any;
};

export function Card(props: CardProps) {
  return (
    <div className="bg-[#F3EFE8] p-3 rounded-lg border-4 border-black/30 shadow-xl mb-2 w-[80%] m-auto">{props.children}</div>
  );
}
