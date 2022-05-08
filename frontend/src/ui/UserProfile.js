import { getUserFromState } from '../ducks/user/selector';
import { connect } from 'react-redux';
import UploadImage from './UploadImage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';

const instance = axios.create({
  withCredentials: true,
});

function UserProfile({ user }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    instance
      .get(`http://localhost:5000/images/image/${user.login}`, {
        responseType: 'arraybuffer',
      })
      .then(async (response) => {
        setImage(Buffer.from(response.data, 'binary').toString('base64'));
      })
      .catch();
  }, []);

  return (
    <div className='channels-right-container'>
      {image === null ? (
        <div
          id='profile'
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bolder',
            fontSize: '40px',
          }}
        >
          {user.login[0]}
        </div>
      ) : (
        <img src={`data:image/jpeg;charset=utf-8;base64,${image}`} alt='' />
      )}
      <UploadImage />
      <span id='nickname'> {user.login} </span>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: getUserFromState(state),
  };
};

export default connect(mapStateToProps, null)(UserProfile);
