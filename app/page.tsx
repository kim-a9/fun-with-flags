import {Card, Header, Footer } from './components';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Card 
        id={countries[0].id}
        country={countries[0].country}
        capital={countries[0].capital}
        region={countries[0].region}
        population={countries[0].population} />
        <Card 
        id={countries[1].id}
        country={countries[1].country}
        capital={countries[1].capital}
        region={countries[1].region}
        population={countries[1].population} />
        <Card 
        id={countries[2].id}
        country={countries[2].country}
        capital={countries[2].capital}
        region={countries[2].region}
        population={countries[2].population} />
        <Card 
        id={countries[3].id}
        country={countries[3].country}
        capital={countries[3].capital}
        region={countries[3].region}
        population={countries[3].population} />
        <Card 
        id={countries[4].id}
        country={countries[4].country}
        capital={countries[4].capital}
        region={countries[4].region}
        population={countries[4].population} />
        <Card 
        id={countries[5].id}
        country={countries[5].country}
        capital={countries[5].capital}
        region={countries[5].region}
        population={countries[5].population} />
        <Card 
        id={countries[6].id}
        country={countries[6].country}
        capital={countries[6].capital}
        region={countries[6].region}
        population={countries[6].population} />
      </main>
      <Footer />
    </>
  );
} 
