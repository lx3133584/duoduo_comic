/**
 * SetDifference (same as Exclude)
 * @desc Set difference of given union types `A` and `B`
 */
type SetDifference<A, B> = A extends B ? never : A;

/**
 * SetComplement
 * @desc Set complement of given union types `A` and (it's subset) `A1`
 */
type SetComplement<A, A1 extends A> = SetDifference<A, A1>;

/**
 * Subtract
 * @desc From `T` remove properties that exist in `T1` (`T1` is a subtype of `T`)
 */
type Subtract<T extends T1, T1 extends object> = Pick<
  T,
  SetComplement<keyof T, keyof T1>
>;
