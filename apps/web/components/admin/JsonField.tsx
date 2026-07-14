"use client";

interface JsonFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  rows?: number;
  hint?: string;
}

export function JsonField({ label, value, onChange, error, rows = 3, hint }: JsonFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#111111]">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        spellCheck={false}
        className={`w-full px-3 py-2 rounded-[6px] border font-mono text-[13px] text-[#111111] resize-y focus:outline-none focus:ring-2 focus:ring-offset-0 ${
          error
            ? "border-[#DC2626] focus:ring-[#DC2626]"
            : "border-[#D1D1D1] focus:ring-[#2D4A7A]"
        }`}
      />
      {error ? (
        <p className="text-[12px] text-[#DC2626]">{error}</p>
      ) : hint ? (
        <p className="text-[12px] text-[#999999] font-mono leading-relaxed">{hint}</p>
      ) : null}
    </div>
  );
}
