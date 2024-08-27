import { useEffect, useState } from "react"
import { EmptyStateMessage } from "../../components/estudiantes"
import { TablaPaginadaComponent } from "../../components/ui/Table/TablaPaginadaComponent"
import useEmpresas from "../../hooks/useEmpresas"



export const PracticantesPage = () => {



  const { getPracticantesAsignadosATutor } = useEmpresas()
  const [practicantes, setPracticantes] = useState<any[]>([])
  const [totalItems, setTotalItems] = useState<number>(0); // Número total de ítems
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Suponiendo que el backend maneja 10 ítems por página
  const [filtro, setFiltro] = useState<string>("");
  console.log(practicantes)
  useEffect(() => {
    getPracticantesAsignadosATutor().then((res) => {
      console.log(res)
      setPracticantes(res || [])
      setTotalItems(res.length || 0)
    })

  }, [])

  return (<>
    <div className="mb-10">
      <div className="text-gray-600 font-bold text-2xl">Practicantes asignados</div>
    </div>
    {
      practicantes && practicantes?.length === 0 ? (
        <EmptyStateMessage
          message="No hay practicantes asignados"
          submesage=""
          buttonText=""
          showButton={false}
          setOpen={() => { }}
        />
      ) :
        (
          <>
            <TablaPaginadaComponent
              filtrar
              setCurrentPage={setCurrentPage}
              filtro={filtro}
              setFiltro={setFiltro}
              encabezados={[
                "Codigo",
                "Nombre",
                "Plan de trabajo",
                "Primer informe",
                "Segundo informe",
                "Estado",
              ]}
              filas={estudiantes.estudiantes.map((estudiante) => [
                estudiante.codigo,
                <div className="flex items-center">
                  <div className="shrink-0 w-11 h-11">
                    <Avatar url={estudiante?.usuario?.imagenUrl} />
                  </div>
                  <div
                    className="ml-4 cursor-pointer"
                    onClick={() => {
                      setEstudianteSeleccionado(estudiante);

                      setMostrarPerfil(true);
                    }}
                  >
                    <div className="text-gray-900 font-medium">
                      {`${estudiante.primerNombre} ${estudiante.segundoNombre} ${estudiante.primerApellido} ${estudiante.segundoApellido}` ||
                        "Nombre aun no registrado"}
                    </div>
                    <div className="text-gray-500 mt-1">
                      {estudiante?.usuario?.email}
                    </div>
                  </div>
                </div>,

                <div className="flex justify-center cursor-pointer w-full pr-6">
                  {
                    //TODO: Diferenciar cuando el plan está completo o no.
                    //TODO: Implementar vizualización del plan de trabajo.
                    !estudiante?.asignaciones?.find(
                      (a) => a.solicitud.semestre.actual
                    )?.planDeTrabajo ? (
                      <div className="flex justify-center pr-6">
                        <IoAlertCircle className="text-yellow-500 w-5 h-5" />
                        <span>Pendiente</span>
                      </div>
                    ) : (
                      <div onClick={() => setOpenPlan(!openPlan)}>
                        <BiCheck className="text-green-500 w-5 h-5" />
                        <span className="text-blue-400 flex">
                          Ver
                          <span className="self-center">
                            <BiArrowToRight />
                          </span>
                          {openPlan && (
                            <PlanDeTrabajoVista
                              rol="coordinador"
                              initialOpen={true}
                              estudiante={estudiante}
                              plantrabajo2={
                                estudiante?.asignaciones?.find(
                                  (a) => a.solicitud.semestre.actual
                                )?.planDeTrabajo
                              }
                              isTutor={true}
                            />
                          )}
                        </span>
                      </div>
                    )
                  }
                </div>,
                <div className="flex justify-center cursor-pointer w-full pr-6">
                  {!estudiante?.asignaciones?.find(
                    (a) => a.solicitud.semestre.actual
                  )?.planDeTrabajo?.primerInforme ? (
                    <div className="flex justify-center pr-6">
                      <IoAlertCircle className="text-yellow-500 w-5 h-5" />
                      <span>Pendiente</span>
                    </div>
                  ) : (
                    <div onClick={() => setOpenInfoP(!openInfoP)}>
                      <BiCheck className="text-green-500 w-5 h-5" />
                      <span className="text-blue-400 flex">
                        Ver
                        <span className="self-center">
                          <BiArrowToRight />
                        </span>
                        {openInfoP && (
                          <InformeParcialVista
                            rol="coordinador"
                            initialOpen={true}
                            estudiante={estudiante}
                            plantrabajo2={
                              estudiante?.asignaciones?.find(
                                (a) => a.solicitud.semestre.actual
                              )?.planDeTrabajo
                            }
                            isTutor={true}
                          />
                        )}
                      </span>
                    </div>
                  )}
                </div>,
                <div className="flex justify-center cursor-pointer w-full pr-6">
                  {!estudiante?.asignaciones?.find(
                    (a) => a.solicitud.semestre.actual
                  )?.planDeTrabajo?.informeFinal ? (
                    <div className="flex justify-center pr-6">
                      <IoAlertCircle className="text-yellow-500 w-5 h-5" />
                      <span>Pendiente</span>
                    </div>
                  ) : (
                    <div onClick={() => setOpenInfoF(!openInfoF)}>
                      <BiCheck className="text-green-500 w-5 h-5" />
                      <span className="text-blue-400 flex">
                        Ver
                        <span className="self-center">
                          <BiArrowToRight />
                        </span>
                        {openInfoF && (
                          <InformeFinalVista
                            rol="coordinador"
                            initialOpen={true}
                            estudiante={estudiante}
                            plantrabajo2={
                              estudiante?.asignaciones?.find(
                                (a) => a.solicitud.semestre.actual
                              )?.planDeTrabajo
                            }
                            isTutor={true}
                          />
                        )}
                      </span>
                    </div>
                  )}
                </div>,
                estudiante?.usuario?.estaActivo ? (
                  <span className="text-green-700 font-medium text-xs py-1 px-2 ring-1 ring-green-600/20 bg-green-100 rounded-md items-center inline-flex border-green-600 ring-inset">
                    Activo
                  </span>
                ) : (
                  <span className="text-red-700 font-medium text-xs py-1 px-2 ring-1 ring-red-600/20 bg-red-100 rounded-md items-center inline-flex border-red-600 ring-inset">
                    Inactivo
                  </span>
                ),
              ])}
              totalItems={totalItems}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          </>
        )
    }
  </>)
}