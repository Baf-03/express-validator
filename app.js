import express from "express";
import { query, validationResult, body, checkSchema } from "express-validator";
import { createUserValidationSchema } from "./utils/validationSchemas.js";

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}))
//query of express validator is used to validate query parameters there are bunch of middleware functions
// that we can import from express validator
//these function what we are importing from express validator we are using as middleware
//matlab hum loog in ko bech mae dalin gae api k as a middleware
app.get(
  "/practice",
  query("filter")
    .isString()
    .withMessage("Query is not in String Format XD")
    .notEmpty()
    .withMessage("ERR:empty query found")
    .isLength({ min: 4, max: 10 })
    .withMessage("length should be between 2 and 10"),
  (req, res) => {
    console.log("what is", req.query);
    // console.log(req[ 'express-validator#contexts'])
    const result = validationResult(req);
    console.log(result);
    return res.json({
      data:result,
      status: false,
      msg: "req fields are missing",
    });
  }
);

app.post(
  "/signup",
  [body("name").notEmpty().withMessage("Err:userName Not provided")
  .isString().withMessage("user Name must be String Format")
  .isLength({min:3,max:15}).withMessage("user name should be greater then 3 and less than 15")
  
  ,
  body("email").notEmpty().withMessage("email is empty bro")],
  (req,res) => {
    console.log(req.body)
    const result = validationResult(req);
    console.log(result)
    if(!result.isEmpty()){
        return res.json({
            data:null,
            message:"something went wrong",
            status:false,
            error:result
        })
    }
    res.json("o yes data validation done sucessfull");
  }
);


//the good way of making api with validatiion is with authentication so here thats how u can do it
app.post(
    "/signup",
    checkSchema(createUserValidationSchema),
    (req,res) => {
      console.log(req.body)
      const result = validationResult(req);
      console.log(result)
      if(!result.isEmpty()){
          return res.json({
              data:null,
              message:"something went wrong",
              status:false,
              error:result
          })
      }
      res.json("o yes data validation done sucessfull");
    }
  );


app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
