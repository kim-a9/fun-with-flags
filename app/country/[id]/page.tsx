"use client";

import { useEffect, useState } from "react";
import { countriesApi } from "../../services";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
// import { Params } from "next/dist/server/request/params";

// type Props = {
//     params: Promise<{ id: string }>;
//     // params: { id: string };

// }

type DetailedCountry = {
    cca3: string;
    flags: {
        svg: string;
    };
    name: {
        common: string;
        official: string;
    };
    capital: string[];
    region: string;
    population: number;
    languages: Record<string, string>;
    currencies: Record<string, {name: string; symbol: string }>;
    tld: string[];
    borders: string[];
}

type Params = {
    id: string;
};

export default function Country() {
    const params = useParams<Params>();
    const [id, setId] = useState<string | null>(null);
    const [country, setCountry] = useState<DetailedCountry>();
    const [loading, setLoading ] = useState(true);
    const [error, setError ] = useState<string | null>(null);
    
    useEffect(() => {
        if (params?.id && params.id !== id) {
            setId(params.id as string);
        }
    }, [params, id]);

      useEffect(() => {
          const fetchCountries = async () => {
              const [response, error] = await countriesApi.getCountry(id);
              setLoading(false);
              
              if (error) {
                  setError(error);
                  return;
                }
                setCountry(response); 
            };  

        if (id) {
            fetchCountries();
        }
      }, [id]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;


    const { name, flags, capital, region, population, 
    languages, currencies, tld, borders } = country ?? {};

    const {svg: flag} = flags ?? {};
    const {common: countryName, official: officialName } = name ?? {};
    const [capitalName] = capital ?? [];
    const languagesNames = Object.values(languages ?? {}).join(", ");
    const currenciesNames = Object.values(currencies ?? {}).map(({name, symbol}) => `${name} (${symbol})`).join(", "); 
    const [TopLevelDomain] = tld ?? [];
    const bordersId = borders ?? [];


    return (
        <>
        <div className="mb-8">
            <Link href="/">
            <button className="bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded">Back</button>
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[auto_ifr] gap-4">
            <div className="flex items-center md:max-w-[400px]">
            <Image src={flag || "/flagplaceholder.svg"} 
            alt={"Flag of ${countryName}"} 
            className="max-h-80 object-cover rounded-lg"
            width={500}
            height={300}
            priority
            />
            </div>
            <div>
                <div className="flex flex-col justify-center p-6 text-sm text-gray-600">
                    <h2 className="text-xl font-semibold mb-4">{countryName} ({id})</h2>
                    <div className="space-y-2">
                    <div >
                        <span className="font-semibold">Capital:</span> {capitalName}
                    </div>
                    <div >
                        <span className="font-semibold">Region:</span> {region}
                    </div>
                    <div >
                        <span className="font-semibold">Population:</span> {population}
                    </div>
                    <div >
                        <span className="font-semibold">Languages:</span> {languagesNames}
                    </div>
                    <div >
                        <span className="font-semibold">Currencies:</span> {currenciesNames}
                    </div>
                    <div >
                        <span className="font-semibold">Top Level Domain:</span> {TopLevelDomain}
                    </div>
                    <div className="md:max-w-80">
                        <span className="font-semibold">Borders:</span> {" "}
                        {bordersId.length > 0 ? bordersId.map((borderId) => (
                        <Link href={`/country/${borderId}`} key={borderId}>
                        <button className="bg-gray-200 hover:bg-gray-300 text-xs mb-[6px] mr-[6px] px-[6px] py-[1.5px] rounded">
                            {borderId}</button>
                        </Link>
                        ))
                        : "No borders"}
                        
                    </div>
                    </div>
                </div>
            </div>
            <span>Country page: {id}</span>
        </div>
        </>
    );
}