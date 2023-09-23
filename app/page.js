"use client";
import React, { useState } from "react";

const page = () => {
  const [title, settitlte] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setmainTask] = useState([]);

  const submithandlers = (e) => {
    e.preventDefault();

    setmainTask([...mainTask, { title, desc }]);
    settitlte("");
    setdesc("");
    console.log(mainTask);
  };

  let deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setmainTask(copyTask);
  };

  let renderTask = <h2> No Task Avialable</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li className="flex items-center justify-between mb-5 p-5">
          <div className="flex item-center justify-between w-2/3">
            <h5 className="font-semibold text-2xl">{t.title}</h5>
            <h6 className="font-semibold text-xl">{t.desc}</h6>
          </div>
          <button
            onClick={() => {
              deleteHandler(i);
            }}
            className="bg-red-400 text-white px-4 py-2 rounded font-bold"
          >
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="bg-black text-white p-5 text-5xl font-bold text-center">
        My ToDo List
      </h1>
      <form onSubmit={submithandlers}>
        <input
          type="text"
          className="text-2xl border-zinc-600 border-4 m-4 px-4 py-2"
          placeholder="Enter your Task here"
          value={title}
          onChange={(e) => {
            settitlte(e.target.value);
          }}
        />
        <input
          type="text"
          className="text-2xl border-zinc-600 border-4 m-4 px-4 py-2"
          placeholder="Enter your Description here"
          value={desc}
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        />
        <button className="bg-black text-white px-4 py-2 font-sans font-bold ">
          Add Task
        </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default page;
