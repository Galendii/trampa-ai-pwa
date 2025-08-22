"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Clock, Loader2, Plus, Trash2 } from "lucide-react";

// Components
import { Select, SelectOption } from "@/components/ui/Select";
import Button from "@/components/ui/Button";

// Hooks & Context
import { useWizard } from "@/contexts/WizardContext";
import { useGetPlanById } from "@/hooks/api/professional/usePlans";

// Models
import { WeekdayTimeModel } from "@/models/service-contract";

const WEEKDAY_OPTIONS: SelectOption[] = [
  { value: "monday", label: "Segunda-feira" },
  { value: "tuesday", label: "Terça-feira" },
  { value: "wednesday", label: "Quarta-feira" },
  { value: "thursday", label: "Quinta-feira" },
  { value: "friday", label: "Sexta-feira" },
  { value: "saturday", label: "Sábado" },
  { value: "sunday", label: "Domingo" },
];

const AttendanceStep = () => {
  const { formData, updateFormData } = useWizard();
  const { serviceId, planId } = formData;

  // Local state for the new slot being added
  const [newWeekday, setNewWeekday] = useState<string>("");
  const [newTime, setNewTime] = useState<string>("");

  const {
    data: selectedPlan,
    isLoading,
    isError,
  } = useGetPlanById(planId, serviceId);

  // Generate time slots for the select dropdown
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 6; h <= 22; h++) {
      for (let m = 0; m < 60; m += 30) {
        const time = `${String(h).padStart(2, "0")}:${String(m).padStart(
          2,
          "0"
        )}`;
        slots.push({ value: time, label: time });
      }
    }
    return slots;
  }, []);

  const handleAddAttendance = () => {
    if (!newWeekday || !newTime || !selectedPlan) return;
    if (formData.attendance.length >= selectedPlan.frequency) return;

    const newAttendanceSlot: WeekdayTimeModel = {
      weekday: newWeekday,
      time: newTime,
    };
    const updatedAttendance = [...formData.attendance, newAttendanceSlot];

    updateFormData("attendance", updatedAttendance);

    // Reset for next entry
    setNewWeekday("");
    setNewTime("");
  };

  const handleRemoveAttendance = (index: number) => {
    const updatedAttendance = formData.attendance.filter(
      (_: any, i: number) => i !== index
    );
    updateFormData("attendance", updatedAttendance);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      );
    }

    if (isError) {
      return (
        <p className="text-center text-red-500 py-8">
          Erro ao carregar detalhes do plano.
        </p>
      );
    }

    if (!selectedPlan) {
      return (
        <p className="text-center text-slate-500 py-8">
          Por favor, volte e selecione um plano primeiro.
        </p>
      );
    }

    const remainingSlots = selectedPlan.frequency - formData.attendance.length;

    return (
      <div>
        <p className="text-center text-slate-600 mb-6">
          Adicione os{" "}
          <strong className="text-slate-800">{selectedPlan.frequency}</strong>{" "}
          horários semanais definidos no plano.
        </p>

        {/* Form to add a new slot */}
        {remainingSlots > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end bg-slate-50 p-4 rounded-lg border">
            <Select
              label="Dia da semana"
              options={WEEKDAY_OPTIONS}
              value={newWeekday}
              onChange={setNewWeekday}
              placeholder="Selecione o dia"
            />
            <Select
              label="Horário"
              options={timeSlots}
              value={newTime}
              onChange={setNewTime}
              placeholder="Selecione a hora"
            />
            <Button
              onClick={handleAddAttendance}
              disabled={!newWeekday || !newTime}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        )}

        {/* List of added slots */}
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold text-slate-700">
            Horários Adicionados ({formData.attendance.length}/
            {selectedPlan.frequency})
          </h4>
          {formData.attendance.length > 0 ? (
            formData.attendance.map((slot: WeekdayTimeModel, index: number) => {
              const dayLabel = WEEKDAY_OPTIONS.find(
                (d) => d.value === slot.weekday
              )?.label;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white border rounded-md"
                >
                  <span className="font-medium text-slate-800">
                    {dayLabel} às {slot.time}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveAttendance(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">
              Nenhum horário adicionado ainda.
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Frequência Semanal
        </h3>
        <p className="text-slate-600">
          Defina os dias e horários recorrentes para este contrato.
        </p>
      </div>
      {renderContent()}
    </div>
  );
};

export default AttendanceStep;
