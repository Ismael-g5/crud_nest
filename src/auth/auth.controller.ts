import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./hashing/dto/login.dto";

@Controller('auth')

export class AuthController{
  constructor(
    private readonly authService: AuthService
  ){}
  
  //rota
  @Post()
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }
}