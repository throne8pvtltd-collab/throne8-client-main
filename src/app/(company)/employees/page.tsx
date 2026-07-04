'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useAppSelector } from '@/core/store/store.hooks';
import EmployeeRow, { EmployeeRowSkeleton } from '../../../features/company/components/employees/EmployeeRow';
import { addEmployee, removeEmployee, toggleAdvocacy, setEmployees } from '@/features/company/store/slices/employeesslice';
import CompanyService from '@/lib/api/company.service';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useProfile } from '@/features/profile/hooks/useProfile';
import AddEmployeeModal from '@/features/company/modal/AddEmployeeModal';


export default function EmployeesPage() {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(s => s.employees?.items ?? []);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // ── Company ID from profile (same as Sidebar) ──
  const { user } = useAuth();
  const { userProfileData, loadProfile } = useProfile();

  useEffect(() => {
    if (user) {
      // console.log('👤 User loaded:', user);
      loadProfile();
    }
  }, [user]);

  const companyId = userProfileData?.companyId ?? null;

  // console.log('🏢 userProfileData:', userProfileData);
  console.log('🏢 companyId from profile:', companyId);

  // ── Fetch employees once companyId is available ──
  useEffect(() => {
    if (!companyId) {
      console.warn('⚠️ companyId not yet available, skipping fetch...');
      setLoading(false);
      return;
    }

    // console.log('✅ Fetching employees for companyId:', companyId);
    setLoading(true);

    CompanyService.getAllEmployees(companyId)
      .then(empResult => {
        // console.log('✅ Employees API response:', empResult);
        const apiEmployees = empResult?.data?.result ?? [];
        console.log('✅ Employees extracted from API response:', apiEmployees);
        const mapped = apiEmployees.map((e: any) => ({
          id: e.employeeId ?? e.id,
          name: `${e.firstName} ${e.lastName}`,
          title: e.designation ?? '',
          dept: e.department ?? '',
          role: 'member' as const,
          avatar: `${e.firstName?.[0] ?? ''}${e.lastName?.[0] ?? ''}`,
          advocacy: false,
          isAdvocate: e.isAdvocate ?? false,
          active: e.isActive === true,
          joined: e.joinDate
            ? new Date(e.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            : '',
        }));
        // console.log('✅ Mapped employees:', mapped);
        dispatch(setEmployees(mapped));
      })
      .catch(err => {
        console.error('❌ Employees fetch failed:', err);
      })
      .finally(() => setLoading(false));

  }, [companyId, dispatch]);

  const [filterActive, setFilterActive] = useState(false);

  const list = useMemo(
    () => filterActive ? employees.filter(e => e.active) : employees,
    [filterActive, employees]
  );

  const stats = useMemo(() => ({
    total: employees.length,
    active: employees.filter(e => e.active).length,
    advocacyOn: employees.filter(e => e.isAdvocate).length,
    departments: new Set(employees.map(e => e.dept)).size,
  }), [employees]);

  const handleEmployeeAdded = useCallback((apiEmployee: any) => {
    const newEmp = {
      id: apiEmployee.employeeId ?? apiEmployee.id,
      name: `${apiEmployee.firstName} ${apiEmployee.lastName}`,
      title: apiEmployee.designation ?? '',
      dept: apiEmployee.department ?? '',
      role: 'member' as const,
      avatar: `${apiEmployee.firstName?.[0] ?? ''}${apiEmployee.lastName?.[0] ?? ''}`,
      advocacy: false,
      isAdvocate: apiEmployee.isAdvocate ?? false,
      active: apiEmployee.isActive === true,
      joined: apiEmployee.joinDate
        ? new Date(apiEmployee.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : '',
    };
    dispatch(addEmployee(newEmp));
    setShowModal(false);
  }, [dispatch]);

  const handleToggleAdvocacy = useCallback(
    (id: string) => dispatch(toggleAdvocacy(id)),
    [dispatch]
  );

  const handleRemove = useCallback(
    (id: string) => dispatch(removeEmployee(id)),
    [dispatch]
  );

  const toggleFilter = useCallback(() => setFilterActive(v => !v), []);

  const STAT_ITEMS = [
    { label: 'Total', value: stats.total },
    { label: 'Active', value: stats.active },
    { label: 'Advocacy On', value: stats.advocacyOn },
    { label: 'Departments', value: stats.departments },
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#4a3728]">Employees</h1>
            <p className="text-sm text-[#4a3728]/60 mt-0.5">{employees.length} team members</p>
          </div>
          <div className="flex gap-2">
            <button onClick={toggleFilter}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all duration-200
              ${filterActive ? 'bg-[#4a3728] text-[#f6ede8] border-[#4a3728]' : 'bg-[#f6ede8] text-[#4a3728] border-[#e0d8cf] hover:bg-[#e0d8cf]'}`}>
              Active Only
            </button>
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#4a3728] text-[#f6ede8] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#6b4e3d] transition-colors shadow-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Employee
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STAT_ITEMS.map(s => (
            <div key={s.label} className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#4a3728]">{s.value}</p>
              <p className="text-xs text-[#4a3728]/60 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#e0d8cf] bg-[#e0d8cf]/30">
                  {['Employee', 'Department', 'Role', 'Advocacy', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-[#4a3728]/60 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                    <EmployeeRowSkeleton key={i} />
                  ))
                  : list.map(emp => (
                    <EmployeeRow
                      key={emp.id}
                      emp={emp}
                      companyId={companyId ?? ''} // ✅ ADD
                      advocacyOn={emp.isAdvocate}
                      onToggleAdvocacy={handleToggleAdvocacy}
                      onRemove={handleRemove}
                    />
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <AddEmployeeModal
          companyId={companyId ?? ''}
          onSuccess={handleEmployeeAdded}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}