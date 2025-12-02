import { useState } from "react";

export function Filtro() {
  const [mostraOpcoes, setMostraOpcoes] = useState(false);

  function toggleOpcoes() {
    setMostraOpcoes(!mostraOpcoes);
  }

  return (
    <select className="ml-8 inline-blockblock bsolute p-2 cursor-pointer " onClick={toggleOpcoes}>
    <option onSelect={}>Todos</option>
    <option >Em espera</option>
    <option >Em andamento</option>    
    <option >Pronto</option>
    </select>
  );
}
