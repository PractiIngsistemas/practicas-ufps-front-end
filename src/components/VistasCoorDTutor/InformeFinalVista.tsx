import { FC, useEffect, useState } from "react";
import InformeParicialPage from "../../pages/estudiante/InformeParicialPage";
import { DialogComponent } from "../ui/Dialog/DialogComponent";
import InformeFinalPage from "../../pages/estudiante/InformeFinalPage";
import { IoCloseSharp } from "react-icons/io5";
import { Estudiante } from "../../interfaces/estudiante.interface";
import { PlanDeTrabajo } from "../../interfaces/plantrabajo.interface";
import usePlantrabajo from "../../hooks/usePlanTrabajo";
import { useAuth } from "../../contexts";

interface FinalProps {
  initialOpen: boolean;
  idPlanTrabajo?: number;
  rol: string;
  isTutor?: boolean;
  estudiante?: Estudiante;
  plantrabajo2?: PlanDeTrabajo;
}

const InformeFinalVista: FC<FinalProps> = ({
  initialOpen,
  rol,
  idPlanTrabajo,
  estudiante,
  plantrabajo2,
}) => {
  const [open, setOpen] = useState<boolean>(initialOpen);
  const [planTrabajo, setPlanTrabajo] = useState<PlanDeTrabajo>();
  const { fetchMiPlanTrabajoActualEstudiante } = usePlantrabajo();
  const { user } = useAuth();
  useEffect(() => {
    if (estudiante?.id) {
      fetchMiPlanTrabajoActualEstudiante()
        .then((result) => {
          setPlanTrabajo(result);
        })
        .catch((error) => {
          console.error("Error fetching plan de trabajo:", error);
        });
    }
  }, [estudiante?.id]);
  return (
    <>
      {rol === "estudiante" ? (
        <InformeFinalPage rol={true} plantrabajo={planTrabajo} />
      ) : (
        <DialogComponent
          isOpen={open}
          size="xl"
          onClose={() => setOpen(false)}
          content={
            <div className="w-full">
              <div className="flex justify-end">
                <button className="text-red-600" onClick={() => setOpen(!open)}>
                  <IoCloseSharp style={{ width: "30px", height: "30px" }} />
                </button>
              </div>
              <InformeFinalPage rol={false} plantrabajo={planTrabajo} />
            </div>
          }
          title=""
        />
      )}
    </>
  );
};

export default InformeFinalVista;
