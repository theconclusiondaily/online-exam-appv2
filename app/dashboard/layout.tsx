import StudentSidebar
from "@/components/layout/StudentSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <div
      className="
        flex
        min-h-screen
        bg-gradient-to-br
        from-[#EEF3FF]
        via-white
        to-[#FFF8EA]
      "
    >

      <StudentSidebar />

      <main
  className="
    flex-1
    min-w-0
    overflow-y-auto
  "
>

        {children}

      </main>

    </div>

  );
}