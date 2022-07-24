import { letters } from "src/contents/letters";

export const fetchLetterContent = (id: string) => {
  const content = letters.filter(obj => obj.id === id);
  return content[0];
}