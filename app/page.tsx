import {Card, Footer, Grid, Header  } from './components';

const countries  = [
  {
  id: 1,
  country : "Brazil",
  capital : "Brasilia",
  region : "South America",
  population : "206,135,893"
},
];
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Grid>
        {countries.map(({ id, country, capital, region, population} ) => (
          <Card
            id={id}
            country={country}
            capital={capital}
            region={region}
            population={population} 
          />
        ))}
        </Grid>  
      </main>
      <Footer />
    </>
  );
} 
