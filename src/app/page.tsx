import Image from "next/image";
import MainLayout from "../components/layout/MainLayout";

export default function Home({children}:{children: React.ReactNode}) {
  return (
    <>
      <MainLayout>
        <div>{children}</div>
      </MainLayout>
    </>
  );
}
