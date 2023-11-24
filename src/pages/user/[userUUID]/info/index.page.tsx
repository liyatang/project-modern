import { useParams } from 'react-router-dom';

function Page() {
  const { userUUID } = useParams();

  return <div>user: {userUUID} info</div>;
}

export default Page;
