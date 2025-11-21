export function Input({ label, value, onChange, placeholder, className }) {
  return (
    <div>
      {label && <label className="block text-slate-600 font-spartan mb-2">{label}</label>}
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full bg-slate-100 rounded-md py-2 px-4 text-right font-spartan font-bold text-2xl text-slate-800 
            focus:outline-none focus:ring-2 focus:ring-slate-500
            appearance-none m-0 [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
            ${className}
          `}
        />
      </div>
    </div>
  );
}