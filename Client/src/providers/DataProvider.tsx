import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface ContextType {
   /**
      * Data stores all the necessary data for the application to work. \
      * Main fields:
      * * appData - the data required for the functional operation of the application.
      * * metaData - user data obtained using Telegram.
   */
	data: { [key: string]: any };

   addParentField: (field: string, fieldData: { [key: string]: any }) => void;
   addField: (path: string, value: any) => void;
   updateExistingField: (path: string, value: any) => void;
   deleteExistingField: (path: string) => void;
   overwriteData: (newData: { [key: string]: any }) => void;
}

interface DataType {
	metaData?: object;
	appData?: object;
	tasksData?: object;
   [key: string]: any;
}

interface ComponentProps {
	children: ReactNode;
}

export const DataContext = createContext<ContextType | null>(null)

export const DataProvider = ({ children }: ComponentProps): ReactNode => {
   const [data, setData] = useState<DataType>({})

   useEffect(() => {}, [data])

   /**
    * This method allows you to add a new field (object) to the storage root without overwriting it.
    * 
    * @param field - the name of the field to be added to the upper storage level.
    * @param fieldData - the data that this field will store.
    * 
    * @example
    * ```ts
    * addParentField('newParentField', {...})
    * ```
    */
   const addParentField: ContextType['addParentField'] = (field, fieldData) => {
      const newData = { ...data };
      newData[field] = fieldData;
      setData(newData);
      console.log('[DataProvider] Data added: ', data);
   }

   /**
    * This method allows you to add a new field (object) to an existing object at any nesting level.
    * 
    * @param path - the path to the desired field within the data object.
    * @param value - the value that needs to be set for this field.
    * 
    * @example
    * ```ts
    * addField('appData.newField', 'New field data')
    * ```
    */
   const addField: ContextType['addField'] = (path, value) => {
      if (!data) {
         console.error("[DataProvider] Data is null or undefined");
         return;
      }
   
      const keys = path.split('.');
      const newData = { ...data };
   
      let currentLevel = newData;
   
      for (let i = 0; i < keys.length - 1; i++) {
         const key = keys[i];
         if (!(key in currentLevel)) {
            currentLevel[key] = {};
         }
         currentLevel = currentLevel[key];
      }
   
      currentLevel[keys[keys.length - 1]] = value;
   
      setData(newData);
   };

   /**
    * This method allows you to update (overwrite) the values of an already existing field.
    * 
    * @param path - the path to the desired field within the data object.
    * @param value - the new value that needs to be set for this field.
    * 
    * @example
    * ```ts
    * updateExistingField('appData.balance', 100)
    * ```
    */
   const updateExistingField: ContextType['updateExistingField'] = (path, value) => {
      const keys = path.split('.');
      let newData = { ...data };

      for (let i = 0; i < keys.length - 1; i++) {
         const key = keys[i];
         if (!(key in newData)) {
            console.log('[DataProvider] Update data error. Key does not exist: ', key);
            return;
         } else {
            newData = newData[key];
         }
      }

      newData[keys[keys.length - 1]] = value;
      setData(newData);
   }
  
   /**
    * This method allows you to delete a field with all its contents from the parent object at any nesting level.
    * 
    * @param path - the path to the field to be deleted.
    * 
    * @example
    * ```ts
    * deleteExistingField('appData.trashField')
    * ```
    */
   const deleteExistingField: ContextType['deleteExistingField'] = (path) => {
      const keys = path.split('.');
      let newData = { ...data };

      for (let i = 0; i < keys.length - 1; i++) {
         const key = keys[i];
         if (!(key in newData)) {
            console.log('[DataProvider] Delete data error. Incorrect key: ', key);
            return;
         } 
         newData = newData[key];
      }
  
      const lastKey = keys[keys.length - 1];
      if (lastKey in newData) {
         delete newData[lastKey];
      } else {
         console.log('[DataProvider] Delete data error. Key does not exist: ', lastKey);
         return;
      }
  
      setData(newData);
   };

   /**
    * This method completely overwrites the root 'data' object.
    * 
    * @param newData - new data to be written to the root data object.
    * 
    * @example
    * ```ts
    * overwriteData({...}
    * ```
    */
   const overwriteData: ContextType['overwriteData'] = (newData) => {
      setData(newData);
      console.log('[DataProvider] Data overwritten.')
   }

   return (
      <DataContext.Provider value={{ data, addParentField, addField, updateExistingField, deleteExistingField, overwriteData }}>
         { children }
      </DataContext.Provider>
   )
}

/**
 * This hook returns several methods that allow you to conveniently and quickly interact with the internal storage of the session.
 * 
 * **All hook methods:**
 * * ```addParentField``` - a method for adding a new field (object) to the root of the 'data' storage without overwriting it.
 * * ```addField``` - method for adding a new field (object) to an existing object at any nesting level.
 * * ```updateExistingField``` - method for updating (overwriting) the value of an already existing field.
 * * ```deleteExistingField``` - method for removing a field with all its contents from the parent object at any nesting level.
 * * ```overwriteData``` - method for permanently overwriting the root 'data' object.
 * 
 * @example
 * ```ts
 * // Import hook with using aliases
 * import { useData } from '@providers/DataProvider.tsx';
 * 
 * const { addParentField, addField, updateExistingField, deleteExistingField, overwriteData} = useData();
 * ```
 */
export const useData = (): ContextType => {
   const context = useContext(DataContext);
   if (!context) {
      throw new Error('useData must be used within an AuthProvider')
   }
   return context;
}