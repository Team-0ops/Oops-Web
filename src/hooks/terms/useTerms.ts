import { useQuery } from "@tanstack/react-query";
import { getTerms } from "../../apis/SignUp/getTerms";
import { TermItem } from "../../apis/SignUp/getTerms";

export const useTerms = () => {
  const query = useQuery<TermItem[]>({
    queryKey: ["terms"],
    queryFn: async () => {
      const res = await getTerms();
      return Array.isArray(res.result) ? res.result : [res.result];
    },
    staleTime: 1000 * 60 * 5,
  });

  const terms = query.data ?? [];

  const requiredTerms = terms.filter((t) => t.required === "REQUIRED");
  const optionalTerms = terms.filter((t) => t.required === "OPTIONAL");

  const byId = (id: number) => terms.find((t) => t.id === id);

  return {
    ...query,
    terms,
    requiredTerms,
    optionalTerms,
    byId,
  };
};
