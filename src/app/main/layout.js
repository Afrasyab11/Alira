import Sidebar from "@/common/Sidebar/Sidebar";
export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex-1 flex flex-col w-full">
        <div className="flex-1 w-full overflow-y-scroll">
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}
