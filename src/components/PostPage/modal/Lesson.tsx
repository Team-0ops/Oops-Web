import { useMemo, useState } from "react";
import X from "../../../assets/icons/X.svg?react";
import { usePostLesson } from "../../../hooks/modal/usePostLesson";

type LessonProps = {
  postId: number;
  onClose: () => void;
};

const DEFAULT_TAGS = ["면접", "친구", "인생교훈", "먹을 거", "위로"];

export default function Lesson({ postId, onClose }: LessonProps) {
  const { mutate, isPending } = usePostLesson();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [tags, setTags] = useState<string[]>(DEFAULT_TAGS);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTag, setNewTag] = useState("");

  const canSubmit = useMemo(
    () => title.trim().length > 0 && content.trim().length > 0 && !isPending,
    [title, content, isPending]
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addTag = () => {
    const t = newTag.trim();
    if (!t) return;

    if (!tags.some((x) => x.toLowerCase() === t.toLowerCase())) {
      setTags((prev) => [...prev, t]);
    }

    setSelectedTags((prev) =>
      prev.includes(t) ? prev : [...prev, t]
    );

    setNewTag("");
    setIsAddOpen(false);
  };

  const reset = () => {
    setTitle("");
    setContent("");
    setSelectedTags([]);
    setNewTag("");
    setIsAddOpen(false);
  };

  const submit = () => {
    if (!canSubmit) return;

    mutate(
      {
        postId,
        title: title.trim(),
        content: content.trim(),
        tags: selectedTags,
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onMouseDown={(e) => {
        // 바깥 클릭 닫기
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="
          w-[55.25rem] h-[41.3125rem]
          bg-white rounded-[0.5rem]
          p-[1.88rem]
          shadow-[0_0_9px_0_rgba(0,0,0,0.25)]
          flex flex-col
        "
      >
        {/* 헤더 */}
        <div className="relative flex justify-center mb-[1.5rem]">
          <span className="text-[1.125rem] font-semibold">교훈 작성</span>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-0 top-0"
            aria-label="close"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-[1.5rem] items-center">
          {/* 교훈 제목 */}
          <div className="flex flex-col gap-[0.75rem] w-[45.0625rem]">
            <span>교훈 제목</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="교훈 제목을 입력해주세요"
              className="
                w-full h-[3.5rem]
                rounded-[0.5rem] border border-[#e4e4e4]
                px-[1.25rem] bg-[#fafafa]
              "
            />
          </div>

          {/* 교훈 내용 */}
          <div className="flex flex-col gap-[0.75rem] w-[45.0625rem]">
            <span>교훈 내용</span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="교훈 내용을 입력해주세요"
              className="
                w-full h-[9rem]
                rounded-[0.5rem] border border-[#e4e4e4]
                px-[1.25rem] py-[1rem]
                bg-[#fafafa] resize-none
              "
            />
          </div>
          {/* 교훈 태그 영역 */}
          <div className="flex flex-col gap-[0.75rem] w-[45.0625rem]">
            <span>교훈 태그</span>

            <div className="flex flex-wrap gap-[1.25rem]">
              {tags.map((tag) => {
                const selected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`
                      px-[0.88rem] py-[0.63rem]
                      rounded-[0.5rem] border-[0.06rem]
                      shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]
                      ${
                        selected
                          ? "bg-[#B3E378] border-[#b3e378]"
                          : "bg-[#e6f3d7] border-[#b3e378]"
                      }
                    `}
                  >
                    {tag}
                  </button>
                );
              })}

              {/* + 버튼 */}
              <button
                type="button"
                onClick={() => setIsAddOpen((p) => !p)}
                className="
                  px-[0.88rem] py-[0.63rem]
                  rounded-[0.5rem] border-[0.06rem] border-[#b3e378]
                  bg-[#e6f3d7]
                  shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]
                "
              >
                +
              </button>
            </div>

            {isAddOpen && (
              <div className="flex gap-[0.5rem]">
                <input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                  placeholder="태그 입력 후 Enter"
                  className="
                    flex-1 rounded-[0.5rem]
                    border border-[#e4e4e4]
                    px-[1rem] py-[0.75rem]
                    bg-[#fafafa]
                  "
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="
                    px-[1rem] py-[0.75rem]
                    rounded-[0.5rem]
                    border border-[#cfe7b6]
                    bg-[#eef7e6]
                  "
                >
                  추가
                </button>
              </div>
            )}
          </div>

          {/* 하단 버튼 */}
          <div className="w-[45.0625rem] flex justify-end gap-[1rem] mt-auto">
            <button
              type="button"
              onClick={reset}
              className="w-[10.125rem] h-[3.125rem] rounded-[0.5rem] border-[0.06rem] border-[#B3E378]"
            >
              초기화
            </button>

            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit}
              className={`
                w-[10.125rem] h-[3.125rem] rounded-[0.5rem]
                ${canSubmit ? "bg-[#B3E378]" : "bg-[#d9d9d9] cursor-not-allowed"}
              `}
            >
              {isPending ? "작성 중..." : "작성"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
