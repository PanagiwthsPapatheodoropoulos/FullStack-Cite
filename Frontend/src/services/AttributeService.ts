import {Attribute, AttributeCreate,AttributeUpdate} from '../models//Attribute';
import {get,post,del,put,patch} from '../utils/api';

const BASE_URL = '/attributes';

export const AttributeService = {
    getAll: (): Promise<Attribute[]> => {
      return get<Attribute[]>(BASE_URL);
    },

    getById: (id : number): Promise<Attribute> => {
        return get<Attribute>(`${BASE_URL}/${id}`);
    },

    create: (attribute: AttributeCreate) : Promise<Attribute> =>{
        return post<Attribute>(BASE_URL,attribute)
    },

    update: (attribute: AttributeUpdate) : Promise<Attribute> =>{
        return put<Attribute>(`${BASE_URL}/${attribute.id}`,attribute);
    },

    delete: (id : number): Promise<void> =>{
        return del<void>(`${BASE_URL}/${id}`);
    }
}