import * as UiReact from "tinybase/ui-react/with-schemas"
import { Content, MergeableStore, OptionalSchemas } from "tinybase/with-schemas";
import { createClientPersister } from "./createClientPersister";

export const  useCreateClientPersister= <Schemas extends OptionalSchemas>(
    storeId:string,
    store: MergeableStore<Schemas>,
    initialContentJson?: string,
    then? : ()=> void

)=> 
(UiReact as UiReact.WithSchemas<Schemas>). useCreatePersister(
    store,
    (store: MergeableStore<Schemas>)=> createClientPersister(storeId, store),
    [storeId],
    async(persister)=>{
        let initialContent: Content<Schemas> | undefined= undefined
        try{
            initialContent= JSON.parse(initialContentJson)
        } catch(e){
            console.log(e)
        }

        await persister.load(initialContent)
        await persister.startAutoSave()
        then?. ()
    },
    [initialContentJson]
)