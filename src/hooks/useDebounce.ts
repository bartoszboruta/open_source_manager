/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce, DebounceSettings } from "lodash";

type IProps = {
  value: string;
  delay: number;
  options?: DebounceSettings;
};

export const useDebounce: (args: IProps) => string = ({
  value,
  delay,
  options,
}) => {
  const previousValue = useRef(value);
  const [current, setCurrent] = useState(value);

  const debounceCallBack = useCallback(
    debounce((text) => setCurrent(text), delay, options),
    []
  );

  useEffect(() => {
    debounceCallBack(value);
    previousValue.current = value;
    if (value !== previousValue.current) {
      return debounceCallBack.cancel();
    }
  }, [value]);

  return current;
};
