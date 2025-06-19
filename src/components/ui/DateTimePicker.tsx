"use client";
import { cn, formatDate } from "../../lib/utils";
import { Calendar, Clock, X } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { Select } from "./Select";
import { useId } from "react";

export interface DateTimeRange {
  date: Date | null;
  startTime: string;
  endTime: string;
}

export interface DateTimePickerProps {
  value?: DateTimeRange;
  onChange?: (value: DateTimeRange) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  minTime?: string; // "08:00"
  maxTime?: string; // "22:00"
  timeSlotDuration?: number; // minutes
  defaultDuration?: number; // minutes
  fullWidth?: boolean;
  className?: string;
  id?: string;
  required?: boolean;
}

export function DateTimePicker({
  value = { date: null, startTime: "09:00", endTime: "10:00" },
  onChange,
  label,
  error,
  disabled,
  minDate,
  maxDate,
  minTime = "06:00",
  maxTime = "23:00",
  timeSlotDuration = 15,
  defaultDuration = 60,
  fullWidth = false,
  className,
  id,
  required = false,
}: DateTimePickerProps) {
  const generatedId = `datetime-picker-${useId()}`;
  const componentId = id || generatedId;

  // Generate time slots
  const generateTimeSlots = () => {
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
      slots.push({ value: timeString, label: timeString });

      currentMinute += timeSlotDuration;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Calculate end time based on start time and default duration
  const calculateEndTime = (startTime: string) => {
    const [hour, minute] = startTime.split(":").map(Number);
    const startMinutes = hour * 60 + minute;
    const endMinutes = startMinutes + defaultDuration;
    const endHour = Math.floor(endMinutes / 60);
    const endMinute = endMinutes % 60;

    // Make sure end time doesn't exceed max time
    const [maxHour, maxMinute] = maxTime.split(":").map(Number);
    const maxMinutes = maxHour * 60 + maxMinute;

    if (endMinutes > maxMinutes) {
      return maxTime;
    }

    return `${endHour.toString().padStart(2, "0")}:${endMinute
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle date change
  const handleDateChange = (date: Date | null) => {
    onChange?.({
      ...value,
      date,
    });
  };

  // Handle start time change
  const handleStartTimeChange = (startTime: string) => {
    const newEndTime = calculateEndTime(startTime);
    onChange?.({
      ...value,
      startTime,
      endTime: newEndTime,
    });
  };

  // Handle end time change
  const handleEndTimeChange = (endTime: string) => {
    onChange?.({
      ...value,
      endTime,
    });
  };

  // Clear all values
  const handleClear = () => {
    onChange?.({
      date: null,
      startTime: "09:00",
      endTime: "10:00",
    });
  };

  // Validate that end time is after start time
  const isEndTimeValid = () => {
    const [startHour, startMinute] = value.startTime.split(":").map(Number);
    const [endHour, endMinute] = value.endTime.split(":").map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    return endMinutes > startMinutes;
  };

  // Calculate duration
  const getDuration = () => {
    if (!isEndTimeValid()) return 0;
    const [startHour, startMinute] = value.startTime.split(":").map(Number);
    const [endHour, endMinute] = value.endTime.split(":").map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    return endMinutes - startMinutes;
  };

  const duration = getDuration();
  const hasError = error || !isEndTimeValid();

  return (
    <div className={cn("space-y-4", fullWidth ? "w-full" : "", className)}>
      {label && (
        <label
          htmlFor={componentId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Date Selection */}
      <div className="space-y-3">
        <DatePicker
          label="Data"
          value={value.date}
          onChange={handleDateChange}
          placeholder="Selecione a data"
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          fullWidth={fullWidth}
          error={error && !value.date ? "Data é obrigatória" : ""}
        />

        {/* Time Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Horário de início"
            options={timeSlots}
            value={value.startTime}
            onChange={handleStartTimeChange}
            disabled={disabled}
            fullWidth
          />

          <Select
            label="Horário de término"
            options={timeSlots}
            value={value.endTime}
            onChange={handleEndTimeChange}
            disabled={disabled}
            fullWidth
            error={
              !isEndTimeValid()
                ? "Horário de término deve ser após o início"
                : ""
            }
          />
        </div>

        {/* Duration Display */}
        {duration > 0 && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-slate-600">
              <Clock size={14} className="mr-1" />
              <span>
                Duração: {Math.floor(duration / 60)}h {duration % 60}min
              </span>
            </div>

            {(value.date ||
              value.startTime !== "09:00" ||
              value.endTime !== "10:00") && (
              <button
                type="button"
                onClick={handleClear}
                disabled={disabled}
                className="flex items-center text-slate-500 hover:text-slate-700 transition-colors"
              >
                <X size={14} className="mr-1" />
                Limpar
              </button>
            )}
          </div>
        )}

        {/* Summary */}
        {value.date && isEndTimeValid() && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Calendar
                size={16}
                className="text-blue-600 mt-0.5 flex-shrink-0"
              />
              <div className="text-sm">
                <div className="font-medium text-blue-900">
                  {formatDate(value.date)}
                </div>
                <div className="text-blue-700">
                  {value.startTime} - {value.endTime}
                  <span className="text-blue-600 ml-2">
                    ({Math.floor(duration / 60)}h {duration % 60}min)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {hasError && typeof error === "string" && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

// Preset duration buttons component
export interface DurationPresetsProps {
  onSelect: (minutes: number) => void;
  className?: string;
}

export function DurationPresets({ onSelect, className }: DurationPresetsProps) {
  const presets = [
    { label: "15min", minutes: 15 },
    { label: "30min", minutes: 30 },
    { label: "45min", minutes: 45 },
    { label: "1h", minutes: 60 },
    { label: "1h 30min", minutes: 90 },
    { label: "2h", minutes: 120 },
  ];

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <span className="text-xs font-medium text-slate-600 self-center">
        Duração rápida:
      </span>
      {presets.map((preset) => (
        <button
          key={preset.minutes}
          type="button"
          onClick={() => onSelect(preset.minutes)}
          className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}

// Enhanced DateTimePicker with presets
export interface EnhancedDateTimePickerProps extends DateTimePickerProps {
  showDurationPresets?: boolean;
}

export function EnhancedDateTimePicker({
  showDurationPresets = true,
  ...props
}: EnhancedDateTimePickerProps) {
  const handleDurationSelect = (minutes: number) => {
    if (!props.value?.startTime) return;

    const [hour, minute] = props.value.startTime.split(":").map(Number);
    const startMinutes = hour * 60 + minute;
    const endMinutes = startMinutes + minutes;
    const endHour = Math.floor(endMinutes / 60);
    const endMinute = endMinutes % 60;

    const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute
      .toString()
      .padStart(2, "0")}`;

    props.onChange?.({
      ...props.value,
      endTime,
    });
  };

  return (
    <div className="space-y-4">
      <DateTimePicker {...props} />
      {showDurationPresets && (
        <DurationPresets onSelect={handleDurationSelect} />
      )}
    </div>
  );
}
