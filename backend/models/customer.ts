import { Record, text } from "azle";

export const Customer = Record({

    id:text,
    fullname:text,
    dob:text,
    gender:text,
    address:text,
    phone:text,
    nationalIdNumber:text,
   

})

export type Customer = typeof Customer;

  export const CustomerPayload = Record({

    
    fullname:text,
    dob:text,
    gender:text,
    address:text,
    phone:text,
    nationalIdNumber:text,
    kycName:text,
    kycimageData:text,
})

export type CustomerPayload = typeof CustomerPayload




