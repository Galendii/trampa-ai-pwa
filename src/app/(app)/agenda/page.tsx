"use client"

import { useState } from "react"
import Header from "../../../components/Header"
import { Calendar, type CalendarEvent } from "../../../components/ui/Calendar"

export default function AgendaPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Personal Training - João Pedro",
      description: "Treino de força e condicionamento",
      startDate: new Date(2024, 0, 16, 8, 0),
      endDate: new Date(2024, 0, 16, 9, 0),
      color: "#3b82f6",
      location: "Academia Força Total",
      category: "Personal Training",
    },
    {
      id: "2",
      title: "Consulta Nutricional - Fernanda Lima",
      description: "Avaliação nutricional e planejamento alimentar",
      startDate: new Date(2024, 0, 16, 10, 30),
      endDate: new Date(2024, 0, 16, 11, 30),
      color: "#10b981",
      location: "Consultório",
      category: "Nutrição",
    },
    {
      id: "3",
      title: "Avaliação Física - Carla Mendes",
      description: "Avaliação física completa",
      startDate: new Date(2024, 0, 17, 14, 0),
      endDate: new Date(2024, 0, 17, 15, 0),
      color: "#f59e0b",
      location: "Academia Força Total",
      category: "Avaliação",
    },
    {
      id: "4",
      title: "Reunião de Equipe",
      description: "Reunião mensal da equipe",
      startDate: new Date(2024, 0, 18),
      endDate: new Date(2024, 0, 18),
      allDay: true,
      color: "#8b5cf6",
      location: "Sala de Reuniões",
      category: "Administrativo",
    },
    {
      id: "5",
      title: "Workshop de Nutrição",
      description: "Workshop sobre alimentação saudável",
      startDate: new Date(2024, 0, 20, 9, 0),
      endDate: new Date(2024, 0, 20, 12, 0),
      color: "#ec4899",
      location: "Auditório",
      category: "Educação",
    },
  ])

  const handleEventCreate = (eventData: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Math.random().toString(36).substr(2, 9),
    }
    setEvents([...events, newEvent])
  }

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)))
  }

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  const handleDateSelect = (date: Date) => {
    console.log("Data selecionada:", date)
  }

  return (
    <div className="p-4 sm:p-6 h-screen flex flex-col">
      <Header title="Agenda" />

      <div className="flex-1 mt-6">
        <Calendar
          events={events}
          onEventCreate={handleEventCreate}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
          onDateSelect={handleDateSelect}
          defaultView="month"
          showWeekends={true}
          minTime="06:00"
          maxTime="22:00"
          timeSlotDuration={30}
          className="h-full"
        />
      </div>
    </div>
  )
}
