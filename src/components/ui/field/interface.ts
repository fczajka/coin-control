import type { InputTypes } from "~/enums";

export interface InputProps {
  label: string;
  name: string;
  type: InputTypes;
  hidden?: boolean;
  value?: string | number;
  onKeyUp$?: (event: KeyboardEvent, element: HTMLInputElement) => void;
}
