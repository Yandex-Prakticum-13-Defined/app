import React, {
  Fragment, useState, useEffect, FC
} from 'react';
import './LeaderboardTable.scss';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { getLeaderboard, ILeaderboardRow } from '../../../../store/slice/leaderboardSlice';
import { useAppSelector } from '../../../../hooks/useAppSelector';

type TSortingField = 'name' | 'points';

type TSortingDirection = 'DESC' | 'ASC';

type TSortingRules = {
  field: TSortingField;
  direction: TSortingDirection;
};

enum SortingField {
  NAME = 'name',
  POINTS = 'points'
}

enum SortingDirection {
  DESC = 'DESC',
  ASC = 'ASC'
}

const LeaderboardTable: FC = () => {
  const dispatch = useAppDispatch();
  const leaderboardStoreData = useAppSelector((state) => state.leaderboard.data);
  const initialSort = {
    field: SortingField.POINTS,
    direction: SortingDirection.DESC
  };
  const [leaderboardData, setLeaderboardData] = useState<ILeaderboardRow[]>(leaderboardStoreData);
  const [sort, setSort] = useState<TSortingRules>(initialSort);

  useEffect(() => {
    dispatch(getLeaderboard());
  }, []);

  useEffect(() => {
    setLeaderboardData(leaderboardStoreData);
  }, [leaderboardStoreData]);

  const handleSortButtonClick = (field: TSortingField): void => {
    let direction: TSortingDirection;

    if (sort.field === field && sort.direction === SortingDirection.DESC) {
      direction = SortingDirection.ASC;
    } else {
      direction = SortingDirection.DESC;
    }

    setLeaderboardData(sortByField(leaderboardData, field, direction));
    setSort({ field, direction });
  };

  return (
    <div className='leaderboard-table'>
      <div className='leaderboard-table__sort-buttons'>
        <button
          className={getButtonClassName(sort, SortingField.NAME)}
          type='button'
          onClick={() => handleSortButtonClick(SortingField.NAME)}
        >
          имя
        </button>
        <button
          className={getButtonClassName(sort, SortingField.POINTS)}
          type='button'
          onClick={() => handleSortButtonClick(SortingField.POINTS)}
        >
          очки
        </button>
      </div>
      <div className='leaderboard-table__rows'>
        {
          leaderboardData.map((row) => (
            <Fragment key={row.number}>
              <p className={getColorClassName(row.number, 'leaderboard-table__number')}>{row.number}</p>
              <img className='leaderboard-table__image' src={row.image} alt='Аватар пользователя'/>
              <p className={getColorClassName(row.number, 'leaderboard-table__name')}>{row.name}</p>
              <p className={getColorClassName(row.number, 'leaderboard-table__points')}>{row.points}</p>
            </Fragment>
          ))
        }
      </div>
    </div>
  );
};

function getButtonClassName(sort: TSortingRules, field: TSortingField): string {
  const baseClassName = `leaderboard-table__sort-button leaderboard-table__sort-button_type_${field}`;

  if (sort.field !== field) {
    return baseClassName;
  }

  return sort.direction === 'DESC'
    ? `${baseClassName} leaderboard-table__sort-button_type_decrease`
    : `${baseClassName} leaderboard-table__sort-button_type_increase`;
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
  leaderboardData: ILeaderboardRow[],
  field: TSortingField,
  direction: TSortingDirection
): ILeaderboardRow[] {
  if (direction === SortingDirection.DESC) {
    return [...leaderboardData].sort((a, b) => (a[field] < b[field] ? 1 : -1));
  }

  return [...leaderboardData].sort((a, b) => (a[field] < b[field] ? -1 : 1));
}

export default LeaderboardTable;
