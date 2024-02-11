import Link from "next/link"
import syntaxHighlight from "./syntaxHighlight"

export default function DebugLog({
  object,
  modal,
}: {
  object: any
  modal?: string
}) {
  return (
    <>
      {modal === "true" ? (
        <Link
          className="fixed bottom-2 right-2 rounded py-3 px-5 bg-warning-500 text-white"
          href="?modal=false"
        >
          디버깅 닫기
        </Link>
      ) : (
        <Link
          className="fixed bottom-2 right-2 rounded py-3 px-5  bg-success-500 text-white"
          href="?modal=true"
        >
          디버깅 열기
        </Link>
      )}
      {modal === "true" && (
        <pre
          className="max-w-80 overflow-scroll bg-gray-100 border p-5 fixed bottom-20 right-2 z-50 w-1/2 h-1/2"
          dangerouslySetInnerHTML={{
            __html: syntaxHighlight(JSON.stringify(object, null, 2)),
          }}
        />
      )}
    </>
  )
}
