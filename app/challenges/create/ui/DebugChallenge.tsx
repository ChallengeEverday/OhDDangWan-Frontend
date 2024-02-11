import { useChallengeForm } from "@/app/utils/hooks/useCreateChallengeFormState"
import { Button } from "@nextui-org/react"
import { Tooltip } from "react-tooltip"

export default function DebugChallenge() {
  const [challengeForm] = useChallengeForm()

  return (
    <>
      <Button
        className="fixed bottom-5 right-5"
        data-tooltip-id="debug-challenge"
      >
        디버깅
      </Button>
      <Tooltip openOnClick id="debug-challenge">
        <pre
          dangerouslySetInnerHTML={{
            __html: syntaxHighlight(JSON.stringify(challengeForm, null, 2)),
          }}
        />
      </Tooltip>
    </>
  )
}

function syntaxHighlight(json: string) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2)
  }
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number"
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key"
        } else {
          cls = "string"
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean"
      } else if (/null/.test(match)) {
        cls = "null"
      }
      return '<span class="' + cls + '">' + match + "</span>"
    },
  )
}
