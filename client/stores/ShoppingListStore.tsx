import { createMergeableStore, Value } from 'tinybase/with-schemas';
import * as UiReact from 'tinybase/ui-react/with-schemas'
import { useCreateClientPersister } from './persistence/useCreateClientPersister';
import { useCreateServerSynchronization } from './synchronization/useSynchronization';
import { useUserIdAndNickname } from '~/hooks/useNickname';

const STORE_ID_PREFIX = "shoppingListStore-";

const VALUES_SCHEMA = {
    listId: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    emoji: { type: "string" },
    color: { type: "string" },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  } as const;


const TABLES_SCHEMA = {
    products: {
      id: { type: "string" },
      name: { type: "string" },
      quantity: { type: "number" },
      units: { type: "string" },
      isPurchased: { type: "boolean", default: false },
      category: { type: "string", default: "" },
      notes: { type: "string" },
      createdBy: { type: "string" }, // userId
      createdAt: { type: "string" },
      updatedAt: { type: "string" },
    },
    collaborators: {
      nickname: { type: "string" },
    },
  } as const;

  type Schemas= [typeof TABLES_SCHEMA, typeof VALUES_SCHEMA]
  type ShoppingListValueId= keyof typeof VALUES_SCHEMA
  type ShoppingListProductCellId= keyof (typeof TABLES_SCHEMA)["products"]

  const {
    useCell,
    useCreateMergeableStore,
    useDelRowCallback,
    useProvideRelationships,
    useProvideStore,
    useRowCount,
    useSetCellCallback,
    useSetValueCallback,
    useSortedRowIds,
    useStore,
    useCreateRelationships,
    useTable,
    useValue,
    useValuesListener,
  } = UiReact as UiReact.WithSchemas<Schemas>;

  const useStoreId= (listId: string)=> STORE_ID_PREFIX + listId

  export const useShoppingListProductCount= (listId:string)=> useRowCount("products", useStoreId(listId))

  export const useShoppingListUserNicknames= (listId:string)=> Object.entries(
    useTable("collaborators", useStoreId(listId))
  ).map(([, {nickname}])=>nickname)

  export const useShoppingListValue = <ValueId extends ShoppingListValueId>(
    listId: string,
    valueId: ValueId
  ): [
    Value<Schemas[1], ValueId>,
    (value: Value<Schemas[1], ValueId>) => void
  ] => [
    useValue(valueId, useStoreId(listId)),
    useSetValueCallback(
      valueId,
      (value: Value<Schemas[1], ValueId>) => value,
      [],
      useStoreId(listId)
    ),
  ];




  export default function ShoppingListStore({
    listId,
    initialContentJson,
  }:{
    listId:string
    initialContentJson: string
  }){
    const storeId= useStoreId(listId)
    const store= useCreateMergeableStore(()=>
    createMergeableStore(). setSchema(TABLES_SCHEMA, VALUES_SCHEMA))

    const [userId, nickname]= useUserIdAndNickname()

    useCreateClientPersister(storeId, store, initialContentJson,()=>
    store.setRow("collaborators", userId, {nickname}))
    useCreateServerSynchronization(storeId, store)
    useProvideStore(storeId, store)
    return null 
  }