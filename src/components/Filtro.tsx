type FiltroProps = {
  filtroSelecionado: string;
  onFiltroChange: (filtro: string) => void;
};

export function Filtro({ filtroSelecionado, onFiltroChange }: FiltroProps) {
  return (
    <select
      className="ml-8 inline-block p-2 cursor-pointer border-2 border-slate-700 rounded-lg focus:border-[#8900D3] focus:outline-none"
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
