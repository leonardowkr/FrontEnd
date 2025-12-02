import { useEffect, useState } from "react";
import { toast } from "react-simple-toasts";
import Modal from "react-modal";

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
        id={task.id}
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
          src="/sinal3-2.png"
          alt="Em andamento"
          className=""
          title="Em andamento"
        />
      );
    case "Pronto":
      return (
        <img src="/sinal3-3.png" alt="Pronto" className="" title="Pronto" />
      );
    case "Para fazer":
      return (
        <img
          src="/sinal-1.svg"
          alt="Em espera"
          className=""
          title="Em espera"
        />
      );
    default:
      return <span className="text-gray-500 text-sm">{props.step}</span>;
  }
}

function TarefaItem(props: TarefaItemProps) {
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [step, setStep] = useState(props.step);
  function EditTaskModal() {
    
    async function quandoEnvia(event: any) {
      
      event.preventDefault();
      const resposta = await fetch(
      `https://pacaro-tarefas.netlify.app/api/leo/tasks/${props.id}`,{method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      title: title,
      description: description,
      step: step
  })})
      const tarefas = await resposta.json();
      const [tasks, setTasks] = useState([]);   
      setTasks(tarefas);
      setTitle(title);
      setDescription(description);
      //setEditTaskModalOpen(true)
      
      // fetch aqui
      
      setEditTaskModalOpen(false);
    }

    return (
      <Modal
        isOpen={editTaskModalOpen}
        onRequestClose={() => setEditTaskModalOpen(false)}
      >
        <form onSubmit={quandoEnvia}>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
           <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button type="submit" className="hover:cursor-pointer" onClick={()=> setEditTaskModalOpen(false)}>Editar</button>
        </form>
      </Modal>
    );
  }

  async function editarTarefa() {
    setEditTaskModalOpen(true);
  }

  async function excluirTarefa() {
    const resposta = await fetch(
      `https://pacaro-tarefas.netlify.app/api/leo/tasks/${props.id}`,
      {
        method: "DELETE",
      }
    );
    if (resposta.status === 200) {
      toast("Tarefa deletada com sucesso!");
      await new Promise((resolve) =>
        setTimeout(() => {
          location.reload();
          resolve(null);
        }, 1000)
      );
    }
  }

  return (
    <li className="bg-[#F3EFE8] rounded-lg box-border h-50 ml shadow-xl relative">
      <EditTaskModal />
      <h1 className="bg-[#282E51] rounded-t-lg shadow-lg text-white pl-3 p-2">
        {props.title}
        <p className="size-6 inline-block  absolute right-20">
          <Step {...props} />
        </p>
        <img
          src="/escrever.png"
          id="icon-editar"
          className="size-6 inline-block filter invert brightness-2 absolute right-11 hover:cursor-pointer"
          alt=""
          onClick={editarTarefa}
        />
        <img
          src="/lixeira.png"
          className="size-6 inline-block filter invert  absolute right-3 hover:cursor-pointer"
          alt=""
          onClick={excluirTarefa}
        />
      </h1>
      <p className="p-2">{props.description}</p>
    </li>
  );
}
