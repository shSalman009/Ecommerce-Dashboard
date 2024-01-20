import { UserType } from "@/types/user";
import { useEffect, useState } from "react";

interface UserOverviewCalculations {
  totalUser: number;
  lastMonthUser: number;
  userPercentageChange: number;
}

const useUserOverview = (users: UserType[]): UserOverviewCalculations => {
  const [calculations, setCalculations] = useState<UserOverviewCalculations>({
    totalUser: 0,
    lastMonthUser: 0,
    userPercentageChange: 0,
  });

  useEffect(() => {
    const totalUser = users.length;

    const currentDate = new Date();
    const lastMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastMonthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    const lastMonthUsers = users.filter(
      (user) =>
        new Date(user.createdAt) >= lastMonthStart &&
        new Date(user.createdAt) <= lastMonthEnd
    );

    const lastMonthUser = lastMonthUsers.length;

    const userPercentageChange = (lastMonthUser / totalUser) * 100;

    setCalculations({
      totalUser,
      lastMonthUser,
      userPercentageChange,
    });
  }, [users]);

  return calculations;
};

export default useUserOverview;
