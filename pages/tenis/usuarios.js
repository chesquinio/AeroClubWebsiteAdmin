import Layout from "@/components/Layout";
import UserList from "@/components/UserList";
import { mongooseConnect } from "@/lib/mongoose";
import { ClubUsers } from "@/model/ClubUsers";

function TennisUsersPage({users}) {

  return (
    <Layout>
      <UserList users={users}/>
    </Layout>
  );
}

export default TennisUsersPage;

export async function getServerSideProps() {
  try {
    await mongooseConnect();
    const users = await ClubUsers.find({ role: "tenis" }).select(
      "name nameId role"
    );

    const usersData = users.map((user) => ({
      name: user.name,
      nameId: user.nameId,
      role: user.role,
    }));

    return {
      props: {
        users: usersData,
      },
    };
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return {
      props: {
        users: [],
      },
    };
  }
}
