import React from "react";
import { TextData } from "./TextData";

export interface Template  {
  id: string,
  title: string,
  thumbnail: string,
  component: (props: any) => JSX.Element,
  textData: TextData[]
  images: {
    id: string,
    src: string,
    top?: string,
    left?: string,
    bottom?: string,
    right?: string,
    width: number,
    height: number,
    cover: boolean,
  }[]
}