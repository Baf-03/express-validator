
export const createUserValidationSchema ={
    userName:{
        isLength:{
            options:{
                min:3,
                max:10
            },
            errorMessage:`min of 3 and max of 10`
        },
        notEmpty:{
            errorMessage:`user name cannot be empty`
        },
        isString:{
            errorMessage:`userName must be string`
        }
    },
    email:{
        notEmpty:{
            errorMessage:`user name cannot be empty`
        },
    }
}
