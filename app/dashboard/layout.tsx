import SideNav from '@/app/ui/dashboard/sidenav';
import { FC, PropsWithChildren } from 'react';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden max-md:flex-col max-md:overflow-visible">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow overflow-y-auto p-12 max-md:p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
