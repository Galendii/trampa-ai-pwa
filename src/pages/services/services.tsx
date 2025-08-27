"use client";

import React, { useCallback, useMemo, useState } from "react";

import clsx from "clsx";
import { PlusCircleIcon } from "lucide-react";

import { getServices } from "@/api/professional/services/services";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ServiceModel } from "@/models/service";
import { useModalStore } from "@/stores/useModalStore";

import CreateServiceModal from "./components/modals/create-service-modal";
import ServiceDetails from "./components/service-details";

const ServicesPage = () => {
  const isMobile = useIsMobile();
  const [selectedService, setSelectedService] = useState<ServiceModel | null>(
    null
  );
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const { openModal } = useModalStore();
  const isDrawerOpened = useMemo(
    () => drawerOpened && isMobile,
    [drawerOpened, isMobile]
  );

  const handleServiceCreationModal = useCallback(() => {
    openModal(<CreateServiceModal />);
  }, []);

  const renderData = useCallback(
    (service: ServiceModel): React.ReactElement => {
      return (
        <div
          onClick={() => {
            handleServiceSelection(service);
          }}
          className={clsx(
            "border-green-500 hover:border-primary-500 border border-l-4 cursor-pointer p-2 rounded transition-all duration-300 ",
            {
              "border-l-[10px] border-primary-500 ":
                service.id === selectedService?.id,
            }
          )}
          key={`service-${service.id}`}
        >
          <div className="flex items-center justify-between">
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
      );
    },
    [selectedService]
  );

  const handleServiceSelection = useCallback((service: ServiceModel) => {
    setSelectedService(service);
    setDrawerOpened(true);
  }, []);

  return (
    <>
      <Header title="Serviços" />
      <div className="w-full">
        <div className="p-4 h-full w-full flex flex-col md:flex-row justify-around items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className=" bg-white p-4 rounded-md shadow-md flex-1">
            <Button onClick={handleServiceCreationModal} variant="outline">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              <span className="text-sm">Adicionar Serviço</span>
            </Button>
            <p className="text-gray-500 md:hidden mt-4">
              Selecione um serviço para ver os detalhes
            </p>
            <InfiniteScroll
              className="mt-6"
              queryKey={["professional-services"]}
              renderData={renderData}
              fetchData={(pageData: any) => getServices(pageData)}
            />
          </div>

          <div className="hidden w-96 h-full bg-white md:block ">
            {selectedService ? (
              <div className="bg-white flex items-center justify-center h-full p-4 rounded-md shadow-md">
                <ServiceDetails selectedService={selectedService} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500">
                  Selecione um serviço para ver os detalhes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Drawer
        handleCloseDrawer={() => setDrawerOpened(false)}
        opened={isDrawerOpened}
      >
        <ServiceDetails selectedService={selectedService} />
      </Drawer>
    </>
  );
};

export default React.memo(ServicesPage);
