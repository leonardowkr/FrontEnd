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
    return <TarefaItem title={task.title} description={task.description} />;
  });

  return <ul className="grid grid-cols-3 gap-8 m-8">{listaTasks}</ul>;
}

type TarefaItemProps = {
  title: string;
  description: string;
};

function EditarTarefa (props: any){
  alert(props.id)
} 

function ExcluirTarefa (props: any){
  alert('Excluir Tarefa')
  
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
        <h1 className="bg-[#282E51] rounded-t-lg shadow-lg text-white pl-3 p-2">{props.title}
          <img src="../../media/sinal3.png" id="icon-editar" className="size-6 inline-block  absolute right-20" alt="" onClick={EditarTarefa}/>
           <img src="../../media/escrever.png" id="icon-editar" className="size-6 inline-block filter invert brightness-2 absolute right-11 hover:cursor-pointer" alt="" onClick={EditarTarefa}/>
          <img src="../../media/lixeira.png" className="size-6 inline-block filter invert  absolute right-3 hover:cursor-pointer" alt="" onClick={ExcluirTarefa} /></h1>
        <p className="p-2">{props.description}</p>
      
      
      </li>
  );
}

