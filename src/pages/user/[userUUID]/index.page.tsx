import { useParams } from 'react-router-dom';

function Page() {
  const { userUUID } = useParams();

  return <div>userUUID: {userUUID}</div>;
}

export default Page;
