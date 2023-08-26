import LoggedInLayout from "components/containers/Layout/LoggedInLayout";
import React, { Suspense }from "react";
import MockifyLoader from "components/commons/Loader/MockifyLoader";

const Dashboard: React.FC = () => {

  return (
    <LoggedInLayout>
      <Suspense fallback={<MockifyLoader />}>
        <div>Dashboard</div>
      </Suspense>
    </LoggedInLayout>
  );
}

export default Dashboard;