import CategoryItem from "@/app/ui/CategoryButton"
import Editor from "@/app/ui/Editor/Editor"
import { useChallengeForm } from "@/app/utils/hooks/useCreateChallengeFormState"
import { useFormStatus } from "@/app/utils/hooks/useFormStatus"
import {
  CHALLENGE_CATEGORY_NAV_LIST,
  ChallengeCategory,
} from "@/app/utils/types/challenge"
import { Card, Chip, Divider, Image, Input, Textarea } from "@nextui-org/react"
import { useRef, useState } from "react"
import { LuUpload } from "react-icons/lu"

export default function ChallengeInfo() {
  const [challengeForm, dispatch] = useChallengeForm()
  const [formStatus] = useFormStatus()

  const [tag, setTag] = useState<string>("")

  const photoRef = useRef<HTMLInputElement>(null)
  const [photo, setPhoto] = useState<File | null>(null)

  return (
    <>
      <h2 className="font-bold text-xl mt-2 md:text-2xl">챌린지 정보</h2>
      <Divider className="mb-6 mt-1 md:mt-2" />

      <div className="flex flex-col md:flex-row gap-2 md:gap-5">
        <section className="flex grow-0 md:w-1/2 flex-col justify-start items-center gap-4 md:gap-6">
          <div className="w-full">
            <Input
              labelPlacement="outside"
              placeholder="오운완! 인증해요~!"
              type="text"
              variant="flat"
              label="챌린지 제목"
              classNames={{
                label: "font-bold text-base",
              }}
              value={challengeForm.title}
              onChange={(e) => {
                dispatch({
                  type: "SET_TITLE",
                  title: e.target.value,
                })
              }}
              isRequired
              isInvalid={formStatus.isInvalid && !challengeForm.title}
            />
          </div>
          <div className="w-full">
            <h2 className="mb-1 font-bold text-base">챌린지 소개</h2>
            {/* placeholder="예시) 매일 운동하고 인증해요! 헬스, 필라테스, 런닝, 홈트레이닝, 어떤 운동이든 함께 해봐요!" */}
            {/* isInvalid={formStatus.isInvalid && !challengeForm.description} */}
            <Editor
              content={challengeForm.description}
              setContent={(content) => {
                dispatch({
                  type: "SET_DESCRIPTION",
                  description: content,
                })
              }}
            />
          </div>
          <div className="w-full">
            <h2 className="mb-1 font-bold text-base">챌린지 인증 방법</h2>
            {/* placeholder="예시) 매주 월, 수, 금 마다 운동한 사진을 인증해주세요!" */}
            {/* isInvalid={
                formStatus.isInvalid && !challengeForm.authenticationDescription
              } */}
            <Editor
              content={challengeForm.authenticationDescription}
              setContent={(content) => {
                dispatch({
                  type: "SET_AUTHENTICATION_DESCRIPTION",
                  authenticationDescription: content,
                })
              }}
            />
          </div>
          <div className="w-full relative">
            <div className="pb-12">
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
                    setTag("")
                    dispatch({
                      type: "ADD_HASHTAG",
                      hashtag: tag,
                    })
                  }
                }}
              />
            </div>

            <div className="absolute left-0 bottom-0 w-full overflow-x-scroll my-2 flex gap-1">
              {challengeForm.hashtags.map((tag) => (
                <Chip
                  onClose={() => {
                    dispatch({
                      type: "REMOVE_HASHTAG",
                      hashtag: tag,
                    })
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
                dispatch({
                  type: "SET_THUMBNAIL_IMAGE",
                  thumbnailImage: e.target.files[0],
                })
              }}
            />
            <button
              onClick={() => {
                photoRef.current?.click()
              }}
              className="w-full h-full relative flex flex-col justify-center items-center"
            >
              {photo && (
                <Image
                  src={photo ? URL.createObjectURL(photo) : ""}
                  alt="대표사진"
                  className="object-cover w-full h-full"
                  height={80}
                  removeWrapper
                />
              )}

              <div className="absolute z-20 rounded-full py-2 px-4 text-sm bg-foreground-100/[.5]">
                <span className="flex justify-center gap-2 items-center">
                  <LuUpload size={20} />
                  대표사진 업로드
                </span>
              </div>
            </button>
          </Card>

          <div className="my-4">
            <h2 className="mb-1 font-bold text-base">카테고리</h2>
            <ul className="w-full overflow-x-scroll flex gap-4">
              {CHALLENGE_CATEGORY_NAV_LIST.map(
                ({ category: categoryLi, emoji }) => (
                  <li key={categoryLi}>
                    <button
                      onClick={() => {
                        dispatch({
                          type: "SET_CATEGORY",
                          category: ChallengeCategory[categoryLi],
                        })
                      }}
                    >
                      <CategoryItem
                        isActive={
                          challengeForm.category ===
                          ChallengeCategory[categoryLi]
                        }
                        emoji={emoji}
                        category={categoryLi}
                      />
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}
