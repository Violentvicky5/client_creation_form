"use client";

export default function ClientFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 py-10 px-4">
      <div className="w-full max-w-[720px] lg:max-w-[40vw] bg-white rounded-4xl  min-h-[300px] flex flex-col p-2">
        {children}
      </div>
    </div>
  );
}
