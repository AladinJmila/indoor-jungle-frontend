import { useEffect, useState } from 'react';
import { porjectFirestore } from '../firebase/config';

const useCollection = (collection: string) => {
  const [documents, setDocuments] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let ref = porjectFirestore.collection(collection);

    const unsubscribe = ref.onSnapshot(
      snapshot => {
        const result: object[] = [];
        snapshot.forEach(doc => {
          result.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(result);
        setError(null);
      },
      (error: any) => {
        setError('could not fetch data');
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [collection]);

  return { documents, error };
};

export default useCollection;
