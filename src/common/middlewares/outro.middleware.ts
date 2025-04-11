import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class OutroMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('OutroMiddleware: Olá');
    const authorization = req.headers?.authorization;

    if (authorization) {
      req['user'] = {
        nome: 'Ismael',
        sobrenome: 'Guedes',
      };
    }

    res.setHeader('CABECALHO', 'Do Middleware');

    // Terminando a cadeia de chamadas
    // return res.status(404).send({
    //   message: 'Não encontrado',
    // });

    next(); //passa para  o proximo middleware
      // caso usarmos o return next, para no middleware atual podemos tbm lançar excesões
    console.log('OutroMiddleware: Tchau');
  }
}