import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles/MiPerfil.css";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useForm } from "react-hook-form";
export interface MiPerfilInterface {}

const MiPerfil: React.FC<MiPerfilInterface> = () => {
  const [presentAlert] = useIonAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const user = useSelector((state: any) => state.user);
  const onSubmit = async (data: any) => {
    try {
      await addDoc(collection(db, "vehiculos"), {
        modelo: data.modelo,
        uidConductor: user.userUid,
        color: data.color,
        placa: data.placa,
      });
      presentAlert({
        message: "Vehiculo Creado",
        buttons: ["OK"],
      });
      reset();
    } catch (error) {
      console.log(error);
      presentAlert({
        message: "Error al crear vehiculo",
        buttons: ["OK"],
      });
    }
  };

  const [vehicle, setVehicle]: any = useState();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "vehiculos"),
        where("uidConductor", "==", user.userUid)
      ),
      (querySnapshot) => {
        let rides: any = {};
        querySnapshot.forEach((doc) => {
          rides = { ...doc.data(), id: doc.id };
        });
        setVehicle(rides);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div
            style={{
              display: "flex",
              marginLeft: "1rem",
            }}
          >
            <a
              style={{
                backgroundColor: "inherit",
                color: "white",
                textDecoration: "none",
              }}
              href="/index"
            >
              Volver
            </a>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            padding: "1rem",
            gap: "1rem",
          }}
        >
          <h1>Mi Perfil</h1>
          <IonItem style={{ marginBottom: "0" }}>
            <IonLabel>Nombre:</IonLabel>
            <IonInput value={user.userName} disabled></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Correo:</IonLabel>
            <IonInput value={user.userEmail} disabled></IonInput>
          </IonItem>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            padding: "1rem",
            gap: "1rem",
          }}
        >
          <h1>Agregar Vehiculo</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1px",
              }}
            >
              <IonItem>
                <IonLabel>Modelo:</IonLabel>
                <IonInput
                  required
                  {...register("modelo")}
                  value={vehicle ? vehicle.modelo : ""}
                  disabled={vehicle?.modelo ? true : false}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Color:</IonLabel>
                <IonInput
                  required
                  {...register("color")}
                  value={vehicle ? vehicle.color : ""}
                  disabled={vehicle?.modelo ? true : false}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Placa:</IonLabel>
                <IonInput
                  required
                  {...register("placa")}
                  value={vehicle ? vehicle.placa : ""}
                  disabled={vehicle?.modelo ? true : false}
                ></IonInput>
              </IonItem>
              <IonButton
                type="submit"
                expand="block"
                disabled={vehicle?.modelo ? true : false}
              >
                Agregar
              </IonButton>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MiPerfil;
