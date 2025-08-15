"use client";

import { getServices } from "@/api/professional/services/services";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { ServiceModel } from "@/models/service";
import clsx from "clsx";
import { useIsMobile } from "hooks/use-mobile";
import { PlusCircleIcon } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import ServiceDetails from "./components/service-details";
import { useModalContext } from "@/contexts/ModalContext";
import CreateServiceModal from "./components/modals/create-service-modal";

const ServicesPage = () => {
  const isMobile = useIsMobile();
  const [selectedService, setSelectedService] = useState<ServiceModel | null>(
    null
  );
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const { openModal } = useModalContext();
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
        <>
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
            <Button onClick={handleServiceCreationModal} variant="outline">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              <span className="text-sm">Adicionar Serviço</span>
            </Button>
            <InfiniteScroll
              className="mt-6"
              queryKey="professional-services"
              renderData={renderData}
              fetchData={(pageData: any) => getServices(pageData)}
            />
          </div>

          <div className="hidden md:block w-1 h-[85%] my-auto mx-4 bg-primary-300" />
          <div className="hidden md:block w-1/2 h-full">
            <div className="bg-white flex items-center justify-center h-full p-4 rounded-md shadow-md">
              <ServiceDetails selectedService={selectedService} />
            </div>
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
