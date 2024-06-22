// src/components/SubActivity.tsx
import React, { useState } from "react";
import { SubActivity as SubActivityType } from "../types";
import { MdEdit, MdDelete } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { GiProgression } from "react-icons/gi";
import { Label } from "./../../ui/Label/Label";
import NumberSlider from "../../ui/Input/NumberSlider";
import { TfiSave } from "react-icons/tfi";

interface SubActivityProps {
  subActivity: SubActivityType;
  updateSubActivity: (subActivity: SubActivityType) => void;
  deleteSubActivity: (id: number) => void;
}

export const SubActivity: React.FC<SubActivityProps> = ({
  subActivity,
  updateSubActivity,
  deleteSubActivity,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(subActivity.title);
  const [description, setDescription] = useState(subActivity.description);
  const [startDate, setStartDate] = useState(subActivity.startDate);
  const [endDate, setEndDate] = useState(subActivity.endDate);
  const [hours, setHours] = useState(subActivity.hours);
  const [progress, setProgress] = useState(subActivity.progress);

  const InicioDate = new Date(subActivity.startDate);

  const FinDate = new Date(subActivity.endDate);

  const InicioDateAdjusted = new Date(InicioDate.getTime());
  InicioDateAdjusted.setDate(InicioDateAdjusted.getDate() + 1);

  const FinDateAdjusted = new Date(FinDate.getTime());
  FinDateAdjusted.setDate(FinDateAdjusted.getDate() + 1);

  // Formatear las fechas ajustadas
  const formattedStartDate = new Intl.DateTimeFormat("es-ES", {
    month: "short",
    day: "numeric",
  }).format(InicioDateAdjusted);

  const formattedEndDate = new Intl.DateTimeFormat("es-ES", {
    month: "short",
    day: "numeric",
  }).format(FinDateAdjusted);

  const handleEdit = () => {
    const updatedSubActivity = {
      ...subActivity,
      title,
      description,
      startDate,
      endDate,
      hours,
      progress,
    };
    updateSubActivity(updatedSubActivity);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center py-2">
      {isEditing ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 p-4 rounded-lg w-full">
          <div className="col-span-1 lg:col-span-6 flex flex-col">
            <Label>Título de Subactividad</Label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div className="col-span-1 lg:col-span-3 flex flex-col">
            <Label>Inicio</Label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div className="col-span-1 lg:col-span-3 flex flex-col">
            <Label>Fin</Label>
            <input
              id="end-date"
              type="date"
              min={startDate}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div className="col-span-1 lg:col-span-9 flex flex-col">
            <Label>Descripción de la Subactividad</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-3 py-2 w-full resize-none"
              rows={6}
              required
            />
          </div>

          <div className="col-span-1 lg:col-span-3 flex flex-col">
            <div>
              <Label>Horas</Label>
              <input
                id="hours"
                min={0}
                type="number"
                placeholder="Horas"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div className="mt-1 mb-1">
              <NumberSlider progreso={progress} setProgreso={setProgress} />
            </div>
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white rounded px-2 py-1 mt-2 flex"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <TfiSave className="mt-1 mr-1" />
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <div
          className="w-full"
          style={{
            border: "1px solid rgb(209 213 219 )",
            borderRadius: "7px",
            padding: 5,
          }}
        >
          <div className="flex w-full">
            <div className="flex  w-full">
              <div>
                <span>{subActivity.title}</span>
              </div>
              <div
                className="flex w-full justify-end"
                style={{ alignItems: "center" }}
              >
                <div
                  className="flex px-2 py-1"
                  style={{ borderRadius: "15px", border: "1px solid gray" }}
                >
                  <FaRegCalendar className="mt-1 mr-1 " />
                  <span className="xl:hidden">{formattedEndDate}</span>
                  <span className="hidden xl:inline">
                    {formattedStartDate} - {formattedEndDate}
                  </span>
                </div>
                <div
                  className="flex px-2 py-1"
                  style={{ borderRadius: "15px", border: "1px solid gray" }}
                >
                  <GoClock className="mt-1 mr-1" />
                  {subActivity.hours}
                </div>
                <div
                  className="flex px-2 py-1"
                  style={{ borderRadius: "15px", border: "1px solid gray" }}
                >
                  <GiProgression className="mt-1 mr-1" />
                  {`${subActivity.progress.toFixed(2)}%`}
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className=" cursor-pointer
              hover:scale-105
              active:scale-95
              transition-transform
              duration-150
              ease-in-out
              rounded"
                style={{
                  color: !isEditing ? "rgb(29,210,0)" : "white",
                  backgroundColor: !isEditing ? "white" : "red",
                }}
              >
                {!isEditing ? (
                  <MdEdit style={{ width: 25, height: 25 }} />
                ) : (
                  <VscChromeClose style={{ width: 20, height: 20 }} />
                )}
              </button>

              <button
                onClick={() => deleteSubActivity(subActivity.id)}
                className=" cursor-pointer
              hover:scale-105
              active:scale-95
              transition-transform
              duration-150
              ease-in-out"
              >
                <MdDelete style={{ color: "red", width: 25, height: 25 }} />
              </button>
            </div>
          </div>
          <div>
            <span>{subActivity.description}</span>
          </div>
        </div>
      )}
    </div>
  );
};
