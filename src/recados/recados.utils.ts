import { Injectable } from "@nestjs/common";

@Injectable()
export class RecadosUtils{
  invertString(str: string){
    return str.split('').reverse().join('');
  }
}

// classe mock para fins de teste
@Injectable()
export class RecadosUtilsMock{
  invertString(){
    return 'teste 1 2 3';
  }
}


//esse return inverte a string passada