import { TIME_PRESETS, DEFAULT_TIME } from './constants';

interface TimeSelectorProps {
    selectedDate: Date | null;
    selectedHour: number;
    selectedMinute: number;
    onHourChange: (hour: number) => void;
    onMinuteChange: (minute: number) => void;
    onContinue: () => void;
    onSkip: () => void;
    isLoading: boolean;
    colorScheme: 'blue' | 'emerald';
}

export function TimeSelector({
    selectedDate,
    selectedHour,
    selectedMinute,
    onHourChange,
    onMinuteChange,
    onContinue,
    onSkip,
    isLoading,
    colorScheme
}: TimeSelectorProps) {
    const colors = {
        blue: {
            gradient: 'from-blue-600 to-cyan-600',
            button: 'from-blue-500 to-cyan-500',
            preset: 'from-blue-500 to-cyan-500',
            ring: 'ring-blue-400',
            border: 'border-blue-300',
            hover: 'hover:bg-blue-100',
            hoverBorder: 'hover:border-blue-400'
        },
        emerald: {
            gradient: 'from-emerald-600 to-teal-600',
            button: 'from-emerald-500 to-teal-500',
            preset: 'from-emerald-500 to-teal-500',
            ring: 'ring-emerald-400',
            border: 'border-emerald-300',
            hover: 'hover:bg-emerald-100',
            hoverBorder: 'hover:border-emerald-400'
        }
    }[colorScheme];

    const handleSkip = () => {
        onHourChange(DEFAULT_TIME.hour);
        onMinuteChange(DEFAULT_TIME.minute);
        onSkip();
    };

    return (
        <div className={`bg-linear-to-br from-${colorScheme}-50 to-${colorScheme === 'blue' ? 'cyan' : 'teal'}-50 rounded-3xl p-8 shadow-xl border border-${colorScheme}-100`}>
            <div className="text-center mb-8">
                <h3 className={`text-5xl font-bold bg-linear-to-r ${colors.gradient} bg-clip-text text-transparent mb-2 animate-in fade-in duration-500`}>
                    {selectedHour.toString().padStart(2, '0')}:{selectedMinute.toString().padStart(2, '0')}
                </h3>
                <p className="text-gray-600 text-lg">
                    {selectedDate?.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
            </div>

            <div className="mb-8">
                <p className="text-sm font-semibold text-gray-600 mb-3 text-center">Quick Select</p>
                <div className="grid grid-cols-4 gap-2">
                    {TIME_PRESETS.map((time) => (
                        <button
                            key={time.label}
                            onClick={() => {
                                onHourChange(time.hour);
                                onMinuteChange(time.minute);
                            }}
                            className={`
                                px-4 py-3 rounded-xl font-semibold transition-all duration-200
                                ${selectedHour === time.hour && selectedMinute === time.minute
                                    ? `bg-linear-to-br ${colors.preset} text-white shadow-lg scale-105`
                                    : `bg-white ${colors.hover} text-gray-800 hover:scale-105 hover:shadow-md`
                                }
                            `}
                        >
                            {time.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-3 items-end justify-center mb-8">
                <div className="flex-1 max-w-35">
                    <label className="block text-xs font-semibold text-gray-600 mb-2 text-center">Hour</label>
                    <input
                        type="number"
                        min="0"
                        max="23"
                        value={selectedHour}
                        onChange={(e) => onHourChange(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                        className={`w-full px-4 py-4 rounded-xl bg-white text-gray-800 text-center text-3xl font-bold focus:outline-none focus:ring-3 focus:${colors.ring} transition-all border-2 border-gray-200 shadow-md ${colors.border}`}
                    />
                </div>
                <div className="text-3xl font-bold text-gray-400 pb-4">:</div>
                <div className="flex-1 max-w-35">
                    <label className="block text-xs font-semibold text-gray-600 mb-2 text-center">Minute</label>
                    <input
                        type="number"
                        min="0"
                        max="59"
                        value={selectedMinute}
                        onChange={(e) => onMinuteChange(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                        className={`w-full px-4 py-4 rounded-xl bg-white text-gray-800 text-center text-3xl font-bold focus:outline-none focus:ring-3 focus:${colors.ring} transition-all border-2 border-gray-200 shadow-md ${colors.border}`}
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleSkip}
                    disabled={isLoading}
                    className={`flex-1 bg-white text-gray-700 border-2 border-gray-300 ${colors.hoverBorder} px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    Skip ({DEFAULT_TIME.hour.toString().padStart(2, '0')}:00)
                </button>
                <button
                    onClick={onContinue}
                    disabled={isLoading}
                    className={`flex-2 bg-linear-to-r ${colors.button} text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
