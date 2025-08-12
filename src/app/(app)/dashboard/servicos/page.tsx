"use client";

import { getServices } from "@/api/professional/services/services";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { PlanModel } from "@/models/plan";
import { ServiceModel } from "@/models/service";
import clsx from "clsx";
import { useIsMobile } from "hooks/use-mobile";
import {
  EditIcon,
  PencilIcon,
  PlusCircleIcon,
  TextSelectIcon,
  TrashIcon,
} from "lucide-react";
import React, { useCallback, useMemo, useRef, useState } from "react";

const ServicesPage = () => {
  const isMobile = useIsMobile();
  const [selectedService, setSelectedService] = useState<ServiceModel | null>(
    null
  );
  const [selectedPlan, setSelectedPlan] = useState<PlanModel | null>(null);
  const [editionEnabled, setEditionEnabled] = useState<boolean>(false);
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const isDrawerOpened = useMemo(
    () => drawerOpened && isMobile,
    [drawerOpened, isMobile]
  );
  const toggleEdition = useCallback(() => {
    setEditionEnabled(!editionEnabled);
  }, [editionEnabled]);

  // TODO: Componentize this function -- too bad!
  const renderData = useCallback(
    (service: ServiceModel): React.ReactElement => {
      return (
        <>
          <div
            onClick={() => {
              handleServiceSelection(service);
            }}
            className={clsx(
              "border-slate-300 hover:border-primary-300 border border-l-4 cursor-pointer p-2 rounded transition-all duration-300 ",
              {
                "border-l-[10px] border-primary-500 hover:border-primary-500":
                  service.id === selectedService?.id,
              }
            )}
          >
            <div className="flex items-center justify-between" key={service.id}>
              <div className="mr-4 w-full">
                <div className="text-md font-medium text-gray-900">
                  {service.name}
                </div>
                <div className="text-xs my-1 text-gray-500">
                  {service.description}
                </div>
              </div>
            </div>
          </div>
          <hr className="my-2 w-full bg-slate-300" />
        </>
      );
    },
    [selectedService]
  );

  // TODO: Componentize this function -- too bad!
  const renderService = useCallback(() => {
    if (!selectedService) {
      return (
        <div className="flex flex-col items-center gap-2 border w-1/3 border-slate-300 p-4 rounded-md">
          <TextSelectIcon className="h-12 w-12" />
          <p className="text-md text-neutral-800">Nenhum plano selecionado</p>
        </div>
      );
    }
    return (
      <div className="w-full h-full">
        <div className="flex items-center justify-between  mb-4">
          <Button variant="outline" onClick={toggleEdition}>
            <EditIcon className="h-4 w-4 mr-2" />
            <span className="text-sm">Editar Serviço</span>
          </Button>
          <Button variant="outline">
            <PlusCircleIcon className="h-4 w-4 mr-2" />
            <span className="text-sm">Criar Plano </span>
          </Button>
        </div>
        <Input
          className={clsx(
            "w-fit border-transparent outline-primary-300 border-b-2 border-b-slate-300",
            {
              " border-b-primary-300": editionEnabled,
            }
          )}
          disabled={!editionEnabled}
          value={selectedService.name}
        />
        <TextArea
          className={clsx(
            "border-transparent text-sm outline-primary-300 mt-2 border-2 border-slate-300 scroll-m-0",
            {
              "bg-slate-100 border-primary-300": editionEnabled,
            }
          )}
          disabled={!editionEnabled}
          rows={5}
          value={selectedService.description}
        />
        {/* Plans */}
        {selectedService.plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => {
              setSelectedPlan(plan);
            }}
            className={clsx(
              "border-slate-300 hover:border-primary-300 border border-l-4 cursor-pointer p-2 rounded transition-all duration-300 my-4",
              {
                "border-l-[10px] border-primary-500 hover:border-primary-500":
                  plan.id === selectedPlan?.id,
              }
            )}
          >
            <div className="flex items-center relative">
              {/* Plan details */}
              <div>
                <p className="text-md text-neutral-800">{plan.name}</p>
                <p className="text-sm md:text-md text-neutral-800 my-2">
                  {Intl.NumberFormat("pt-Br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(plan.price))}{" "}
                  - {plan.duration} meses - {plan.frequency}x por semana
                </p>
                {/* Tag */}
                <div
                  className={clsx("rounded w-fit mb-2 bg-slate-300 p-2", {
                    "bg-primary-300": plan.active,
                  })}
                >
                  <p className="text-xs md:text-sm text-neutral-800">
                    {plan.active ? "Ativo" : "Inativo"}
                  </p>
                </div>
                {/* Actions row */}
                {plan.id === selectedPlan?.id && (
                  <div className="flex items-center gap-2 w-full">
                    <button className="hover:bg-slate-200 p-1 transition-all">
                      <PencilIcon className="h-4 w-4 " />
                    </button>
                    <button className="hover:bg-slate-200 p-1 transition-all">
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }, [selectedService, selectedPlan, editionEnabled]);

  const handleServiceSelection = useCallback((service: ServiceModel) => {
    setSelectedService(service);
    setDrawerOpened(true);
  }, []);

  return (
    <>
      <Header title="Serviços" />
      <div>
        <div className="p-4 h-full  flex flex-col md:flex-row justify-evenly">
          <div className="bg-white p-4 rounded-md shadow-md">
            <Button variant="outline">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              <span className="text-sm">Adicionar Serviço</span>
            </Button>
            <InfiniteScroll
              className="mt-6"
              queryKey="services"
              renderData={renderData}
              fetchData={(pageData: any) => getServices(pageData)}
            />
          </div>

          <div className="hidden md:block w-1 h-[85%] my-auto mx-4 bg-primary-300" />
          <div className="hidden md:block w-1/2 h-full">
            <div className="bg-white flex items-center justify-center h-full p-4 rounded-md shadow-md">
              {renderService()}
            </div>
          </div>
        </div>
      </div>
      <Drawer
        handleCloseDrawer={() => setDrawerOpened(false)}
        opened={isDrawerOpened}
      >
        {renderService()}
      </Drawer>
    </>
  );
};

export default React.memo(ServicesPage);
