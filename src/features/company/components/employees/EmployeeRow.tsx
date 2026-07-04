import { memo, useCallback, useState } from 'react';
import { updateEmployee, type Employee } from '@/features/company/store/slices/employeesslice';
import UpdateEmployeeModal from '../../modal/UpdateEmployeeModal';
import DeleteConfirmationModal from '../../modal/DeleteConfirmationModal';
import CompanyService from '@/lib/api/company.service';
import { useAppDispatch } from '@/store/hooks';

const ROLE_COLORS: Record<string, string> = {
  owner: 'bg-purple-100 text-purple-700',
  admin: 'bg-blue-100 text-blue-700',
  editor: 'bg-green-100 text-green-700',
  analyst: 'bg-yellow-100 text-yellow-700',
  member: 'bg-gray-100 text-gray-600',
};

interface Props {
  emp: Employee;
  companyId: string;
  advocacyOn: boolean;
  onToggleAdvocacy: (id: string) => void;
  onRemove: (id: string) => void;
}

// EmployeeRow.tsx — top pe add karo, imports ke baad
export function EmployeeRowSkeleton() {
  return (
    <tr className="border-b border-[#e0d8cf]/50">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#e0d8cf] rounded-xl animate-pulse" />
          <div className="space-y-1.5">
            <div className="h-3 w-28 bg-[#e0d8cf] rounded-full animate-pulse" />
            <div className="h-2.5 w-20 bg-[#e0d8cf]/70 rounded-full animate-pulse" />
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="h-3 w-20 bg-[#e0d8cf] rounded-full animate-pulse" />
      </td>
      <td className="px-5 py-4">
        <div className="h-5 w-14 bg-[#e0d8cf] rounded-full animate-pulse" />
      </td>
      <td className="px-5 py-4">
        <div className="w-10 h-5 bg-[#e0d8cf] rounded-full animate-pulse" />
      </td>
      <td className="px-5 py-4">
        <div className="h-5 w-14 bg-[#e0d8cf] rounded-full animate-pulse" />
      </td>
      <td className="px-5 py-4">
        <div className="flex gap-2">
          <div className="w-7 h-7 bg-[#e0d8cf] rounded-lg animate-pulse" />
          <div className="w-7 h-7 bg-[#e0d8cf] rounded-lg animate-pulse" />
        </div>
      </td>
    </tr>
  );
}

const EmployeeRow = memo(function EmployeeRow({ emp, advocacyOn, onToggleAdvocacy, onRemove, companyId }: Props) {
  // Component ke andar dispatch add karo:
  const dispatch = useAppDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = useCallback(() => onToggleAdvocacy(emp.id), [emp.id, onToggleAdvocacy]);

  const handleDeleteClick = useCallback(() => {
    setShowDeleteConfirm(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await CompanyService.deleteEmployee(emp.id);
      setShowDeleteConfirm(false);
      onRemove(emp.id);
    } catch (err: any) {
      console.error('❌ Delete failed:', err);
      setShowDeleteConfirm(false);
    }
  }, [emp.id, onRemove]);

  // handleUpdateSuccess update karo:
  const handleUpdateSuccess = useCallback((updatedEmployee: any) => {
    dispatch(updateEmployee({
      id: updatedEmployee.id,
      changes: {
        name: updatedEmployee.name,
        title: updatedEmployee.title,
        dept: updatedEmployee.dept,
        avatar: updatedEmployee.avatar,
      }
    }));
    setShowUpdateModal(false);
  }, [dispatch]);

  // console.log(`Rendering row for ${emp.name}`, emp);

  return (
    <>
      <tr className="border-b border-[#e0d8cf]/50 hover:bg-[#e0d8cf]/20 transition-colors">
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#4a3728] text-[#f6ede8] rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0">
              {emp.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#4a3728]">{emp.name}</p>
              <p className="text-xs text-[#4a3728]/50">{emp.title}</p>
            </div>
          </div>
        </td>
        <td className="px-5 py-4 text-sm text-[#4a3728]/70">{emp.dept}</td>
        <td className="px-5 py-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${ROLE_COLORS[emp.role]}`}>
            {emp.role}
          </span>
        </td>
        <td className="px-5 py-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${advocacyOn ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'
            }`}>
            {advocacyOn ? 'Advocate' : 'Not Advocate'}
          </span>
        </td>
        <td className="statusTd px-5 py-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${emp.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {emp.active ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td className="px-5 py-4">
          <div className="flex gap-2">
            <button onClick={() => setShowUpdateModal(true)} className="update-employee-btn p-1.5 bg-[#e0d8cf] rounded-lg hover:bg-[#4a3728] hover:text-[#f6ede8] text-[#4a3728] transition-all duration-200">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button onClick={handleDeleteClick} className="delete-employee-btn p-1.5 bg-[#e0d8cf] rounded-lg hover:bg-red-500 hover:text-white text-[#4a3728] transition-all duration-200">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </td>
      </tr>

      {showUpdateModal && (
        <UpdateEmployeeModal
          employee={emp}
          onSuccess={handleUpdateSuccess}
          companyId={companyId}
          onClose={() => setShowUpdateModal(false)}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmationModal
          employeeName={emp.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
});

export default EmployeeRow;