import React, { Fragment, useState, useEffect } from 'react';
import './LeaderboardTable.scss';
import {
  TLeaderboardData,
  TNumberedLeaderboardData, TSortingDirection,
  TSortingField,
  TSortingRules
} from 'components/LeaderboardTable/types';

function LeaderboardTable() {
  const serverData: TLeaderboardData[] = [
    { image: 'https://tinyurl.com/bdznfmzs', name: 'Сергей', points: 1400 },
    { image: 'https://tinyurl.com/bdznfmzs', name: 'Анастасия', points: 2100 },
    { image: 'https://tinyurl.com/bdznfmzs', name: 'Владимир', points: 700 }
  ];
  const [
    leaderboardData,
    changeLeaderboardData
  ] = useState<TNumberedLeaderboardData[]>([]);
  const [sort, changeSort] = useState<TSortingRules>({
    field: 'points',
    direction: 'decrease'
  });

  useEffect(() => {
    const sortedLeaderboardData = sortByField(serverData, 'points', 'decrease');
    const sortedAndNumberedLeaderboardData = numberLeaderboardData(sortedLeaderboardData);
    changeLeaderboardData(sortedAndNumberedLeaderboardData);
  }, []);

  const handleSortButtonClick = (field: 'name' | 'points'): void => {
    let direction: 'decrease' | 'increase';

    if (sort.field === field && sort.direction === 'decrease') {
      direction = 'increase';
    } else {
      direction = 'decrease';
    }

    changeLeaderboardData([...sortByField(leaderboardData, field, direction)] as TNumberedLeaderboardData[]);
    changeSort({
      field,
      direction
    });
  };

  return (
    <div className="leaderboard-table">
      <div className="leaderboard-table__sort-buttons">
        <button className={getButtonClassName(sort, 'name')} type="button"
                onClick={() => handleSortButtonClick('name')}
        >имя</button>
        <button className={getButtonClassName(sort, 'points')} type="button"
                onClick={() => handleSortButtonClick('points')}
        >очки</button>
      </div>
      <div className="leaderboard-table__rows">
        {
          leaderboardData.map((row) => (
            <Fragment key={row.number}>
              <p className={getColorClassName(row.number, 'leaderboard-table__number')}>{row.number}</p>
              <img className="leaderboard-table__image" src={row.image} alt="Аватар пользователя"/>
              <p className={getColorClassName(row.number, 'leaderboard-table__name')}>{row.name}</p>
              <p className={getColorClassName(row.number, 'leaderboard-table__points')}>{row.points}</p>
            </Fragment>
          ))
        }
      </div>
    </div>
  );
}

function getButtonClassName(sort: TSortingRules, field: TSortingField) {
  const baseClassName = `leaderboard-table__sort-button leaderboard-table__sort-button_type_${field}`;

  if (sort.field !== field) {
    return baseClassName;
  }

  return `${baseClassName} leaderboard-table__sort-button_type_${sort.direction}`;
}

function getColorClassName(number: number, className: string): string {
  switch (number) {
    case 1:
      return `${className} ${className}_color_gold`;
    case 2:
      return `${className} ${className}_color_silver`;
    case 3:
      return `${className} ${className}_color_bronze`;
    default:
      return className;
  }
}

function sortByField(
  leaderboardData: TLeaderboardData[],
  field: TSortingField,
  direction: TSortingDirection
): TLeaderboardData[];
function sortByField(
  leaderboardData: TNumberedLeaderboardData[],
  field: TSortingField,
  direction: TSortingDirection
): TNumberedLeaderboardData[];
function sortByField(
  leaderboardData: TLeaderboardData[] | TNumberedLeaderboardData[],
  field: TSortingField,
  direction: TSortingDirection
): TLeaderboardData[] | TNumberedLeaderboardData[] {
  if (direction === 'decrease') {
    return leaderboardData.sort((a, b) => (a[field] < b[field] ? 1 : -1));
  }

  return leaderboardData.sort((a, b) => (a[field] < b[field] ? -1 : 1));
}

function numberLeaderboardData(leaderboardData: TLeaderboardData[]): TNumberedLeaderboardData[] {
  return leaderboardData.map((row, i) => ({ ...row, number: i + 1 }));
}

export default LeaderboardTable;
