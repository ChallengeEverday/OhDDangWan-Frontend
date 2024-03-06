import { Divider, Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <main className="w-full">
      <h1 className="font-bold text-xl md:text-2xl">오땡완을 시작해보세요!</h1>
      <Divider className="my-4" />
      <Skeleton className="w-[152px] h-9 rounded-xl" />
    </main>
  )
}