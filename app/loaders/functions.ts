export function getUIMatchData<
  T extends (...args: any) => any,
  L = ReturnType<T>,
>(UIMatch: any) {
  return UIMatch.data?.result as L;
}
