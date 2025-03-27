import { Resource } from '@/types/resourceTypes'
import { updateResource } from '@/utils/resources/client';
import { useRef, useState } from 'react'


export function useResourceValues(initialResource: Resource) {

    const [retStore, setRetStore] = useState({...initialResource});

    const localStore = useRef<Resource | null>(null);

    const updateField = async (fieldName:string, newValue: string) => {
        const sendUpdateResourceRequest = await updateResource({id:initialResource.id, [fieldName]:newValue });
        if (sendUpdateResourceRequest.status === "success")
        {
            updateValue (fieldName, newValue);
        }
      }

      const updateValue = (field:string, value:string) => {
        const index = field as keyof typeof localStore;
        const temp = {...retStore};
        temp [index] = value;
        setRetStore (temp);
        localStore.current = retStore;
      }
    
  return {
    localStore:retStore,
    updateField
  }
}

