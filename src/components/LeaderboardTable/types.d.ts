export type TNumberedLeaderboardData = {
  number: number;
  image: string;
  name: string;
  points: number;
};

export type TLeaderboardData = Omit<TNumberedLeaderboardData, 'number'>;

export type TSortingField = 'name' | 'points';

export type TSortingDirection = 'decrease' | 'increase';

export type TSortingRules = {
  field: TSortingField;
  direction: TSortingDirection;
};
