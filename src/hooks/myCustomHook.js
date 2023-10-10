import { useEffect, useState } from "react";

export const useMyHook = (a, refVideo) => {
  const [value, setValue] = useState(a || 0);

  useEffect(() => {
    setValue(a * 2);
  }, [a]);
  useEffect(() => {
    console.log(refVideo);
  }, [refVideo]);

  return value;
};
