'use client';

import { useEffect, useState } from "react";
import { countriesApi } from "../../services";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Params } from "next/dist/server/request/params";

// type Props = {
//     params: Promise<{ id: string }>;
//     // params: { id: string };

// }

type Params = {
    id: string;
};

export default async function Country({ params }: Props) {
    const nome = "Brazil";
    const param = useParams<Params>();
    const [id, setId] = useState<string | null>(null);
    const [country, setCountry] = useState<Country>();
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


    // const id = (await params).id;
    // const name = "Brazil";
    return (
        <>
        <div className="mb-8">
            <Link href="/">
            <button className="bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded">Back</button>
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[auto_ifr] gap-4">
            <div className="w-full md:MAX-w-[400px]">
            <Image src={"/flagplaceholder.svg"} 
            alt={"Flag of s'{name}"}
            className="w-full h-full"
            width={500}
            height={300}
            />
            </div>
            <div>
                <div className="flex flex-col justify-center p-6 text-sm text-gray-600">
                    <h2 className="text-xl font-semibold mb-4">Brazil </h2>
                    <div className="space-y-2">
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">Capital:</span>
                        <span>Brasilia</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">Region:</span>
                        <span>South America</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">Population:</span>
                        <span>21259489</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">Languages:</span>
                        <span></span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">Currencies:</span>
                        <span></span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">Top Level Domain:</span>
                        <span></span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">Borders:</span>
                        <span></span>
                    </div>
                    </div>
                </div>
            </div>
            <span>Country page: {id}</span>
        </div>
        </>
    );
}