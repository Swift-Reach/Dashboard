interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
  color?: 'blue' | 'green' | 'yellow' | 'red';
}

export function ProgressBar({
  value,
  max,
  className = '',
  showLabel = false,
  color = 'blue',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colors = {
    blue: 'bg-blue-600 dark:bg-blue-500',
    green: 'bg-green-600 dark:bg-green-500',
    yellow: 'bg-yellow-600 dark:bg-yellow-500',
    red: 'bg-red-600 dark:bg-red-500',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${colors[color]} transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 text-right">
          {value} / {max}
        </p>
      )}
    </div>
  );
}
