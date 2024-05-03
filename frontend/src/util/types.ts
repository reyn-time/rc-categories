export type NoBigIntMessage<T> = {
  [K in keyof T]: T[K] extends bigint
    ? string
    : T[K] extends Object
    ? NoBigIntMessage<T[K]>
    : T[K] extends Object | undefined
    ? NoBigIntMessage<T[K]> | undefined
    : T[K];
};
