import { useEffect, useState } from "react";

type ListTasksProps = {
  tarefaCriadaFlag: boolean;
  toggleTarefaCriadaFlag: Function;
};

export function ListTasks(props: ListTasksProps) {
  const [tasks, setTasks] = useState([]);

  async function carregaTarefas() {
    const resposta = await fetch(
      "https://pacaro-tarefas.netlify.app/api/duda/tasks"
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
    return <TarefaItem title={task.title} description={task.description} />;
  });

  return <ul className="grid grid-cols-3 gap-8 m-8">{listaTasks}</ul>;
}

type TarefaItemProps = {
  title: string;
  description: string;
};

function TarefaItem(props: TarefaItemProps) {
  return (
    <li className="bg-white rounded-lg box-border h-50 ml shadow-lg relative">
      <h1 className="bg-[#282E51] rounded-t-lg shadow-lg text-white p-2">{props.title}</h1>
      <p className="p-2">{props.description}</p>
      <button
        type="submit"
        className="bg-[#8900D3] p-2 rounded-b-lg text-white font-bold uppercase text-md shadow-xl  hover:cursor-pointer hover:bg-slate-700 absolute bottom-0 w-[100%]" 
      >Delete</button>
      
    </li>
  );
}
