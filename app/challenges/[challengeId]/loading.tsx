import { Card, Divider, Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="w-full relative">
      <div className="flex flex-col justify-center gap-5 md:flex-row">
        <Skeleton className="w-full md:h-96 h-48 rounded-lg">
          <Card
            shadow="sm"
            className="w-full pb-14 pt-2 px-4 flex-col items-start space-y-5"
          >
            <div className="rounded-lg bg-default-300"></div>
          </Card>
        </Skeleton>

        <Card
          shadow="sm"
          className="w-full pb-14 pt-2 px-4 flex-col items-start"
        >
          <Skeleton className="rounded-lg w-3/5 h-3 my-5" />

          <Divider />

          <div className="max-w-[300px] w-full flex items-center gap-3 my-5">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12"/>
            </div>
            <div className="w-full">
              <Skeleton className="h-5 w-2/5 rounded-lg"/>
            </div>
          </div>

          <div className="w-full space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      </div>

      <div className="py-10">
        <Skeleton className="w-4/5 h-5 rounded-lg my-5" />
        <Skeleton className="w-4/5 h-5 rounded-lg my-5" />
        <Skeleton className="w-4/5 h-5 rounded-lg my-5" />
      </div>
    </div>
  );
}