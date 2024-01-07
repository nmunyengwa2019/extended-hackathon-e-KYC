import {
    query,
    update,
    Record,
    StableBTreeMap,
    Vec,
    nat64,
    Opt,
    text,
    Canister, 
    bool,   
    blob,
    Result,
    AzleText
  } from "azle";

  import { v4 as uuidv4 } from "uuid";

//................Bank User.....................Clerk,Admin and Auditor
const BankUser = Record({
  id:text,
  fullName:text,
  role:text,
  password:text,
  active:bool,
});

const BankUserRegistrationPayload = Record({
  fullName:text,
  role:text,
  password:text,

});
const BankUserLoginPayload = Record({
  fullName:text,
  password:text,

});

type BankUser = typeof BankUser;
type BankUserRegistrationPayload = typeof BankUserRegistrationPayload;
type BankUserLoginPayload = typeof BankUserLoginPayload;



//................Customer.....................


const Customer = Record({
  id:text,
  fullName:text,
  address:text,
  contact: text,
  gender:text,
});

const CustomerPayload = Record({
         fullName:text,
          address:text, 
          contact: text,
          gender:text,
});

const CustomerKYC= Record({
   id:text,
   owner:text,
   description:text,
    image:blob,
    approved:bool,
});

const CustomerKYCPayload = Record({
  owner:text,
  description:text,
   image:blob,
   
});


type Customer = typeof Customer;
type CustomerPayload = typeof CustomerPayload;
type CustomerKYC = typeof CustomerKYC;
type CustomeKYCPayload = typeof CustomerKYCPayload;





let customerStorage = StableBTreeMap<AzleText,Customer>(text,Customer,0);
let customerKYCStorage = StableBTreeMap<AzleText,CustomerKYC>(text,CustomerKYC,0);
let bankUserStorage = StableBTreeMap<AzleText,BankUser>(text,BankUser,0);





export default Canister({

    //.....................Bank User.......................
    addBankUser:update([BankUserRegistrationPayload],BankUser,(payload)=>{
      const bankUser:BankUser={
        id:uuidv4(),
        ...payload,
        active:true,
      }
      bankUserStorage.insert(bankUser.id,bankUser);
      return bankUser;
    }),
    getBankUser: query([text],Opt(BankUser),(id)=>{
      return bankUserStorage.get(id);
    }),
    getBankUsers: query([],Vec(BankUser),()=>{
      return bankUserStorage.values();
    }),

    loginBankUser: query([BankUserLoginPayload],Opt(BankUser),(payload)=>{
      try{
        const bankUser=bankUserStorage.values().find((bankUser: { fullName: text; password: text; })=>{
          return bankUser.fullName===payload.fullName && bankUser.password===payload.password;
        });
        return bankUser;
      }catch(e){
        return " Error: ";      }
    }),
    updateBankUser:update([BankUser],BankUser,(payload)=>{
      const bankUser:BankUser={
        ...payload,
      }
      bankUserStorage.update(bankUser.id,bankUser);
      return bankUser;
    }),

    deActivateBankUser:update([text],text,(id)=>{
        const bankUser:BankUser=bankUserStorage.get(id);
        bankUser.active=false;
        bankUserStorage.update(bankUser.id,bankUser);
        return "Bank User Deactivated";
    }),

    activateBankUser:update([text],text,(id)=>{
      const bankUser:BankUser=bankUserStorage.get(id);
      bankUser.active=true;
      bankUserStorage.update(bankUser.id,bankUser);
      return "Bank User Activated";}),
    
    //.....................Bank User Roles Authentication.......................
    isClerk: query([text],bool,(id)=>{
      const bankUser=bankUserStorage.get(id);
      return bankUser.role==="clerk";
    }),
    isAdmin: query([text],bool,(id)=>{
      const bankUser=bankUserStorage.get(id);
      return bankUser.role==="admin";
    }),
    isAuditor: query([text],bool,(id)=>{
      const bankUser=bankUserStorage.get(id);
      return bankUser.role==="auditor";
    }),

    //.....................Customer.......................

    addCustomer:update([CustomerPayload],Customer,(payload)=>{
      const customer:Customer={
        id:uuidv4(),
        ...payload,
      }
      
      customerStorage.insert(customer.id,customer);
      return customer;
    }),
    getCustomer: query([text],Opt(Customer),(id)=>{
      return customerStorage.get(id);
    }),
    getCustomers: query([],Vec(Customer),()=>{
      return customerStorage.values();
    }),
    updateCustomer:update([Customer],Customer,(payload)=>{
      const customer:Customer={
        ...payload,
      }
      customerStorage.update(customer.id,customer);
      return customer;
    }),
    deleteCustomer:update([text],text,(id)=>{
      customerStorage.delete(id);
      return "Customer  Deleted";
    }),
//.....................Customer KYC.......................
  
      addCustomerKYC:update([CustomerKYCPayload],CustomerKYC,(payload)=>{
        const customerKYC:CustomerKYC={
          id:uuidv4(),
          ...payload,
          approved:false,
        }
        customerKYCStorage.insert(customerKYC.id,customerKYC);
        return customerKYC;
      }),
      getCustomerKYC: query([text],Opt(CustomerKYC),(id)=>{
        return customerKYCStorage.get(id);
      }),
      getCustomersKYC: query([],Vec(CustomerKYC),()=>{
        return customerKYCStorage.values();
      }),
      updateCustomerKYC:update([CustomerKYC],CustomerKYC,(payload)=>{
        const customerKYC:CustomerKYC={
          ...payload,
        }
        customerKYCStorage.update(customerKYC.id,customerKYC);
        return customerKYC;
      }),
      deleteCustomerKYC:update([text],text,(id)=>{
        customerKYCStorage.delete(id);
        return "Customer KYC Deleted";
      }),
      approveCustomerKYC:update([text],text,(id)=>{
        const customerKYC:CustomerKYC=customerKYCStorage.get(id);
        customerKYC.approved=true;
        customerKYCStorage.update(customerKYC.id,customerKYC);
        return "Customer KYC Approved";
      }),
      getCustomersPendingKYC: query([text],Vec(CustomerKYC),(id)=>{
        return customerKYCStorage.values().filter((customerKYC: {
          owner: any; approved: bool; })=>{
          return !customerKYC.approved && customerKYC.owner===id;
        });
      }),
      getCustomersApprovedKYC: query([text],Vec(CustomerKYC),(id)=>{
        return customerKYCStorage.values().filter((customerKYC: { approved: any; owner: string; })=>{
          return customerKYC.approved==true && customerKYC.owner===id;
        });
      }),
      getAllKYC: query([],Vec(CustomerKYC),()=>{

        return customerKYCStorage.values();
      }),

  });

  // a workaround to make uuid package work with Azle
  globalThis.crypto = {
    // @ts-ignore
   getRandomValues: () => {
       let array = new Uint8Array(32)
  
       for (let i = 0; i < array.length; i++) {
           array[i] = Math.floor(Math.random() * 256)
       }
  
       return array
   }
  }