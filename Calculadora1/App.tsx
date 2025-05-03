import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

interface Datos{
  periodLength:number;
  trainingDays:number;
  success:boolean;
  rating: 1|2|3;
  ratingDescription:string;
  target:number;
  average:number;
}


function calculateExercises(dailyHours:number[],target:number): Datos{
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h > 0).length;
  const totalHours = dailyHours.reduce((sum, h )=>sum + h, 0);
  const average = totalHours / periodLength;

  
  let rating : 1| 2| 3;
  let ratingDescription : string;

  if (average >= target){
    rating = 3;
    ratingDescription = 'Congratulations, you are great.'
  }else if (average >=target * 0.75 ) {
    rating = 2;
    ratingDescription = 'Good work, but you can improve the next one.'
  }else{
    rating = 1;
    ratingDescription = 'you need to improve a lot friend'
  }
     

  return{
    periodLength,
    trainingDays,
    success:average >= target,
    rating,
    ratingDescription,
    target,
    average
  }
}

const exerciseData = [
    {day:'Lunes', hours: 3 },
    {day:'Martes', hours: 0 },
    {day:'Miercoles', hours: 2 },
    {day:'Jueves', hours: 4.5 },
    {day:'Viernes', hours: 0 },
    {day:'Sabado', hours: 3 },
    {day:'Domingo', hours: 1 },
  ]

  const dailyHours = exerciseData.map(d =>d.hours);
  const result = calculateExercises(dailyHours,2);






export default function App() {

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Ejercicio</Text>

      {exerciseData.map((d, i) => (
        <Text key={i}>{d.day}: {d.hours} horas</Text>
      ))}

      <Text style={styles.subtitle}>Resumen</Text>
      <Text>Días totales: {result.periodLength}</Text>
      <Text>Días con ejercicio: {result.trainingDays}</Text>
      <Text>Meta diaria: {result.target} horas</Text>
      <Text>Promedio real: {result.average.toFixed(2)} horas</Text>
      <Text>¿Se logró la meta?: {result.success ? 'Sí' : 'No'}</Text>
      <Text>Calificación: {result.rating}</Text>
      <Text>Comentario: {result.ratingDescription}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
