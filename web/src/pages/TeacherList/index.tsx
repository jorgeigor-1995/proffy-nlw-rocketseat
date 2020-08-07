import React, { useState, FormEvent, useEffect } from "react";
import "./styles.css";
import PageHeader from "../../components/PageHeader";
import TeacherItem, {Teacher} from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

function TeacherList() {
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  const [teachers, setteachers] = useState([]);

  async function searchTeachers(e: FormEvent){
    e.preventDefault();
    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time
      }
    })
    setteachers(response.data);
  }

  useEffect(()=> {

  }, [ subject, week_day, time]);
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponiveis">
        <form id="search-teachers" onSubmit={searchTeachers}>
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
            label="Matéria"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <Select
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sabado" },
            ]}
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>
      <main>
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem key={teacher.id} teacher={teacher}  />
          );
        })}
      </main>
    </div>
  );
}

export default TeacherList;
