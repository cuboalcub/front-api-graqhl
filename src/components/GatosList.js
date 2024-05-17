import React from "react";
import { useQuery, useMutation, gql } from '@apollo/client';
import '../styles/gatoslist.css';
import { AUTH_TOKEN } from "../constants";

const GATOS_QUERY = gql`
  query GatosQuery {
    gatos {
      id
      imagen
      nombre 
      postedBy {
        id
        username
      }
      votes {
        id
        user {
          username
        }
      }
    }
  }
`;

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

const GatoList = () => {
    const { loading, error, data } = useQuery(GATOS_QUERY);
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const [createVote] = useMutation(CREATE_VOTE_MUTATION);
  
    const handleVote = (gatoID) => {
      createVote({
        variables: {
          gatoId: gatoID
        }
      }).catch(error => console.error("Error al votar:", error));
    };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Likes</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {data.gatos.map(gato => (
              <tr key={gato.id}>
                <td style={{ cursor: 'pointer' }} onClick={authToken ? () => handleVote(gato.id) : null}>
                ▲ 
              <div className="f6 lh-copy gray">
                  {gato.votes.length} votes | by{' '}
                  {gato.postedBy ? gato.postedBy.username : 'Unknown'}{' '}
            </div>
                </td>
                <td>{gato.id}
                    
                </td>
                <td>{gato.nombre}</td>
                <td><img src={gato.imagen} alt={gato.nombre} style={{ width: '300px' }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default GatoList;
  