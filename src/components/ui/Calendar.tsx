"use client";
import { useState, useMemo, useEffect } from "react";
import { cn, formatDate } from "../../lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarIcon,
  Clock,
  MapPin,
  Trash2,
  MoreHorizontal,
  User,
} from "lucide-react";
import { Button } from "./Button";
import { Modal, ModalBody, ModalFooter } from "./Modal";
import { Input } from "./Input";
import { Select } from "./Select";
import { DatePicker } from "./DatePicker";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  allDay?: boolean;
  color?: string;
  location?: string;
  attendees?: string[];
  category?: string;
  recurring?: {
    type: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    endDate?: Date;
  };
}

export type CalendarView = "month" | "week" | "day" | "agenda";

export interface CalendarProps {
  events?: CalendarEvent[];
  onEventCreate?: (event: Omit<CalendarEvent, "id">) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
  onDateSelect?: (date: Date) => void;
  defaultView?: CalendarView;
  className?: string;
  showWeekends?: boolean;
  minTime?: string; // "08:00"
  maxTime?: string; // "22:00"
  timeSlotDuration?: number; // minutes
  eventColors?: string[];
}

export function Calendar({
  events = [],
  onEventCreate,
  onEventUpdate,
  onEventDelete,
  onDateSelect,
  defaultView = "month",
  className,
  showWeekends = true,
  minTime = "06:00",
  maxTime = "22:00",
  timeSlotDuration = 30,
  eventColors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
  ],
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(defaultView);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Add a state for window width or a boolean for mobile view
  const [isMobileView, setIsMobileView] = useState(false);

  // Effect to determine mobile view on client-side
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 640); // Assuming 640px as mobile breakpoint
    };

    if (typeof window !== "undefined") {
      handleResize(); // Set initial state
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Event form state
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    startTime: "09:00",
    endTime: "10:00",
    allDay: false,
    color: eventColors[0],
    location: "",
    category: "",
  });

  // Generate time slots
  const timeSlots = useMemo(() => {
    const slots = [];
    const [minHour, minMinute] = minTime.split(":").map(Number);
    const [maxHour, maxMinute] = maxTime.split(":").map(Number);

    let currentHour = minHour;
    let currentMinute = minMinute;

    while (
      currentHour < maxHour ||
      (currentHour === maxHour && currentMinute <= maxMinute)
    ) {
      const timeString = `${currentHour
        .toString()
        .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
      slots.push(timeString);

      currentMinute += timeSlotDuration;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }
    }

    return slots;
  }, [minTime, maxTime, timeSlotDuration]);

  // Get next 3 appointments for today
  const getNextAppointments = () => {
    const today = new Date();
    const now = new Date();

    // Get today's events that haven't started yet
    const todayEvents = events.filter((event) => {
      const eventDate = new Date(event.startDate);
      const isToday = eventDate.toDateString() === today.toDateString();
      const isUpcoming = event.allDay || eventDate >= now;
      return isToday && isUpcoming;
    });

    // Sort by start time and take first 3
    return todayEvents
      .sort((a, b) => {
        // All-day events come first
        if (a.allDay && !b.allDay) return -1;
        if (!a.allDay && b.allDay) return 1;
        return a.startDate.getTime() - b.startDate.getTime();
      })
      .slice(0, 3);
  };

  const nextAppointments = getNextAppointments();

  // Navigation functions
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case "month":
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case "week":
        newDate.setDate(newDate.getDate() - 7);
        break;
      case "day":
        newDate.setDate(newDate.getDate() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case "month":
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case "week":
        newDate.setDate(newDate.getDate() + 7);
        break;
      case "day":
        newDate.setDate(newDate.getDate() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get events for a specific date - ORDENADOS POR HORÁRIO
  const getEventsForDate = (date: Date) => {
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });

    // Ordenar eventos: primeiro os de dia inteiro, depois por horário de início
    return dayEvents.sort((a, b) => {
      // Eventos de dia inteiro vêm primeiro
      if (a.allDay && !b.allDay) return -1;
      if (!a.allDay && b.allDay) return 1;

      // Se ambos são de dia inteiro ou ambos têm horário, ordenar por horário de início
      return a.startDate.getTime() - b.startDate.getTime();
    });
  };

  // Get events for a time slot
  const getEventsForTimeSlot = (date: Date, time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    return events.filter((event) => {
      if (event.allDay) return false;

      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const slotStart = new Date(date);
      slotStart.setHours(hour, minute, 0, 0);
      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + timeSlotDuration);

      return (
        eventStart.getDate() === date.getDate() &&
        eventStart.getMonth() === date.getMonth() &&
        eventStart.getFullYear() === date.getFullYear() &&
        ((eventStart >= slotStart && eventStart < slotEnd) ||
          (eventEnd > slotStart && eventEnd <= slotEnd) ||
          (eventStart <= slotStart && eventEnd >= slotEnd))
      );
    });
  };

  // Handle event creation
  const handleCreateEvent = (date?: Date, time?: string) => {
    const startDate = date || currentDate;
    const endDate = new Date(startDate);

    if (time) {
      const [hour, minute] = time.split(":").map(Number);
      startDate.setHours(hour, minute, 0, 0);
      endDate.setHours(hour + 1, minute, 0, 0);
      setEventForm({
        ...eventForm,
        startDate,
        endDate,
        startTime: time,
        endTime: `${(hour + 1).toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`,
        allDay: false,
      });
    } else {
      setEventForm({
        ...eventForm,
        startDate,
        endDate,
        allDay: true,
      });
    }

    setIsCreateMode(true);
    setIsEventModalOpen(true);
  };

  // Handle event edit
  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setEventForm({
      title: event.title,
      description: event.description || "",
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startDate.toTimeString().slice(0, 5),
      endTime: event.endDate.toTimeString().slice(0, 5),
      allDay: event.allDay || false,
      color: event.color || eventColors[0],
      location: event.location || "",
      category: event.category || "",
    });
    setIsCreateMode(false);
    setIsEventModalOpen(true);
  };

  // Handle form submission
  const handleSubmitEvent = () => {
    const startDateTime = new Date(eventForm.startDate);
    const endDateTime = new Date(eventForm.endDate);

    if (!eventForm.allDay) {
      const [startHour, startMinute] = eventForm.startTime
        .split(":")
        .map(Number);
      const [endHour, endMinute] = eventForm.endTime.split(":").map(Number);

      startDateTime.setHours(startHour, startMinute, 0, 0);
      endDateTime.setHours(endHour, endMinute, 0, 0);
    }

    const eventData = {
      title: eventForm.title,
      description: eventForm.description,
      startDate: startDateTime,
      endDate: endDateTime,
      allDay: eventForm.allDay,
      color: eventForm.color,
      location: eventForm.location,
      category: eventForm.category,
    };

    if (isCreateMode) {
      onEventCreate?.(eventData);
    } else if (selectedEvent) {
      onEventUpdate?.({ ...selectedEvent, ...eventData });
    }

    setIsEventModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEventForm({
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      allDay: false,
      color: eventColors[0],
      location: "",
      category: "",
    });
    setSelectedEvent(null);
  };

  // Format header title based on view
  const getHeaderTitle = () => {
    const options: Intl.DateTimeFormatOptions = {};

    switch (view) {
      case "month":
        options.month = "long";
        options.year = "numeric";
        break;
      case "week":
        const weekStart = getWeekStart(currentDate);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
      case "day":
        options.weekday = "long";
        options.month = "long";
        options.day = "numeric";
        options.year = "numeric";
        break;
      case "agenda":
        options.month = "long";
        options.year = "numeric";
        break;
    }

    return currentDate.toLocaleDateString("pt-BR", options);
  };

  // Get week start (Monday)
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  // Format time for display
  const formatTime = (date: Date, allDay: boolean) => {
    if (allDay) return "Dia inteiro";
    return date.toTimeString().slice(0, 5);
  };

  // Get time until event
  const getTimeUntilEvent = (eventDate: Date, allDay: boolean) => {
    if (allDay) return "Hoje";

    const now = new Date();
    const diffMs = eventDate.getTime() - now.getTime();

    if (diffMs <= 0) return "Agora";

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 0) {
      return `em ${diffHours}h ${diffMinutes}min`;
    } else {
      return `em ${diffMinutes}min`;
    }
  };

  // Render next appointments section
  const renderNextAppointments = () => {
    if (nextAppointments.length === 0) {
      return (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-700 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-slate-500" />
              Próximos agendamentos
            </h3>
            <span className="text-xs text-slate-500">Hoje</span>
          </div>
          <div className="text-center py-4">
            <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-slate-400" />
            <p className="text-sm text-slate-500">
              Nenhum agendamento para hoje
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-700 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-blue-600" />
            Próximos agendamentos
          </h3>
          <span className="text-xs text-slate-500">Hoje</span>
        </div>

        <div className="space-y-3">
          {nextAppointments.map((event, index) => (
            <div
              key={event.id}
              className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors group"
              onClick={() => handleEditEvent(event)}
            >
              {/* Time indicator */}
              <div className="flex-shrink-0 text-center min-w-[60px]">
                <div className="text-xs font-medium text-slate-600">
                  {formatTime(event.startDate, event.allDay || false)}
                </div>
                <div className="text-xs text-slate-500">
                  {getTimeUntilEvent(event.startDate, event.allDay || false)}
                </div>
              </div>

              {/* Event color indicator */}
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: event.color || eventColors[0] }}
              />

              {/* Event details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-slate-800 truncate">
                    {event.title}
                  </h4>
                  {index === 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Próximo
                    </span>
                  )}
                </div>

                {event.location && (
                  <div className="flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                    <span className="text-xs text-slate-500 truncate">
                      {event.location}
                    </span>
                  </div>
                )}

                {event.category && (
                  <div className="flex items-center mt-1">
                    <User className="w-3 h-3 mr-1 text-slate-400" />
                    <span className="text-xs text-slate-500">
                      {event.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Duration */}
              {!event.allDay && (
                <div className="flex-shrink-0 text-right">
                  <div className="text-xs text-slate-500">
                    {Math.round(
                      (event.endDate.getTime() - event.startDate.getTime()) /
                        (1000 * 60)
                    )}
                    min
                  </div>
                </div>
              )}

              {/* Hover indicator */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick action */}
        <div className="mt-3 pt-3 border-t border-slate-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCreateEvent()}
            className="w-full text-slate-600 hover:text-slate-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar agendamento
          </Button>
        </div>
      </div>
    );
  };

  // Render month view
  const renderMonthView = () => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const startDate = getWeekStart(firstDay);
    const days = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    if (!showWeekends) {
      days.filter((_, index) => index % 7 !== 5 && index % 7 !== 6);
    }

    return (
      <div className="flex-1">
        {/* Week headers */}
        <div className="grid grid-cols-7 border-b border-slate-200">
          {weekDays.map((day, index) =>
            !showWeekends && (index === 5 || index === 6) ? null : (
              <div
                key={day}
                className="p-2 sm:p-3 text-center text-xs sm:text-sm font-medium text-slate-600 bg-slate-50"
              >
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.slice(0, 1)}</span>
              </div>
            )
          )}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 flex-1">
          {days.map((date, index) => {
            if (!showWeekends && (index % 7 === 5 || index % 7 === 6))
              return null;

            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const isToday = date.toDateString() === new Date().toDateString();
            const dayEvents = getEventsForDate(date);

            return (
              <div
                key={date.toISOString()}
                className={cn(
                  "min-h-[120px] sm:min-h-[140px] border-r border-b border-slate-200 p-1 sm:p-2 cursor-pointer hover:bg-slate-50 flex flex-col",
                  !isCurrentMonth && "bg-slate-50/50 text-slate-400"
                )}
                onClick={() => {
                  onDateSelect?.(date);
                  setSelectedDate(date);
                }}
                onDoubleClick={() => handleCreateEvent(date)}
              >
                {/* Date number */}
                <div className="flex justify-between items-start mb-1 sm:mb-2">
                  <div
                    className={cn(
                      "text-sm sm:text-base font-medium min-w-[24px] sm:min-w-[28px] text-center",
                      isToday &&
                        "w-6 h-6 sm:w-7 sm:h-7 bg-blue-600 text-white rounded-full flex items-center justify-center"
                    )}
                  >
                    {date.getDate()}
                  </div>
                  {dayEvents.length > 0 && (
                    <div className="text-xs text-slate-500 bg-slate-200 rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                      {dayEvents.length}
                    </div>
                  )}
                </div>

                {/* Events list - Notion Calendar style - MELHORADO PARA MOBILE */}
                <div className="flex-1 space-y-0.5 sm:space-y-1 overflow-hidden">
                  {dayEvents.slice(0, isMobileView ? 2 : 4).map((event) => (
                    <div
                      key={event.id}
                      className="group relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditEvent(event);
                      }}
                    >
                      <div
                        className="text-xs p-1 sm:p-1.5 rounded cursor-pointer hover:opacity-90 transition-opacity border-l-2"
                        style={{
                          backgroundColor: event.color + "15",
                          borderLeftColor: event.color,
                          color: event.color,
                        }}
                      >
                        <div className="font-medium truncate text-slate-800 text-xs sm:text-sm leading-tight">
                          {event.title}
                        </div>
                        {!event.allDay && (
                          <div className="text-xs opacity-75 mt-0.5 leading-tight">
                            {event.startDate.toTimeString().slice(0, 5)}
                            {!isMobileView &&
                              event.endDate.toTimeString().slice(0, 5) !==
                                event.startDate.toTimeString().slice(0, 5) &&
                              ` - ${event.endDate.toTimeString().slice(0, 5)}`}
                          </div>
                        )}
                        {event.location && !isMobileView && (
                          <div className="text-xs opacity-60 truncate mt-0.5 flex items-center leading-tight">
                            <MapPin size={8} className="mr-1 flex-shrink-0" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Show more indicator - ADAPTADO PARA MOBILE */}
                  {dayEvents.length > (isMobileView ? 2 : 4) && (
                    <div
                      className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer p-1 rounded text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Could open a modal with all events for this day
                      }}
                    >
                      +{dayEvents.length - (isMobileView ? 2 : 4)} mais
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const weekStart = getWeekStart(currentDate);
    const weekDays: Date[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      weekDays.push(date);
    }

    if (!showWeekends) {
      weekDays.splice(5, 2); // Remove Saturday and Sunday
    }

    return (
      <div className="flex-1 flex flex-col">
        {/* Week header */}
        <div className="flex border-b border-slate-200">
          <div className="w-12 sm:w-16 lg:w-20 p-2 border-r border-slate-200"></div>
          {weekDays.map((date) => {
            const isToday = date.toDateString() === new Date().toDateString();
            return (
              <div
                key={date.toISOString()}
                className="flex-1 p-2 sm:p-3 text-center border-r border-slate-200"
              >
                <div className="text-xs sm:text-sm text-slate-600">
                  <span className="hidden sm:inline">
                    {date.toLocaleDateString("pt-BR", { weekday: "short" })}
                  </span>
                  <span className="sm:hidden">
                    {date
                      .toLocaleDateString("pt-BR", { weekday: "short" })
                      .slice(0, 1)}
                  </span>
                </div>
                <div
                  className={cn(
                    "text-base sm:text-lg lg:text-xl font-semibold mt-1",
                    isToday &&
                      "w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-sm sm:text-base"
                  )}
                >
                  {date.getDate()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Time slots */}
        <div className="flex-1 overflow-y-auto">
          {timeSlots.map((time) => (
            <div key={time} className="flex border-b border-slate-100">
              <div className="w-12 sm:w-16 lg:w-20 p-1 sm:p-2 text-xs sm:text-sm text-slate-600 border-r border-slate-200 text-right">
                <span className="hidden sm:inline">{time}</span>
                <span className="sm:hidden">{time.slice(0, 2)}</span>
              </div>
              {weekDays.map((date) => {
                const slotEvents = getEventsForTimeSlot(date, time);
                return (
                  <div
                    key={`${date.toISOString()}-${time}`}
                    className="flex-1 min-h-[30px] sm:min-h-[40px] lg:min-h-[50px] border-r border-slate-200 p-0.5 sm:p-1 hover:bg-slate-50 cursor-pointer"
                    onClick={() => handleCreateEvent(date, time)}
                  >
                    {slotEvents.map((event) => (
                      <div
                        key={event.id}
                        className="text-xs p-0.5 sm:p-1 rounded mb-1 cursor-pointer hover:opacity-80 truncate"
                        style={{ backgroundColor: event.color, color: "white" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditEvent(event);
                        }}
                        title={event.title}
                      >
                        <span className="hidden sm:inline">{event.title}</span>
                        <span className="sm:hidden">
                          {event.title.slice(0, 8)}...
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render day view
  const renderDayView = () => {
    const allDayEvents = events.filter(
      (event) =>
        event.allDay &&
        event.startDate.toDateString() === currentDate.toDateString()
    );

    return (
      <div className="flex-1 flex flex-col">
        {/* All day events */}
        {allDayEvents.length > 0 && (
          <div className="border-b border-slate-200 p-3">
            <div className="text-sm font-medium text-slate-600 mb-2">
              Dia inteiro
            </div>
            <div className="space-y-1">
              {allDayEvents.map((event) => (
                <div
                  key={event.id}
                  className="text-sm p-2 rounded cursor-pointer hover:opacity-80"
                  style={{
                    backgroundColor: event.color + "20",
                    color: event.color,
                  }}
                  onClick={() => handleEditEvent(event)}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Time slots */}
        <div className="flex-1 overflow-y-auto">
          {timeSlots.map((time) => {
            const slotEvents = getEventsForTimeSlot(currentDate, time);
            return (
              <div key={time} className="flex border-b border-slate-100">
                <div className="w-12 sm:w-16 lg:w-20 p-2 text-xs sm:text-sm text-slate-600 border-r border-slate-200 text-right">
                  {time}
                </div>
                <div
                  className="flex-1 min-h-[40px] sm:min-h-[60px] p-2 hover:bg-slate-50 cursor-pointer"
                  onClick={() => handleCreateEvent(currentDate, time)}
                >
                  {slotEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-sm p-2 rounded mb-1 cursor-pointer hover:opacity-80"
                      style={{ backgroundColor: event.color, color: "white" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditEvent(event);
                      }}
                    >
                      <div className="font-medium">{event.title}</div>
                      {event.location && (
                        <div className="text-xs opacity-90 flex items-center mt-1">
                          <MapPin size={10} className="mr-1" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render agenda view
  const renderAgendaView = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const upcomingEvents = events
      .filter(
        (event) => event.startDate >= today && event.startDate <= nextWeek
      )
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    return (
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Próximos eventos
        </h3>

        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum evento próximo</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleEditEvent(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: event.color }}
                      />
                      <h4 className="font-medium text-slate-800">
                        {event.title}
                      </h4>
                    </div>

                    <div className="text-sm text-slate-600 space-y-1">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-2" />
                        {event.allDay
                          ? "Dia inteiro"
                          : `${event.startDate
                              .toTimeString()
                              .slice(0, 5)} - ${event.endDate
                              .toTimeString()
                              .slice(0, 5)}`}
                      </div>

                      <div className="flex items-center">
                        <CalendarIcon size={14} className="mr-2" />
                        {formatDate(event.startDate)}
                      </div>

                      {event.location && (
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-2" />
                          {event.location}
                        </div>
                      )}
                    </div>

                    {event.description && (
                      <p className="text-sm text-slate-600 mt-2">
                        {event.description}
                      </p>
                    )}
                  </div>

                  <button className="p-1 hover:bg-slate-100 rounded">
                    <MoreHorizontal size={16} className="text-slate-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white border border-slate-200 rounded-lg",
        className
      )}
    >
      {/* Header - MELHORADO PARA MOBILE */}
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-slate-200">
        <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <ChevronRight size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="text-xs sm:text-sm px-2 sm:px-3"
            >
              Hoje
            </Button>
          </div>

          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-none">
            {getHeaderTitle()}
          </h2>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {/* View selector - MELHORADO PARA MOBILE */}
          <div className="flex bg-slate-100 rounded-lg p-1 flex-1 sm:flex-none">
            {(["month", "week", "day", "agenda"] as CalendarView[]).map(
              (viewType) => (
                <button
                  key={viewType}
                  onClick={() => setView(viewType)}
                  className={cn(
                    "px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded transition-colors flex-1 sm:flex-none",
                    view === viewType
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {viewType === "month" && (
                    <>
                      <span className="hidden sm:inline">Mês</span>
                      <span className="sm:hidden">M</span>
                    </>
                  )}
                  {viewType === "week" && (
                    <>
                      <span className="hidden sm:inline">Semana</span>
                      <span className="sm:hidden">S</span>
                    </>
                  )}
                  {viewType === "day" && (
                    <>
                      <span className="hidden sm:inline">Dia</span>
                      <span className="sm:hidden">D</span>
                    </>
                  )}
                  {viewType === "agenda" && (
                    <>
                      <span className="hidden sm:inline">Agenda</span>
                      <span className="sm:hidden">A</span>
                    </>
                  )}
                </button>
              )
            )}
          </div>

          <Button
            onClick={() => handleCreateEvent()}
            size="sm"
            className="flex-shrink-0 h-8 sm:h-10"
          >
            <Plus size={14} className="mr-1" />
            <span className="hidden sm:inline">Evento</span>
            <span className="sm:hidden">+</span>
          </Button>
        </div>
      </div>

      {/* Next Appointments Section */}
      <div className="p-3 sm:p-4">{renderNextAppointments()}</div>

      {/* Calendar content */}
      <div className="flex-1 overflow-hidden">
        {view === "month" && renderMonthView()}
        {view === "week" && renderWeekView()}
        {view === "day" && renderDayView()}
        {view === "agenda" && renderAgendaView()}
      </div>

      {/* Event Modal */}
      <Modal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          resetForm();
        }}
        title={isCreateMode ? "Criar Evento" : "Editar Evento"}
        size="lg"
      >
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="Título"
              value={eventForm.title}
              onChange={(e) =>
                setEventForm({ ...eventForm, title: e.target.value })
              }
              placeholder="Título do evento"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DatePicker
                label="Data de início"
                value={eventForm.startDate}
                onChange={(date) =>
                  date && setEventForm({ ...eventForm, startDate: date })
                }
              />

              {!eventForm.allDay && (
                <Select
                  label="Hora de início"
                  options={timeSlots.map((time) => ({
                    value: time,
                    label: time,
                  }))}
                  value={eventForm.startTime}
                  onChange={(time) =>
                    setEventForm({ ...eventForm, startTime: time })
                  }
                />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DatePicker
                label="Data de término"
                value={eventForm.endDate}
                onChange={(date) =>
                  date && setEventForm({ ...eventForm, endDate: date })
                }
              />

              {!eventForm.allDay && (
                <Select
                  label="Hora de término"
                  options={timeSlots.map((time) => ({
                    value: time,
                    label: time,
                  }))}
                  value={eventForm.endTime}
                  onChange={(time) =>
                    setEventForm({ ...eventForm, endTime: time })
                  }
                />
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="allDay"
                checked={eventForm.allDay}
                onChange={(e) =>
                  setEventForm({ ...eventForm, allDay: e.target.checked })
                }
                className="rounded border-slate-300"
              />
              <label
                htmlFor="allDay"
                className="text-sm font-medium text-slate-700"
              >
                Dia inteiro
              </label>
            </div>

            <Input
              label="Descrição"
              value={eventForm.description}
              onChange={(e) =>
                setEventForm({ ...eventForm, description: e.target.value })
              }
              placeholder="Descrição do evento"
            />

            <Input
              label="Local"
              value={eventForm.location}
              onChange={(e) =>
                setEventForm({ ...eventForm, location: e.target.value })
              }
              placeholder="Local do evento"
              leftIcon={<MapPin size={18} />}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Categoria"
                value={eventForm.category}
                onChange={(e) =>
                  setEventForm({ ...eventForm, category: e.target.value })
                }
                placeholder="Categoria do evento"
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cor
                </label>
                <div className="flex space-x-2">
                  {eventColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all",
                        eventForm.color === color
                          ? "border-slate-400 scale-110"
                          : "border-slate-200"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => setEventForm({ ...eventForm, color })}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          {!isCreateMode && (
            <Button
              variant="danger"
              onClick={() => {
                if (selectedEvent) {
                  onEventDelete?.(selectedEvent.id);
                  setIsEventModalOpen(false);
                  resetForm();
                }
              }}
              className="mr-auto"
            >
              <Trash2 size={14} className="mr-2" />
              Excluir
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => {
              setIsEventModalOpen(false);
              resetForm();
            }}
          >
            Cancelar
          </Button>

          <Button
            onClick={handleSubmitEvent}
            disabled={!eventForm.title.trim()}
          >
            {isCreateMode ? "Criar" : "Salvar"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
