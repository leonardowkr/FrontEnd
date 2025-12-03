import { useState } from "react";
import { Card } from "./Card";
import { toast } from "react-simple-toasts";

type Step = "Para fazer" | "Em andamento" | "Pronto";

type CreateTaskProps = {
  quandoEnviaComSucesso: Function;
};

export function CreateTask(props: CreateTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState<Step>("Para fazer");

  async function quandoEnvia(event: any) {
    event.preventDefault();

    if (title.length < 4) {
      toast("O título precisa ter pelo menos 4 caracteres!");
      return;
    }

    if (title.length > 16) {
      toast("O título precisa ter no máximo 16 caracteres!");
      return;
    }

    if (description.length < 8) {
      toast("A descrição precisa ter pelo menos 8 caracteres!");
      return;
    }

    if (description.length > 64) {
      toast("A descrição precisa ter no máximo 64 caracteres!");
      return;
    }

    const dataObj = {
      title: title,
      description: description,
      step: step,
    };
    const resposta = await fetch(
      "https://pacaro-tarefas.netlify.app/api/leo/tasks",
      {
        method: "POST",
        body: JSON.stringify(dataObj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resposta.status === 201) {
      setTitle("");
      setDescription("");
      setStep("Para fazer");
      toast("Tarefa criada com sucesso!");
      props.quandoEnviaComSucesso();
    } else {
      toast(
        "Houve um erro desconhecido do submundo do mal supremo ao enviar a sua tarefa"
      );
    }

    toast("foi enviado!");
  }

  return (
    <div className="mr-8 ml-8 mt-8 mb-4">
      <Card>
        <h2 className="text-center text-2xl font-extrabold mb-2 text-shadow-sm">
          Criar tarefa
        </h2>
        <form className="flex flex-col gap-2" onSubmit={quandoEnvia}>
          <input
            type="text"
            placeholder="Digite o título da tarefa"
            className="border-2 border-slate-700 rounded-lg p-2 outline-none focus:border-[#8900D3]"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Digite a descrição da tarefa"
            className="border-2 border-slate-700 rounded-lg p-2 outline-none focus:border-[#8900D3] resize-none"
          ></textarea>
          <div className="flex gap-10 justify-center mb-3 mt-3">
            <div className="flex flex-col justify-center items-center">
              <label
                htmlFor="step-em-andamento"
                className={`border-3 border-[#AAA7A2] w-25 h-14 flex items-center justify-center rounded transition-colors ${
                  step === "Para fazer" ? "bg-[#FF9B00] text-black" : "bg-white"
                }`}
              >
                Para fazer
              </label>
              <input
                type="radio"
                id="step-em-andamento"
                name="step-tarefa"
                className="hidden border-2"
                checked={step === "Para fazer"}
                onChange={() => setStep("Para fazer")}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="step-andamento"
                className={`border-3 border-[#AAA7A2] w-25 h-14 text-center flex items-center justify-center rounded transition-colors ${
                  step === "Em andamento"
                    ? "bg-[#2BBCE3] text-black"
                    : "bg-white"
                }`}
              >
                Em andamento
              </label>
              <input
                type="radio"
                id="step-andamento"
                name="step-tarefa"
                className="hidden"
                checked={step === "Em andamento"}
                onChange={() => setStep("Em andamento")}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="step-pronto"
                className={`border-3 border-[#AAA7A2] w-25 h-14 flex items-center justify-center rounded transition-colors ${
                  step === "Pronto" ? "bg-green-500 text-black" : "bg-white"
                }`}
              >
                Pronto
              </label>
              <input
                type="radio"
                id="step-pronto"
                className="hidden"
                name="step-tarefa"
                checked={step === "Pronto"}
                onChange={() => setStep("Pronto")}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#282E51] p-3 rounded-lg text-white font-extrabold uppercase text-lg shadow-xl hover:cursor-pointer hover:bg-slate-700 mb-5"
          >
            Enviar
          </button>
        </form>
      </Card>
    </div>
  );
}
