import { useState } from "react";
import { ListTasks } from "./components/ListTasks";
import { CreateTask } from "./components/CreateTask";

export default function App() {
  const [tarefaCriadaFlag, setTarefaCriadaFlag] = useState(false);

  return (
    <div>
      <CreateTask
        quandoEnviaComSucesso={() => {
          setTarefaCriadaFlag(true);
        }}
      />
      <ListTasks
        tarefaCriadaFlag={tarefaCriadaFlag}
        toggleTarefaCriadaFlag={() => setTarefaCriadaFlag(false)}
      />
    </div>
  );
}
