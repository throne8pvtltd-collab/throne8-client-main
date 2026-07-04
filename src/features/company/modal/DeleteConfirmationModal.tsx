'use client';

interface Props {
    employeeName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmationModal = ({ employeeName, onConfirm, onCancel }: Props) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-[#f6ede8] border border-[#e0d8cf] rounded-2xl shadow-xl w-full max-w-sm mx-4">

                {/* Header */}
                <div className="px-6 py-5 border-b border-[#e0d8cf]">
                    <h2 className="text-lg font-bold text-[#4a3728]">Remove Employee</h2>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                    <p className="text-sm text-[#4a3728]/80 mb-2">
                        Are you sure you want to permanently remove <span className="font-semibold">{employeeName}</span> from here?
                    </p>
                    <p className="text-xs text-[#4a3728]/50">
                        This action cannot be undone.
                    </p>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 border-t border-[#e0d8cf] flex gap-3">
                    <button onClick={onCancel}
                        className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border border-[#e0d8cf] text-[#4a3728] hover:bg-[#e0d8cf] transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors">
                        Yes, I'm Sure
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
