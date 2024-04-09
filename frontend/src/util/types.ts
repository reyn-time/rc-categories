export type NoBigIntMessage<T> = {
  [P in keyof T]: NoBigIntField<T[P]>;
};
type NoBigIntField<F> = F extends BigInt
  ? string
  : F extends Array<infer U>
  ? Array<NoBigIntField<U>>
  : F extends ReadonlyArray<infer U>
  ? ReadonlyArray<NoBigIntField<U>>
  : F extends {
      [key: string | number]: infer U;
    }
  ? {
      [key: string | number]: NoBigIntField<U>;
    }
  : F;
