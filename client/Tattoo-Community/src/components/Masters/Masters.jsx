import './style.scss'

import MastersCard from '../Cards/MastersCard/MastersCard';
import { useEffect, useState } from 'react';
import Skeleton from '../Skeleton/CardSkeleton';

const Masters = () => {

    const [masters,setMasters] = useState([]) // Данные тату мастера
    const [isLoading, setIsLoading] = useState(true) // Имитация загрузки

    async function fetchMasters() {

        try {

        const response = await fetch('/api/tattooMasters')

    
        const data = await response.json()
        
         if(!response.ok){
            alert(data.errorMessage)
            return
        }

        setMasters(data.data)
        setIsLoading(false)

        } catch (error) {

            console.log(error);
            
        } 
    } 

    useEffect(() => {
        fetchMasters()
    }, [])


    

    return ( 
        <section className="masters">

            <div className="container">

                <div className="masters_wrapper">

                    <h1 className="title masters_title">Тату мастера</h1>

                    <div className="masters_card">

                    {isLoading ? (
                        <>
                        {[...Array(2)].map(() => (
                             <Skeleton/>
                        ))}
                        </>
                    ): 
                        masters.map((masters) => (
                         <MastersCard key={masters.user_id} {...masters} />
                         
                    ))
                    
                    }
  
                    </div>

                </div>

            </div>

        </section>
     );
}
 
export default Masters;