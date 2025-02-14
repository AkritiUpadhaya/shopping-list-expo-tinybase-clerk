import * as UiReact from 'tinybase/ui-react/with-schemas'
import {createMergeableStore, MergeableStore, NoValuesSchema} from 'tinybase/with-schemas'
import { useCreateClientPersister } from './persistence/useCreateClientPersister'
import { useCreateServerSynchronization } from './synchronization/useSynchronization'
import { useUserIdAndNickname } from '~/hooks/useNickname'
import { useUser } from '@clerk/clerk-expo'
import { useCreateSynchronizer } from 'tinybase/ui-react'
import ShoppingListStore from './ShoppingListStore'

const STORE_ID_PREFIX= "shoppingListsStore-"
const TABLES_SCHEMA = {
    lists: {
        id: { type: "string" },
        initialContentJson: { type: "string" },
    },
} as const;

type Schemas = [typeof TABLES_SCHEMA, NoValuesSchema];

const {
    useCreateMergeableStore,
    useDelCellCallback,
    useProvideStore,
    useRowIds,
    useStore,
    useTable,
} = UiReact as UiReact.WithSchemas<Schemas>;

const useStoreId=()=> STORE_ID_PREFIX + useUser().user.id

export default function ShoppingListsStore(){
    const storeId= useStoreId()
    const store= useCreateMergeableStore(()=>
    createMergeableStore(). setTablesSchema(TABLES_SCHEMA))


    useCreateClientPersister(storeId, store)
    useCreateServerSynchronization(storeId, store)
    useProvideStore(storeId, store)
    const currentUserLists= useTable("lists", storeId)

    return Object.entries(currentUserLists).map(
        ([listId, {initialContentJson}])=>(
            <ShoppingListStore 
            listId={listId}
            initialContentJson={initialContentJson}
            key={listId}
            />
        )    
    )
}
