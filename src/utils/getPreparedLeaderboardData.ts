import { baseURL } from '../API/API';
import { leaderboardRequest } from '../store/slice/leaderboardSlice';
import { getLeaderboardSSR, IUserScoreData } from '../API/leaderboardAPI';
import mockProfilePicture from '../images/mock-profile-picture.jpg';
import { getUserByIdSSR } from '../API/authAPI';

export const getPreparedLeaderboardData = async (cookie: string) => {
  const rawLeaderboardData = await getLeaderboardSSR(leaderboardRequest, cookie);

  return Promise.all(
    rawLeaderboardData.map(async (item: IUserScoreData, i: number) => {
      const userInfo = await getUserByIdSSR(item.data.userId, cookie);

      return {
        number: i + 1,
        image: userInfo.avatar ? `${baseURL}/resources${userInfo.avatar}` : mockProfilePicture,
        name: userInfo.first_name,
        points: item.data.score
      };
    })
  );
};
