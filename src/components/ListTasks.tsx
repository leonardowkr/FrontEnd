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

function EditarTarefa (){
  alert('Editar Tarefa')
} 

function ExcluirTarefa (){
  alert('Excluir Tarefa')
} 

function TarefaItem(props: TarefaItemProps) {
  return (
    <li className="bg-[#F3EFE8] rounded-lg box-border h-50 ml shadow-xl relative">
      <h1 className="bg-[#282E51] rounded-t-lg shadow-lg text-white pl-3 p-2">{props.title}
         <img src="../../media/escrever.png" id="icon-editar" className="size-6 inline-block filter invert brightness-2 absolute right-11 hover:cursor-pointer" alt="" onClick={EditarTarefa}/>
        <img src="../../media/lixeira.png" className="size-6 inline-block filter invert  absolute right-3 hover:cursor-pointer" alt="" onClick={ExcluirTarefa} /></h1>
      <p className="p-2">{props.description}</p>
      
      
    </li>
  );
}

