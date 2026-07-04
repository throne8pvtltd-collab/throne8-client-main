type Props = {
  location: { label: string; pct: number }[];
  industry: { label: string; pct: number }[];
};

export default function AudienceInsights({ location, industry }: Props) {
  return (
    <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-[#4a3728] mb-4">Audience Insights</h3>
      <div className="grid grid-cols-2 gap-4">
        {[{ title: 'By Location', data: location }, { title: 'By Industry', data: industry }].map(group => (
          <div key={group.title}>
            <p className="text-xs font-semibold text-[#4a3728]/60 mb-2">{group.title}</p>
            <div className="space-y-2">
              {group.data.map(item => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[11px] text-[#4a3728]/70">{item.label}</span>
                    <span className="text-[11px] font-bold text-[#4a3728]">{item.pct}%</span>
                  </div>
                  <div className="w-full bg-[#e0d8cf] rounded-full h-1.5">
                    <div className="bg-[#4a3728] h-1.5 rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}