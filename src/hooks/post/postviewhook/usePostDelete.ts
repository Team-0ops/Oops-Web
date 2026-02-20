import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postDelete } from "../../../apis/Post/postDelete";
import type { AxiosError } from "axios";
import type { Situation, PostDetail } from "../../../types/post";

type StageKey = Situation;

type StageMap = Record<StageKey, PostDetail | null>

type UseConfirmPostDeleteArgs = {
    activeStage: StageKey;
    stageMap: StageMap | null;
    postId?: number;
    onSuccess?: () => void;
  };
  
  export const useConfirmPostDelete = ({
    activeStage,
    stageMap,
    postId,
    onSuccess,
  }: UseConfirmPostDeleteArgs) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const hasLaterStage = useMemo(() => {
      if (!stageMap) return false;
  
      if (activeStage === "OOPS") {
        return !!stageMap.OVERCOMING || !!stageMap.OVERCOME;
      }
      if (activeStage === "OVERCOMING") {
        return !!stageMap.OVERCOME;
      }
      return false; // OVERCOME는 마지막이라 제한 없음
    }, [activeStage, stageMap]);
  
    const getBlockMessage = () => {
      if (activeStage === "OOPS") return "극복 중/극복 완료 게시글이 있어 먼저 삭제해야 해요.";
      if (activeStage === "OVERCOMING") return "극복 완료 게시글이 있어 먼저 삭제해야 해요.";
      return "";
    };
  
    const { mutateAsync, isPending } = useMutation({
      mutationFn: () => postDelete({ postId }),
      onSuccess: () => {
        setIsOpen(false);
        onSuccess?.();
      },
      onError: (e) => {
        const err = e as AxiosError<any>;
        // 서버가 순서 제한을 에러로 주는 경우 여기서도 alert 가능
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "삭제에 실패했어요. 잠시 후 다시 시도해주세요.";
        alert(msg);
      },
    });
  
    const open = () => {
      if (hasLaterStage) {
        alert(getBlockMessage());
        return;
      }
      setIsOpen(true);
    };
  
    const close = () => setIsOpen(false);
  
    const confirm = async () => {
      if (hasLaterStage) {
        alert(getBlockMessage());
        return;
      }
      await mutateAsync();
    };
  
    return {
      isOpen,
      open,
      close,
      confirm,
      isDeleting: isPending,
    };
  };