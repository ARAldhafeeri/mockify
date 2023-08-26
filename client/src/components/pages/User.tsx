import MockifyLoader from "components/commons/Loader/MockifyLoader";
import LoggedInLayout from "components/containers/Layout/LoggedInLayout";
import User from "components/containers/User/User";
import React, { Suspense } from "react";

const UserPage: React.FC = () => {
  return (
    <LoggedInLayout>
      <Suspense fallback={<MockifyLoader />}>
        <User />
      </Suspense>
    </LoggedInLayout>
  );
}

export default UserPage;