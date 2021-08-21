import { useRouter } from "next/router";

import { DATA_NAMES, OUTPUT_DIR } from "../constants";
import { JsonMap } from "./types";

export type Tag = {
  property: "og:image";
  content: string;
  [DATA_NAMES.base64]: string;
  [DATA_NAMES.layout]: string;
};

export type Options = {
  layout: string;
  data: JsonMap;
};

function getUrl(path: string, layout: string) {
  const modifiedPath = path == "/" ? "/index" : path;
  return `/${OUTPUT_DIR}/${layout}${modifiedPath}.png`;
}

function getBase64(data: JsonMap) {
  const json = JSON.stringify(data);

  if (typeof window !== "undefined") {
    return btoa(json);
  }

  return Buffer.from(json, "utf-8").toString("base64");
}

export default function useOgImage(params: Options | undefined): Tag {
  const { asPath } = useRouter();

  const layout = params
    ? params.layout
      ? params.layout
      : "default"
    : "default";
  const data = params ? (params.data ? params.data : {}) : {};

  return {
    property: "og:image",
    content: getUrl(asPath, layout),
    [DATA_NAMES.base64]: getBase64(data),
    [DATA_NAMES.layout]: layout,
  };
}