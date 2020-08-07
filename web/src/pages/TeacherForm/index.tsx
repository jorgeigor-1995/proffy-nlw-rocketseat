import React, { useState, FormEvent } from "react";
import { useHistory } from 'react-router-dom'
import PageHeader from "../../components/PageHeader";
import "./styles.css";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import warningIcon from "../../assets/images/icons/warning.svg";
import Select from "../../components/Select";
import api from "../../services/api";


function TeacherForm() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  const [bio, setBio] = useState("");
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });
    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost : Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro!');
    })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrivel que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></Textarea>
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Ciências", label: "Ciências" },
                { value: "Educacao fisica", label: "Educação fisica" },
                { value: "Fisica", label: "Física" },
                { value: "Geografio", label: "Geografio" },
                { value: "Portugues", label: "Portugues" },
                { value: "Matemática", label: "Matemática" },
                { value: "Quimica", label: "Quimica" },
              ]}
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              label="Matéria"
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>
              Hórarios disponiveis
              <button type="button" onClick={addNewScheduleItem}>
                {" "}
                * Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    value={scheduleItem.week_day}
                    options={[
                      { value: "0", label: "Domingo" },
                      { value: "1", label: "Segunda-feira" },
                      { value: "2", label: "Terça-feira" },
                      { value: "3", label: "Quarta-feira" },
                      { value: "4", label: "Quinta-feira" },
                      { value: "5", label: "Sexta-feira" },
                      { value: "6", label: "Sabado" },
                    ]}
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
                    name="week_day"
                    label="Dia da semana"
                  />
                  <Input
                    value={scheduleItem.from}
                    name="from"
                    label="Das"
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                  ></Input>
                  <Input
                    value={scheduleItem.to}
                    name="to"
                    label="Até"
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                  ></Input>
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
