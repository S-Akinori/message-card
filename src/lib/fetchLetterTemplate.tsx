import { letterTemplates } from "src/contents/templates"

export const fetchLetterTemplate = (id: string) => {
  const template = letterTemplates.filter(obj => obj.id === id);
  return template[0];
}