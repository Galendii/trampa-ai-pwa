"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Calendar, X } from "lucide-react";

import { addDays, cn, formatDate } from "../../lib/utils";

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  minRange?: number; // Minimum days between start and end
  maxRange?: number; // Maximum days between start and end
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

export function DateRangePicker({
  value = { startDate: null, endDate: null },
  onChange,
  label,
  placeholder = "Selecione um período",
  error,
  disabled,
  minDate,
  maxDate,
  minRange = 0,
  maxRange,
  fullWidth = false,
  className,
  id,
}: DateRangePickerProps) {
  const generatedId = `daterange-${useId()}`;
  const componentId = id || generatedId;
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(
    value.startDate ? new Date(value.startDate) : new Date()
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selectingStart, setSelectingStart] = useState(!value.startDate);
  const [inputValue, setInputValue] = useState("");
  const calendarId = `${componentId}-calendar`;
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Format the input value based on the selected range
  useEffect(() => {
    if (value.startDate && value.endDate) {
      setInputValue(
        `${formatDate(value.startDate)} - ${formatDate(value.endDate)}`
      );
    } else if (value.startDate) {
      setInputValue(`${formatDate(value.startDate)} - Selecione`);
    } else {
      setInputValue("");
    }
  }, [value]);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (selectingStart) {
      // Selecting start date
      onChange?.({ startDate: date, endDate: null });
      setSelectingStart(false);
      setMonth(date);
    } else {
      // Selecting end date
      const { startDate } = value;

      if (startDate) {
        // Ensure end date is after start date
        if (date < startDate) {
          onChange?.({ startDate: date, endDate: startDate });
        } else {
          // Check min/max range constraints
          const daysDiff = Math.round(
            (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (minRange && daysDiff < minRange) {
            // If selected range is too short, extend to minimum
            const endDate = addDays(startDate, minRange);
            onChange?.({ startDate, endDate });
          } else if (maxRange && daysDiff > maxRange) {
            // If selected range is too long, limit to maximum
            const endDate = addDays(startDate, maxRange);
            onChange?.({ startDate, endDate });
          } else {
            onChange?.({ startDate, endDate: date });
          }
        }

        setSelectingStart(true);
        setIsOpen(false);
      }
    }
  };

  // Clear the date range
  const handleClear = () => {
    onChange?.({ startDate: null, endDate: null });
    setSelectingStart(true);
    inputRef.current?.focus();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    // First day of the month
    const firstDay = new Date(year, monthIndex, 1);
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Last day of the month
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Days from previous month to fill the first week
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    // Generate calendar grid
    const days: (Date | null)[] = [];

    // Add days from previous month
    const prevMonth = new Date(year, monthIndex, 0);
    const prevMonthDays = prevMonth.getDate();

    for (
      let i = prevMonthDays - daysFromPrevMonth + 1;
      i <= prevMonthDays;
      i++
    ) {
      days.push(new Date(year, monthIndex - 1, i));
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, monthIndex, i));
    }

    // Add days from next month to complete the grid
    const remainingDays = 42 - days.length; // 6 rows x 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, monthIndex + 1, i));
    }

    return days;
  };

  // Check if a date is in the selected range
  const isInRange = (date: Date) => {
    const { startDate, endDate } = value;
    if (!startDate) return false;
    if (!endDate && !hoverDate) return false;

    const end = endDate || hoverDate;
    if (!end) return false;

    return date >= startDate && date <= end;
  };

  // Check if a date is the start date
  const isStartDate = (date: Date) => {
    return (
      value.startDate &&
      date.getDate() === value.startDate.getDate() &&
      date.getMonth() === value.startDate.getMonth() &&
      date.getFullYear() === value.startDate.getFullYear()
    );
  };

  // Check if a date is the end date
  const isEndDate = (date: Date) => {
    return (
      value.endDate &&
      date.getDate() === value.endDate.getDate() &&
      date.getMonth() === value.endDate.getMonth() &&
      date.getFullYear() === value.endDate.getFullYear()
    );
  };

  // Check if a date is in the current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month.getMonth();
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is disabled
  const isDisabled = (date: Date) => {
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999)))
      return true;

    // If selecting end date, disable dates that would violate min/max range
    if (!selectingStart && value.startDate) {
      const daysDiff = Math.round(
        (date.getTime() - value.startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (minRange && daysDiff < minRange) return true;
      if (maxRange && daysDiff > maxRange) return true;
    }

    return false;
  };

  // Navigate to previous month
  const goToPrevMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));
  };

  // Format month and year for display
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  };

  // Days of the week
  const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  return (
    <div
      className={cn("relative", fullWidth ? "w-full" : "", className)}
      ref={containerRef}
    >
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <Calendar
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          id={id}
          ref={inputRef}
          type="text"
          className={cn(
            "w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white",
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-500 focus:ring-red-500/20 focus:border-red-500"
          )}
          placeholder={placeholder}
          value={inputValue}
          readOnly
          onFocus={() => !disabled && setIsOpen(true)}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-controls={isOpen ? calendarId : undefined}
          aria-expanded={isOpen}
        />
        {inputValue && !disabled && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={handleClear}
            aria-label="Limpar período"
          >
            <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
          </button>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}

      {isOpen && (
        <div
          id={calendarId}
          className="absolute z-10 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-3 sm:p-4 w-full max-w-xs sm:w-72"
        >
          <div className="mb-2 text-center">
            <span className="text-xs font-medium text-slate-500">
              {selectingStart
                ? "Selecione a data inicial"
                : "Selecione a data final"}
            </span>
          </div>

          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <button
              type="button"
              onClick={goToPrevMonth}
              className="p-1 sm:p-1.5 hover:bg-slate-100 rounded-full"
              aria-label="Mês anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h3 className="text-xs sm:text-sm font-medium text-slate-700">
              {formatMonthYear(month)}
            </h3>
            <button
              type="button"
              onClick={goToNextMonth}
              className="p-1 sm:p-1.5 hover:bg-slate-100 rounded-full"
              aria-label="Próximo mês"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-slate-500 py-1"
              >
                {day}
              </div>
            ))}

            {generateCalendarDays().map((date, index) => {
              if (!date) return <div key={index} className="p-1" />;

              const isStart = isStartDate(date);
              const isEnd = isEndDate(date);
              const inRange = isInRange(date);
              const isCurrent = isCurrentMonth(date);
              const isCurrentDay = isToday(date);
              const disabled = isDisabled(date);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => !disabled && handleDateSelect(date)}
                  onMouseEnter={() =>
                    !selectingStart && value.startDate && setHoverDate(date)
                  }
                  onMouseLeave={() => setHoverDate(null)}
                  disabled={disabled}
                  className={cn(
                    "h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-xs sm:text-sm relative",
                    (isStart || isEnd) && "bg-blue-600 text-white z-10",
                    inRange &&
                      !isStart &&
                      !isEnd &&
                      "bg-blue-100 text-blue-800",
                    !inRange &&
                      !isStart &&
                      !isEnd &&
                      isCurrent &&
                      "text-slate-700 hover:bg-slate-100",
                    !inRange &&
                      !isStart &&
                      !isEnd &&
                      !isCurrent &&
                      "text-slate-400",
                    isCurrentDay &&
                      !isStart &&
                      !isEnd &&
                      "border border-blue-600",
                    disabled && "opacity-50 cursor-not-allowed"
                  )}
                  aria-label={date.toLocaleDateString()}
                  aria-selected={!!isStart || !!isEnd}
                  aria-disabled={disabled}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-3 sm:mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => {
                onChange?.({ startDate: null, endDate: null });
                setSelectingStart(true);
              }}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Limpar
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-600 hover:text-slate-800"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
