import React, { useState } from 'react'
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, IonButton } from '@ionic/react'

const Projects = () => {

  const [projects, setProjects] = useState([{projectTitle: ``, projectStartDate: ``, projectEndDate: ``}])

  useIonViewWillEnter(async () => {
    const result = await fetch(`http://localhost:5000/projects`)
    const data = await result.json()
    setProjects(data)
  })

  const deleteProject = e => {
    let id = e.target.name
    fetch(`http://localhost:5000/projects/${id + 1}`, {
      method: 'DELETE'
    })
    .then(() => console.log('Removed!'))
    .catch(err => console.log(err))
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Projects</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {projects.map((project, i) => <IonItem key={i}><IonLabel><IonButton name={i} onClick={deleteProject} color="danger">Delete Project</IonButton><ProjectItem key={i} project={project} /></IonLabel></IonItem>)}
        </IonList>
        <IonButton routerLink="/projects/inputs">Add Project</IonButton>
      </IonContent>
    </IonPage>
  )
}

const ProjectItem = ({ project }) => {
  return (
    <IonItem >
      <IonLabel>
        <h2>{project.projectTitle}</h2>
        <p>{project.projectStartDate}</p>
        <p>{project.projectEndDate}</p>
      </IonLabel>
    </IonItem>
  )
}

export default Projects