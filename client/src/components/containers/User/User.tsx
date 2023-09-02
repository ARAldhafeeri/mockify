import React from "react"; 
import MockifyTable from "../../commons/Table/Table";
import UserController from "controllers/User";
import MockifyButton from "components/commons/Button/Button";
import UserColumns from "data/user";
import { IFetchUserResponse } from "types/User";
import MockifyLoader from "components/commons/Loader/MockifyLoader";

const User : React.FC = () => {
  const { user, loading } = UserController();

  return (
    <>
    {
      loading ? <MockifyLoader size="large" /> 
      : (
        <>
          <MockifyButton 
            text="Create new user" 
            classes={['mockify-btn']}
            onClick={() => console.log('create ew user')}
            />
          <MockifyTable 
            columns={UserColumns} 
            data={user} 
            classes={["mockify-table"]} />
        </>
      )
    }
    </>
  )

}

export default User;