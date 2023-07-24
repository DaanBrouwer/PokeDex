import { useSearchParams } from "react-router-dom";

/**
 * A hook which returns the value of a query param currently set
 * in the browers address bar.
 * 
 * The reason for this hook to exist however is because it handles
 * the scenario for when the query param is not present. In that
 * case it returns the second parameter the defaultValue.
 * 
 * This allow you to write code without having to deal with the
 * fact that the query param might be null which is annoying.
 * 
 * Note: useQueryParam accepts a generic of T, for the defaultValue,
 * this is handy for when the query params value has limited options.
 * For example it might be "S" | "M" | "L" | "XL" for t-shirt sizes.
 *
 * @param {string} queryParam The query param you want the value for. 
 * @param {T} defaultValue The default value for when the query param is not present on the url.
 * @returns {T} The value for the given query param, or the default value. 
 */
export function useQueryParam<T>(queryParam: string, defaultValue: T): T {
  const [params] = useSearchParams();

  const value = params.get(queryParam) as unknown as T;

  return value ?? defaultValue;
}
