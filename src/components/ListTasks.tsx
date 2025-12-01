import { useEffect, useState } from "react";
import { toast } from "react-simple-toasts";

type ListTasksProps = {
  tarefaCriadaFlag: boolean;
  toggleTarefaCriadaFlag: Function;
};

type DeleteTaskProps = {
  quandoDeletaComSucesso: Function;
};

export function ListTasks(props: ListTasksProps) {
  const [tasks, setTasks] = useState([]);

  async function carregaTarefas() {
    const resposta = await fetch(
      "https://pacaro-tarefas.netlify.app/api/leo/tasks/"
    );
    const tarefas = await resposta.json();
    setTasks(tarefas);
  }

  useEffect(() => {
    carregaTarefas();
  }, []);

  useEffect(() => {
    if (props.tarefaCriadaFlag === true) {
      carregaTarefas();
      props.toggleTarefaCriadaFlag();
    }
  }, [props.tarefaCriadaFlag]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const listaTasks = tasks.map((task: any) => {
    return (
      <TarefaItem
        title={task.title}
        description={task.description}
        step={task.step}
        id= {task.id}
      />
    );
  });

  return <ul className="grid grid-cols-3 gap-8 m-8">{listaTasks}</ul>;
}

type TarefaItemProps = {
  title: string;
  description: string;
  step: string;
  id: number;
};

function Step(props: TarefaItemProps) {
  switch (props.step) {
    case "Em andamento":
      return (
        <img
          src="../../media/sinal3-2.png"
          alt="Em andamento"
          className=""
          title="Em andamento"
        />
      );
    case "Pronto":
      return (
        <img
          src="../../media/sinal3-3.png"
          alt="Pronto"
          className=""
          title="Pronto"
        />
      );
    case "Para fazer":
      return (
        <img
          src="../../media/sinal-1.svg"
          alt="Em espera"
          className=""
          title="Em espera"
        />
      );
    default:
      return <span className="text-gray-500 text-sm">{props.step}</span>;
  }
}

function EditarTarefa(props: any) {
  alert(props.id);
}

function ExcluirTarefa(props: any) {
  alert("Excluir Tarefa");

  async function quandoEnvia(event: any) {
    const resposta = await fetch(
      "https://pacaro-tarefas.netlify.app/api/leo/tasks/",
      {
        method: "DELETE",
      }
    );
    if (resposta.status === 200) {
      toast("Tarefa deletada com sucesso!");
    }
  }
}
function TarefaItem(props: TarefaItemProps) {
  return (
    <li className="bg-[#F3EFE8] rounded-lg box-border h-50 ml shadow-xl relative">
      <h1 className="bg-[#282E51] rounded-t-lg shadow-lg text-white pl-3 p-2">
        {props.title}
        <p className="size-6 inline-block  absolute right-20">
        <Step {...props} />
      </p>
        <img
          src="../../media/escrever.png"
          id="icon-editar"
          className="size-6 inline-block filter invert brightness-2 absolute right-11 hover:cursor-pointer"
          alt=""
          onClick={EditarTarefa}
        />
        <img
          src="../../media/lixeira.png"
          className="size-6 inline-block filter invert  absolute right-3 hover:cursor-pointer"
          alt=""
          onClick={ExcluirTarefa}
        />
      </h1>
      <p className="p-2">{props.description}</p>
      
    </li>
  );
}
