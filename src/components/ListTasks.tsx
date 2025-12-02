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
  const dataObj = {
    title: title,
    description: description,
    step: step,
  };
  function EditTaskModal() {
    async function quandoEnvia(event: any) {
      event.preventDefault();

      if (!title.trim() || !description.trim()) {
        toast("Título e descrição são obrigatórios");
        return;
      }

      try {
        const resposta = await fetch(
          `https://pacaro-tarefas.netlify.app/api/leo/tasks/${props.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: title,
              description: description,
              step: step,
            }),
          }
        );

        if (resposta.ok) {
          toast("Tarefa atualizada com sucesso!");
          setEditTaskModalOpen(false);
          setTimeout(() => location.reload(), 300);
        } else {
          const erro = await resposta.text();
          console.error("Erro ao atualizar:", erro);
          toast("Erro ao atualizar tarefa");
        }
      } catch (error) {
        console.error(error);
        toast("Erro ao atualizar tarefa");
      }
    }

    return (
      <Modal
        isOpen={editTaskModalOpen}
        onRequestClose={() => setEditTaskModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            position: "relative",
            width: "90%",
            maxWidth: "500px",
            height: "auto",
            padding: "0",
            border: "none",
            borderRadius: "12px",
            inset: "auto",
          },
        }}
      >
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-[#282E51] text-white p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              ✏️ Editar Tarefa
            </h2>
          </div>
          <form onSubmit={quandoEnvia} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8900D3] transition-colors"
                placeholder="Digite o título"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8900D3] transition-colors resize-none"
                rows={4}
                placeholder="Digite a descrição"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={step}
                onChange={(event) => setStep(event.target.value as any)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8900D3] transition-colors"
              >
                <option value="Para fazer">Para fazer</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Pronto">Pronto</option>
              </select>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#8900D3] hover:bg-[#6f007f] text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg"
              >
                Salvar Alterações
              </button>
              <button
                type="button"
                onClick={() => setEditTaskModalOpen(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }

  async function editarTarefa() {
    setTitle(props.title);
    setDescription(props.description);
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
