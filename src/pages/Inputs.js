import React, { useState } from 'react'
import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonButton, IonBackButton, IonButtons, IonInput } from '@ionic/react'

export const Inputs = () => {

    const [projectData, setProjectData] = useState({projectTitle: ``, projectStartDate: ``, projectEndDate: ``})
  
    const getProjectData = e => {
        let projectDataObj =  {
            ...projectData,
            [e.target.name]: e.target.value
        }
  
        setProjectData(projectDataObj)
    }
  
    const addProject = () => {
        fetch(`http://localhost:5000/projects`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                projectTitle: projectData.projectTitle,
                projectStartDate: projectData.projectStartDate,
                projectEndDate: projectData.projectEndDate
            })
        })
        .then(res => res.json())
        .then(project => console.log(`Success!`))
        .catch(err => console.log(err))
    }
  
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/projects" />
                    </IonButtons>
                    <IonTitle>Add Project</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel position="stacked">Project Title</IonLabel>
                    <IonInput onIonChange={getProjectData} name="projectTitle"></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Project StartDate</IonLabel>
                    <IonInput onIonChange={getProjectData} name="projectStartDate"></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Project EndDate</IonLabel>
                    <IonInput onIonChange={getProjectData} name="projectEndDate"></IonInput>
                </IonItem>
                <IonButton onClick={addProject} routerLink="/projects">Add Project</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Inputs