export default function CategoryItem({
  isActive,
  emoji,
  category,
}: {
  isActive?: boolean
  emoji: string
  category: string
}) {
  return (
    <div
      className={`flex flex-col items-center ${isActive ? "text-primary-600 font-bold" : ""}`}
    >
      <div
        className={`text-4xl p-3 ${isActive ? "bg-primary-100" : "bg-foreground-100"} rounded-2xl`}
      >
        {emoji}
      </div>
      {category}
    </div>
  )
}
