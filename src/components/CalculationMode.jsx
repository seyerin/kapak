export function CalculationMode({ modes, currentMode, onModeChange }) {
  return (
    <div>
      <label className="block text-slate-600 font-spartan mb-2">Calculation Method</label>
      <div className="flex bg-slate-100 rounded-md p-1">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`
              w-full py-2 px-3 rounded-md font-spartan font-bold text-sm
              transition-all duration-300
              ${currentMode === mode.id
                ? 'bg-white text-slate-800 shadow-sm'
                : 'bg-transparent text-slate-600 hover:bg-slate-200'
              }
            `}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
}