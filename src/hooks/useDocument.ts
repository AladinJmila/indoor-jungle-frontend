import { useEffect, useState } from 'react';
import { porjectFirestore } from '../firebase/config';

const useDocument = (collection: string, id: string) => {
  const [document, setDocument] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const ref = porjectFirestore.collection(collection).doc(id);

    const unsubscribe = ref.onSnapshot(
      snapshot => {
        if (snapshot.exists) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError('no such documents exists');
        }
      },
      (error: any) => {
        setError('could not fetch document');
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [collection, id]);

  return { document, error };
};

export default useDocument;
