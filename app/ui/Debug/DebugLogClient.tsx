import { Button } from "@nextui-org/react"
import { useState } from "react"
import syntaxHighlight from "./syntaxHighlight"

export default function DebugLogClient({ object }: { object: any }) {
  const [modal, setModal] = useState(false)

  return (
    <>
      {modal ? (
        <Button
          className="fixed bottom-2 right-2 rounded p-5 bg-warning-500 text-white"
          onClick={() => setModal(false)}
        >
          디버깅 닫기
        </Button>
      ) : (
        <Button
          className="fixed bottom-2 right-2 rounded p-5 bg-success-500 text-white"
          onClick={() => setModal(true)}
        >
          디버깅 열기
        </Button>
      )}
      {modal && (
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
