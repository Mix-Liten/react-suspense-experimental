import React, { Suspense } from 'react';
import { fetchData } from './Api';
import loadingGif from './loading.gif';

const resource = fetchData();

const ProfileDetails = () => {
  const user = resource.user.read();
  return (
    <div className='card card-body my-3'>
      <h1 className='large text-primary'>{ user.name }</h1>
      <ul>
        <li>Username: { user.name }</li>
        <li>Email: { user.email }</li>
        <li>City: { user.address.city }</li>
      </ul>
    </div>
  );
}

const ProfilePosts = () => {
  const posts = resource.posts.read();
  return (
    <ul className='list-group'>
      <li className='list-group-item'>
        <strong>Latest Posts</strong>
      </li>
      {
        posts.map(post => (
          <li className='list-group-item' key={ post.id }>
            { post.title }
          </li>
        ))
      }
    </ul>
  );
}

const Loading = () => (
  <img
    src={loadingGif}
    style={{ width: '200px', margin: 'auto', display: 'block' }}
    alt='Loading...'
  />
)

function App() {
  return (
    <div className="container my-5">
      <Suspense fallback={<Loading />}>
        <ProfileDetails />
        <ProfilePosts />
      </Suspense>
    </div>
  );
}

export default App;
