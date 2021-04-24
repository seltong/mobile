import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';

import api from './services/api';

// Componentes não possuem valor semântico
// Não possuem estilização própria
// Todos componentes por padrão possuem "display: flex"

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `New Project ${Date.now()}`,
      owner: 'Selton Guedes'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      {/* <View style={styles.container}>
        {projects.map(project => (
          <Text key={project.id} style={styles.project}>{project.title}</Text>
        ))}
      </View> */}

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleAddProject}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add project</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 50,
    justifyContent: 'center',
    margin: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#7159c1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
  project: {
    color: '#fff',
    fontSize: 30,
  }
});