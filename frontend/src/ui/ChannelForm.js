import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { CreateNewChannel } from '../ducks/channels/operation';
import { getUserFromState } from '../ducks/user/selector';

function ChannelForm({ CreateNewChannel, visible, user }) {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup
      .string('Channel name should be a string')
      .required('channel name is required'),
  });

  const style = {
    opacity: '40%',
  };

  return (
    <div className='main-login' style={visible ? style : {}}>
      <div className='login-form'>
        <div className='login-setting'>
          <h1 id='channelform-title'>Create channel!</h1>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              CreateNewChannel(values.name);
              navigate(-1);
            }}
            enableReinitialize={true}
            initialValues={{
              name: '',
            }}
          >
            <Form className='login-formik'>
              <label id='channelform-label'> Channel name: </label>
              <ErrorMessage id='error' name='name' component='div' />
              <Field id='channelform-input' name='name' placeholder='Name:' />
              <div id='buttons-container'>
                <button type='submit'> SUBMIT </button>
                <button onClick={() => navigate(-1)}> UNDO </button>
              </div>
            </Form>
          </Formik>
          <Link id='help' to='/contact'>
            Do you need help? Contact us!
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: getUserFromState(state),
  };
};

const mapDispatchToProps = {
  CreateNewChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm);
