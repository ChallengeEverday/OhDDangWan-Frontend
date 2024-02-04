"use client"

import { Card, Chip, Divider, Input, Textarea } from "@nextui-org/react"
import { useRef, useState } from "react"
import { LuUpload } from "react-icons/lu"

export default function CreateChallengePage() {
  const [tag, setTag] = useState<string>("")
  const [tags, setTags] = useState<string[]>(["오운완", "런닝", "나이키"])

  const photoRef = useRef<HTMLInputElement>(null)
  const [photo, setPhoto] = useState<File | null>(null)

  const previewStyle = photo
    ? {
        background: `url(${URL.createObjectURL(photo)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {}

  return (
    <main className="w-full">
      <h1 className="font-bold text-xl md:text-2xl">챌린지 생성하기</h1>
      <Divider className="my-3 md:my-6" />

      <div className="flex flex-col md:flex-row gap-5">
        <section className="w-full md:w-1/2">
          <h2 className="mb-1 font-bold text-base">대표사진</h2>
          <span className="text-sm text-foreground-600">
            챌린지를 대표할 사진을 업로드해주세요.
          </span>
          <Card className="mt-2 w-full flex flex-col h-80 md:h-96 bg-default-100 text-forground-600">
            <input
              type="file"
              ref={photoRef}
              className="hidden"
              onChange={(e) => {
                if (!e.target.files) return
                setPhoto(e.target.files[0])
                console.log(e.target.files[0])
              }}
            />
            <button
              onClick={() => {
                photoRef.current?.click()
              }}
              style={previewStyle}
              className="w-full h-full relative flex flex-col justify-center items-center"
            >
              <div className="rounded-full py-2 px-4 text-sm bg-foreground-100/[.5]">
                <span className="flex justify-center gap-2 items-center">
                  <LuUpload size={20} />
                  대표사진 업로드
                </span>
              </div>
            </button>
          </Card>
        </section>

        <section className="flex md:w-1/2 flex-col justify-start items-center gap-4">
          <div className="w-full">
            <Input
              labelPlacement="outside"
              placeholder="오운완! 인증해요~!"
              type="text"
              variant="flat"
              label="챌린지 제목"
              isRequired
              classNames={{
                label: "font-bold text-base",
              }}
            />
          </div>
          <div className="w-full">
            <Textarea
              variant="bordered"
              label="챌린지 소개"
              labelPlacement="outside"
              placeholder="예시) 매일 운동하고 인증해요! 헬스, 필라테스, 런닝, 홈트레이닝, 어떤 운동이든 함께 해봐요!"
              className="col-span-12 md:col-span-6 mb-6 md:mb-0"
              classNames={{
                label: "font-bold text-base",
              }}
            />
          </div>
          <div className="w-full">
            <Input
              labelPlacement="outside"
              placeholder="#오운완 #오공완"
              type="text"
              variant="flat"
              label="검색 태그"
              classNames={{
                label: "font-bold text-base",
              }}
              value={tag}
              onChange={(e) => {
                setTag(e.target.value)
              }}
              onKeyUp={(e) => {
                // 엔터 키 입력시 태그 추가
                if (e.key === "Enter" && tag.trim() !== "") {
                  setTags([...tags, tag])
                  setTag("")
                }
              }}
            />

            <div className="w-full overflow-x-scroll my-2 flex gap-1">
              {tags.map((tag, index) => (
                <Chip
                  onClose={() => {
                    setTags(tags.filter((_, i) => i !== index))
                  }}
                  className="py-4"
                  variant="flat"
                  color="primary"
                  key={tag}
                >
                  #{tag}
                </Chip>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
