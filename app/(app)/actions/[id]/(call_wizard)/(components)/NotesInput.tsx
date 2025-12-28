import { LucideIcon } from 'lucide-react';

interface NotesInputProps {
    title: string;
    description: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    onSkip: () => void;
    onComplete: () => void;
    isLoading: boolean;
    icon: LucideIcon;
    colorScheme: 'blue' | 'sky' | 'emerald';
}

export function NotesInput({
    title,
    description,
    placeholder,
    value,
    onChange,
    onSkip,
    onComplete,
    isLoading,
    icon: Icon,
    colorScheme
}: NotesInputProps) {
    const colors = {
        blue: {
            bg: 'from-blue-50 to-indigo-50',
            border: 'border-blue-100',
            iconGlow: 'bg-blue-400',
            iconColor: 'text-blue-600',
            inputBorder: 'border-blue-200',
            inputFocus: 'focus:border-blue-400 focus:ring-blue-200',
            inputHover: 'hover:border-blue-300',
            buttonGradient: 'from-blue-500 to-cyan-500',
            skipHover: 'hover:border-blue-400'
        },
        sky: {
            bg: 'from-sky-50 to-blue-50',
            border: 'border-sky-100',
            iconGlow: 'bg-sky-400',
            iconColor: 'text-sky-600',
            inputBorder: 'border-sky-200',
            inputFocus: 'focus:border-sky-400 focus:ring-sky-200',
            inputHover: 'hover:border-sky-300',
            buttonGradient: 'from-blue-500 to-cyan-500',
            skipHover: 'hover:border-sky-400'
        },
        emerald: {
            bg: 'from-emerald-50 to-teal-50',
            border: 'border-emerald-100',
            iconGlow: 'bg-emerald-400',
            iconColor: 'text-emerald-600',
            inputBorder: 'border-emerald-200',
            inputFocus: 'focus:border-emerald-400 focus:ring-emerald-200',
            inputHover: 'hover:border-emerald-300',
            buttonGradient: 'from-emerald-500 to-teal-500',
            skipHover: 'hover:border-emerald-400'
        }
    }[colorScheme];

    return (
        <div className={`bg-linear-to-br ${colors.bg} rounded-3xl p-10 shadow-xl border ${colors.border}`}>
            <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                    <div className={`absolute inset-0 ${colors.iconGlow} blur-2xl opacity-20 rounded-full`}></div>
                    <Icon className={`w-16 h-16 ${colors.iconColor} relative`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full px-5 py-4 rounded-xl border-2 ${colors.inputBorder} ${colors.inputFocus} ${colors.inputHover} focus:ring-3 focus:outline-none transition-all resize-none text-gray-700 shadow-md`}
                rows={4}
            />
            <div className="flex gap-3 mt-6">
                <button
                    onClick={onSkip}
                    disabled={isLoading}
                    className={`flex-1 bg-white text-gray-700 border-2 border-gray-300 ${colors.skipHover} px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    Skip
                </button>
                <button
                    onClick={onComplete}
                    disabled={isLoading}
                    className={`flex-2 bg-linear-to-r ${colors.buttonGradient} text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                    Complete
                </button>
            </div>
        </div>
    );
}
