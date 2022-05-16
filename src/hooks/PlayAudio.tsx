import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import { BASE_URL, COOKIE_STRING } from "../state/shared/constants";

export function PlayAudio({ text }: { text?: string }) {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", `${COOKIE_STRING}`);
  const [src, setSrc] = useState("");
  const {
    state: { data, error },
    fetchData,
  } = useFetch<any>(`${BASE_URL}/text-to-speech/${text}`, {
    headers: myHeaders,
  });

  useEffect(() => {
    if (text) {
      fetchData(true);
    }
  }, [fetchData, text]);

  useEffect(() => {
    if (data) {
      var blob = new Blob([data], { type: "audio/mpeg" });
      var blobUrl = URL.createObjectURL(blob);
      setSrc(blobUrl);
    }
  }, [data]);

  if (error) return <p>There is an error.</p>;
  if (!data) return <p>Loading...</p>;
  return <>{src !== "" ? <audio src={src} controls /> : ""}</>;
}
