export default function Loader({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#4a3728] font-medium">{message}</p>
      </div>
    </div>
  );
}