import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_SERVICE_HOST?: string;
  PRODUCTS_SERVICE_PORT?: number;    
}

const envVarsSchema = joi.object<EnvVars>({
  PORT: joi.number().required().default(3000),
  PRODUCTS_SERVICE_HOST: joi.string().optional(),
  PRODUCTS_SERVICE_PORT: joi.number().optional(),
}).unknown(true);


const { error, value } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  productsServiceHost: envVars.PRODUCTS_SERVICE_HOST,
  productsServicePort: envVars.PRODUCTS_SERVICE_PORT,
};