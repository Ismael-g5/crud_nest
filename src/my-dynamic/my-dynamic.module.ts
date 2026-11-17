import { Module, type DynamicModule } from '@nestjs/common';

export type MyDynamicModuleConfigs = {
  apiKey: string;
  apiUrl: string;
}

export const MY_DYNAMIC_CONFIG = 'MY_DYNAMIC_CONFIG' 

// acima passamos o que sera recebido pelo modulo

@Module({})
export class MyDynamicModule {
  //metodo para passar configurações(deve ser static)
  static  register(configs: MyDynamicModuleConfigs): DynamicModule{
    console.log("Meu Modulo Dinamico", configs)
    
    return {
      module: MyDynamicModule,
      imports: [],
      providers: [
        {
          provide: MY_DYNAMIC_CONFIG,
          useValue: configs
        }
      ],
      controllers: [],
      exports: [MY_DYNAMIC_CONFIG],
      //global: true,
    }
  }
}