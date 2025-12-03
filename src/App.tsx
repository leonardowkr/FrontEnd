import { useState } from "react";
import { ListTasks } from "./components/ListTasks";
import { CreateTask } from "./components/CreateTask";
import { Filtro } from "./components/Filtro";

export default function App() {
  const [tarefaCriadaFlag, setTarefaCriadaFlag] = useState(false);
  const [filtroSelecionado, setFiltroSelecionado] = useState("");

  return (
    <div>
      <CreateTask
        quandoEnviaComSucesso={() => {
          setTarefaCriadaFlag(true);
        }}
      />
      <Filtro
        filtroSelecionado={filtroSelecionado}
        onFiltroChange={setFiltroSelecionado}
      />
      <ListTasks
        tarefaCriadaFlag={tarefaCriadaFlag}
        toggleTarefaCriadaFlag={() => setTarefaCriadaFlag(false)}
        filtroSelecionado={filtroSelecionado}
      />
    </div>
  );
}
