import type { Metadata } from "next";
import { Sidebar } from "./(ui)/sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Sales performance dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <PointsHeader /> */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}


