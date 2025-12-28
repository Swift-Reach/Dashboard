import { ChevronLeft, ChevronRight } from 'lucide-react';
import { generateCalendarDays, isSameDay, isToday, isPastDate } from '@/lib/utils';
import { WEEKDAY_LABELS } from './constants';

interface CalendarPickerProps {
    selectedDate: Date | null;
    calendarMonth: Date;
    onDateSelect: (date: Date) => void;
    onMonthChange: (delta: number) => void;
    isLoading: boolean;
}

export function CalendarPicker({
    selectedDate,
    calendarMonth,
    onDateSelect,
    onMonthChange,
    isLoading
}: CalendarPickerProps) {
    return (
        <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 shadow-xl border border-emerald-100">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => onMonthChange(-1)}
                        className="p-2.5 rounded-xl hover:bg-emerald-100 transition-all duration-200 hover:scale-110"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <h3 className="text-xl font-bold text-gray-800">
                        {calendarMonth.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button
                        onClick={() => onMonthChange(1)}
                        className="p-2.5 rounded-xl hover:bg-emerald-100 transition-all duration-200 hover:scale-110"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                    {WEEKDAY_LABELS.map((day, i) => (
                        <div key={i} className="text-center text-xs font-bold text-gray-500 py-1">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {generateCalendarDays(calendarMonth).map((date, index) => {
                        if (!date) {
                            return <div key={`empty-${index}`} className="aspect-square" />;
                        }

                        const isPast = isPastDate(date);
                        const isSelected = isSameDay(date, selectedDate);
                        const isTodayDate = isToday(date);

                        return (
                            <button
                                key={index}
                                onClick={() => !isPast && onDateSelect(date)}
                                disabled={isPast || isLoading}
                                className={`
                                    aspect-square rounded-xl font-semibold text-sm transition-all duration-200
                                    ${isPast
                                        ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                                        : isSelected
                                        ? 'bg-linear-to-br from-emerald-500 to-teal-500 text-white shadow-lg scale-110 ring-2 ring-emerald-300'
                                        : isTodayDate
                                        ? 'bg-linear-to-br from-blue-400 to-cyan-400 text-white hover:scale-110 hover:shadow-lg'
                                        : 'bg-white hover:bg-emerald-100 text-gray-800 hover:scale-110 hover:shadow-md border border-gray-100'
                                    }
                                `}
                            >
                                {date.getDate()}
                            </button>
                        );
                    })}
                </div>
            </div>

            {selectedDate && (
                <div className="mt-6 pt-6 border-t border-emerald-200">
                    <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-emerald-200 mb-4">
                        <p className="text-sm text-gray-600 mb-1">Selected Date</p>
                        <p className="text-lg font-bold text-emerald-600">
                            {selectedDate.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
