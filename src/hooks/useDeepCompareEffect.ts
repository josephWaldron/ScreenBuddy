import { useEffect, useRef } from "react";

function useDeepCompareMemoize(value: any) {
  const ref = useRef<any>();

  if (JSON.stringify(value) !== JSON.stringify(ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffect(callback: () => void, dependencies: any[]) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default useDeepCompareEffect;
