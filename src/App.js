import React, { useState, useEffect } from "react";

import api from "./services/api.js";

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    setRepositories([...repositories, `Novo repositório ${Date.now()}`]);

    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: 'teste',
      techs: ['HTML']
    })

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const repositoryIndex = repositories.findIndex(repository => repository.id === id)

    const repositoriesTemp = repositories;

    repositoriesTemp.splice(repositoryIndex, 1)

    setRepositories([...repositoriesTemp])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => 
          <li key={index}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
