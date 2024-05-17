import React from 'react';
import { AUTH_TOKEN } from '../constants';
import { gql, useMutation } from '@apollo/client';

const CREATE_VOTE_MUTATION = gql`
  mutation CreateVote($gatoId: Int!) {
    createVote(gatoId: $gatoId) {
      user {
        id
        username
      }
      gato {
        id
        nombre
        imagen
      }
    }
  }
`;

const Gato = (props) => {
 const {gato} = props
 const authToken = localStorage.getItem(AUTH_TOKEN);

 const [vote] = useMutation(CREATE_VOTE_MUTATION,{
  variables:{
    GatoId: Gato.id
  }});
  return(
    <div className="flex mt2 items-start">
    <div className="flex items-center">
      <span className="gray">{props.index + 1}.</span>
      {authToken && (
        <div
          className="ml1 gray f11"
          style={{ cursor: 'pointer' }}
          onClick={vote}
        >
          like 
        </div>
      )}
    </div>
    <div className="ml1">
      <div>
        {gato.imagen} ({gato.nombre})
      </div>
      {(
        <div className="f6 lh-copy gray">
                | by{' '}
          {gato.postedBy ? gato.postedBy.username : 'Unknown'}{' '}
            
        </div>
      )}
    </div>
  </div>
  )
};

export default Gato;
