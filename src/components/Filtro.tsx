type FiltroProps = {
  filtroSelecionado: string;
  onFiltroChange: (filtro: string) => void;
};

export function Filtro({ filtroSelecionado, onFiltroChange }: FiltroProps) {
  return (
    <select
      className="ml-8 inline-block p-2 cursor-pointer border-3 border-[#AAA7A2] rounded-lg focus:border-[#282E51] focus:outline-none"
      value={filtroSelecionado}
      onChange={(e) => onFiltroChange(e.target.value)}
    >
      <option value="">Todos</option>
      <option value="Para fazer">Para fazer</option>
      <option value="Em andamento">Em andamento</option>
      <option value="Pronto">Pronto</option>
    </select>
  );
}
