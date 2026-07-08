import Sidebar from "@/components/teacher/Sidebar";
import Navbar from "@/components/teacher/Navbar";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar />

        <main className="p-5">
          {children}
        </main>
      </div>
    </div>
  );
}