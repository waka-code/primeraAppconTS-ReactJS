import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";
import { FcAddDatabase, FcSurvey } from "react-icons/fc";
import { AiFillDelete } from "react-icons/ai";
import "./App.css";
import styled from "styled-components";
import uuid from "react-uuid";
import { interfacTarea, htmlElement } from "./interface/InterfacTarea";

function App(): JSX.Element {
  const [tarea, setTarea] = useState<string>("");
  const [viewTarea, setViewTarea] = useState<interfacTarea[]>([]);

  const handleSubmit = (e: htmlElement) => {
    e.preventDefault();
    addTarea(tarea);
    setTarea("");
   };

  const addTarea = (name: string) => {
    const nuevaTarea: interfacTarea[] = [
      ...viewTarea,
      { name, id: uuid(), done: false },
    ];
    setViewTarea(nuevaTarea);
  };

  const dltTask = (dltname: string) => {
    setViewTarea(viewTarea.filter((dlttarea) => dlttarea.id != dltname));
  };
  return (
    <TaskCss>
      <form className="App" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTarea(e.target.value)}
          value={tarea}
          required
        />
        <button>
          <FcAddDatabase style={{ fontSize: "4vh" }} />
        </button>
      </form>
      <hr />
      {viewTarea.map((tareas: interfacTarea) => {
        return (
          <ul key={tareas.id}>
            <li style={{ display: "flex", alignItems: "center" }}>
              {" "}
              <FcSurvey style={{ fontSize: "4vh" }} />
              {tareas.name}
            </li>
            <AiFillDelete
              className="dlt"
              style={{ cursor: "pointer" }}
              onClick={() => dltTask(tareas.id)}
            />
          </ul>
        );
      })}
    </TaskCss>
  );
}

const TaskCss = styled.div`
  user-select: none;
  height: auto;
  width: 50%;
  margin: auto;
  overflow: hidden;
  ul {
    width: 80%;
    margin: 5px auto;
    height: 5vh;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    li {
      font-size: 20px;
    }
    .dlt:hover {
      font-size: 25px;
    }
  }
  form {
    height: auto;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 50vh;
      border-radius: 5px;
      border: none;
      outline: none;
      background-color: #e0e1e2;
      padding: 10px;
      font-size: 20px;
    }
    button {
      width: 10vh;
      height: 6vh;
      border-radius: 5px;
      border: none;
      margin: 0 15px;
    }
    button:hover {
      background-color: #17676f;
      cursor: pointer;
    }
  }
`;

export default App;
