export interface FieldStructure {
    dirty: boolean; 
    error: boolean; 
    message: string;
}
  
  export interface FieldStr {
    email: FieldStructure;
    password: FieldStructure;
    confirmPassword: FieldStructure;
  }

  export interface SignUpFormState  {
    firstname: string;
    lastname: string;
    email: string;
    password: string
  }
  type Gender = 'male' | 'female' | 'non-binary';
  export interface User {
    name: string;
    age: number;
    email: string;
    gender: Gender;
    password: string;
  }